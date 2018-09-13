import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { observe } from 'mobx'

import { Field, TextInput, TableRow, TableHeader, TableCell, SidePanel } from '@aragon/ui'
import { CheckButton } from '../check-button'

import { EditMode } from '../../stores/edit-mode'
import { AddPermissions, PermissionType } from './components/add-permissions'
import { s } from './edit-permissions.styles'

// TODO: Extract logic to a store
@inject("mainStore", "datastore")
@observer
export class EditPermissions extends Component {

  state = { 
    newAddressWrite: '',
    newAddressRead: '',
    sidePanel: false,
    groupPermissions: []
  }

  constructor(props) {
    super(props)

    this.initialize()
  }

  async initialize() {

    observe(mainStore, 'selectedFile', async () => {
      this.originalEntityPermissions = (await this.props.datastore.getFilePermissions(this.props.mainStore.selectedFile.id))
        .map(permission => ({ 
          permissionType: PermissionType.Entity, 
          ...permission
      }))
      this.originalGroupPermissions = (await this.props.datastore.getFileGroupPermissions(this.props.mainStore.selectedFile.id))
        .map(permission => ({ 
          permissionType: PermissionType.Group, 
          ...permission
      }))

      this.setState({
        entityPermissions: [...this.originalEntityPermissions],
        groupPermissions: [...this.originalGroupPermissions],
      })
    })

    window.myState = this.state
  }

  get mainStore() { return this.props.mainStore }
  get file() { return this.mainStore.selectedFile }

  //entityPermissions = () => this.mainStore.selectedFilePermissions.get()

  groupPermissions = () => this.mainStore.selectedFileGroupPermissions.get()

  addReadPermission = async () => {
    await this.mainStore.addReadPermission(this.file.id, this.state.newAddressRead)
    this.setState({ newAddressRead: '' })
  }

  addPermission = async permission => {
    //console.log('add-permission ', permission)
    if (permission.permissionType === PermissionType.Entity) {
      
      await this.props.datastore.setEntityPermissions(
        this.file.id, 
        permission.entity, 
        permission.read, 
        permission.write
      )
      
      this.setState( { sidePanel: false })
    }
    else if (permission.permissionType === PermissionType.Group) {
      await this.props.datastore.setGroupPermissions(
        this.file.id, 
        permission.group.id, 
        permission.read, 
        permission.write
      )

      this.setState( { sidePanel: false })
    }
  }

  removePermission = async () => {
    const permission = this.state.selectedPermission
    if (permission.permissionType === PermissionType.Entity)
      await this.props.datastore.removeEntityFromFile(this.props.mainStore.selectedFile.id, permission.entity)
    else
      await this.props.datastore.removeGroupFromFile(this.props.mainStore.selectedFile.id, permission.groupId)
  }

  selectPermissionRow = permission => {
    if (permission !== this.state.selectedPermission)
      this.setState({ selectedPermission: permission })
    else
      this.setState({ selectedPermission: null })
  }

  isPermissionSelected = permission => permission === this.state.selectedPermission

  onGroupPermissionChange = permission => {
    const newPermissions = this.state.groupPermissions.map(perm => 
      perm.groupId === permission.groupId ? permission : perm      
    )

    this.setState({
      groupPermissions: newPermissions
    })

  } 

  onEntityPermissionChange = permission => {
    const newPermissions = this.state.entityPermissions.map(perm => 
      perm.entity === permission.entity ? permission : perm      
    )

    this.setState({
      entityPermissions: newPermissions
    })

  }  
  
  getPermissionChanges = () => {
    return this.state.groupPermissions.filter((perm, i) => {
      return this.originalGroupPermissions[i].write !== perm.write
          || this.originalGroupPermissions[i].read !== perm.read
    })
    .concat(this.state.entityPermissions.filter((perm, i) => {
      return this.originalEntityPermissions[i].write !== perm.write
          || this.originalEntityPermissions[i].read !== perm.read
    }))
  }

  render() {
    return (
      <s.Main>
        <s.TopButtons>
          <s.AddButton onClick={() => this.setState({ sidePanel: true })}>Add</s.AddButton>
          <s.RemoveButton onClick={this.removePermission}>Remove</s.RemoveButton>
        </s.TopButtons>
        <s.AddressList 
          header={
            <TableRow>
              <TableHeader title="Entity / Group" />
              <TableHeader title="Read" />
              <TableHeader title="Write" />
            </TableRow>
        }>
          {this.state.entityPermissions && this.state.entityPermissions
            .map(permission => 
              <PermissionRow
                key={permission.entity}
                permission={permission} 
                onChange={this.onEntityPermissionChange}
                selected={this.isPermissionSelected(permission)}
                onClick={() => this.selectPermissionRow(permission)}
              />
          )}

          {this.state.groupPermissions
            .map((permission, i) => 
              <PermissionRow
                key={i}
                permission={permission} 
                onChange={this.onGroupPermissionChange}
                selected={this.isPermissionSelected(permission)}
                onClick={() => this.selectPermissionRow(permission)}
              />
          )}          
        </s.AddressList>

        <s.Actions>            
          <s.SaveButton onClick={() => this.mainStore.setEditMode(EditMode.None)}>Save</s.SaveButton>
        </s.Actions>        

        <SidePanel 
          title="Add a permission"
          opened={this.state.sidePanel} 
          onClose={() => this.setState({ sidePanel: false })}
        >
            <AddPermissions 
              groups={this.mainStore.groups} 
              onChange={e => this.addPermission(e)}
            />
        </SidePanel>
      </s.Main>
    )
  }
}

const PermissionRow = ({ permission, onChange, selected, ...props }) => 
  <s.SelectableRow selected={selected} {...props}>
    <TableCell>{permission.entity || permission.groupName}</TableCell>
    <TableCell>
      <CheckButton 
        onClick={() => onChange({ ...permission, read: !permission.read })}
        checked={permission.read}
      />
    </TableCell>
    <TableCell>
      <CheckButton 
        checked={permission.write}
        onClick={() => onChange({ ...permission, write: !permission.write })}
    />
    </TableCell>
  </s.SelectableRow>