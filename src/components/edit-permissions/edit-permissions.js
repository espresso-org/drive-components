import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { observe } from 'mobx'

import { TableRow, TableHeader, TableCell, SidePanel } from '@aragon/ui'
import { CheckButton } from '../check-button'

import { EditMode } from '../../stores/edit-mode'
import { PermissionType } from '../../stores/permissions-store'

import { EthAddress } from '../eth-address'
import { AddPermissions } from './components/add-permissions'
import { s } from './edit-permissions.styles'

// TODO: Extract logic to a store
@inject("mainStore", "datastore", "permissionsStore")
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

  }

  get mainStore() { return this.props.mainStore }
  get file() { return this.mainStore.selectedFile }


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

  saveChanges = async () => {
    const permissionChanges = this.getPermissionChanges()

    await this.props.datastore.setPermissions(
      this.props.mainStore.selectedFile.id,
      permissionChanges.filter(perm => perm.permissionType === PermissionType.Entity),
      permissionChanges.filter(perm => perm.permissionType === PermissionType.Group)
    )

    this.mainStore.setEditMode(EditMode.None)
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
          <s.RemoveButton onClick={() => this.permissionStore.removePermission(this.permissionStore.selectedPermission)}>Remove</s.RemoveButton>
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
          <s.SaveButton onClick={this.saveChanges}>Save</s.SaveButton>
        </s.Actions>        

        <SidePanel 
          title="Add a permission"
          opened={this.state.sidePanel} 
          onClose={() => this.setState({ sidePanel: false })}
        >
            <AddPermissions 
              groups={this.mainStore.availableGroups} 
              onChange={perm => this.mainStore.addPermission(this.mainStore.selectedFile.id, perm)}
            />
        </SidePanel>
      </s.Main>
    )
  }
}



const PermissionRow = ({ permission, onChange, selected, ...props }) => 
  <s.SelectableRow selected={selected} {...props}>
    <TableCell>
      {console.log(permission)}
      { permission.permissionType === PermissionType.Entity ?
        <EthAddress ethAddress={permission.entity} />
        :
        permission.groupName
      }
    </TableCell>
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