import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import { Field, TextInput, TableRow, TableHeader, TableCell, SidePanel } from '@aragon/ui'
import { CheckButton } from '../check-button'

import { EditMode } from '../../stores/edit-mode'
import { AddPermissions, PermissionType } from './components/add-permissions'
import { s } from './edit-permissions.styles'


@inject("mainStore", "datastore")
@observer
export class EditPermissions extends Component {

  state = { 
    newAddressWrite: '',
    newAddressRead: '',
    sidePanel: false
  }

  get mainStore() { return this.props.mainStore }
  get file() { return this.mainStore.selectedFile }

  readPermissions = () => this.mainStore.selectedFilePermissions.get()
                            .filter(permission => permission.read === true)

  writePermissions = () => this.mainStore.selectedFilePermissions.get()
                            .filter(permission => permission.write === true)

  entityPermissions = () => this.mainStore.selectedFilePermissions.get()

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


  removeReadPermission = async () => {
    await this.mainStore.removeReadPermission(this.file.id, this.state.newAddressRead)
    this.setState({ newAddressRead: '' })
  }

  addWritePermission = async () => {
    await this.mainStore.addWritePermission(this.file.id, this.state.newAddressWrite)
    this.setState({ newAddressWrite: '' })
  }

  removeWritePermission = async () => {
    await this.mainStore.removeWritePermission(this.file.id, this.state.newAddressWrite)
    this.setState({ newAddressWrite: '' })
  }

  selectAddressRead(entity) {
    this.setState({ newAddressRead: entity })
  }

  selectAddressWrite(entity) {
    this.setState({ newAddressWrite: entity })
  }

  render() {
    return (
      <s.Main>
        <s.TopButtons>
          <s.AddButton onClick={() => this.setState({ sidePanel: true })}>Add</s.AddButton>
          <s.RemoveButton onClick={this.removeWritePermission}>Remove</s.RemoveButton>
        </s.TopButtons>
        <s.AddressList 
          header={
            <TableRow>
              <TableHeader title="Entity / Group" />
              <TableHeader title="Read" />
              <TableHeader title="Write" />
            </TableRow>
        }>
          {this.entityPermissions()
            .map(permission => 
              <PermissionRow
                key={permission.entity}
                permission={permission} 
                onClick={() => this.selectAddressWrite(permission.entity)}>
                {permission.entity}
              </PermissionRow>
          )}

          {this.groupPermissions()
            .map((permission, i) => 
              <PermissionRow
                key={i}
                permission={permission} 
                onClick={() => this.selectAddressWrite(permission.entity)}>
                {permission.entity}
              </PermissionRow>
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
              groups={this.mainStore.availableGroups} 
              onChange={e => this.addPermission(e)}
            />
        </SidePanel>
      </s.Main>
    )
  }
}



const PermissionRow = ({ permission }) => 
  <TableRow>
    <TableCell>{permission.entity || permission.groupName}</TableCell>
    <TableCell><CheckButton checked={permission.read}/></TableCell>
    <TableCell><CheckButton checked={permission.write}/></TableCell>
  </TableRow>