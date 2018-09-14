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



  }

  get permissionsStore() { return this.props.permissionsStore }
  get mainStore() { return this.props.mainStore }
  get file() { return this.mainStore.selectedFile }


  selectPermissionRow = permission => {
    if (permission !== this.state.selectedPermission)
      this.setState({ selectedPermission: permission })
    else
      this.setState({ selectedPermission: null })
  }

  isPermissionSelected = permission => permission === this.state.selectedPermission



  render() {
    return (
      <s.Main>
        <s.TopButtons>
          <s.AddButton onClick={() => this.setState({ sidePanel: true })}>Add</s.AddButton>
          <s.RemoveButton onClick={() => this.permissionsStore.removePermission(this.permissionsStore.selectedPermission)}>Remove</s.RemoveButton>
        </s.TopButtons>
        <s.AddressList 
          header={
            <TableRow>
              <TableHeader title="Entity / Group" />
              <TableHeader title="Read" />
              <TableHeader title="Write" />
            </TableRow>
        }>
          {this.permissionsStore.selectedFilePermissions
            .map(permission => 
              <PermissionRow
                key={permission.entity || permission.groupId}
                permission={permission} 
                onChange={permission => this.permissionsStore.updateSelectedFilePermissions(permission)}
                selected={this.isPermissionSelected(permission)}
                onClick={() => this.selectPermissionRow(permission)}
              />
          )}

          {/*this.permissionsStore.groupPermissions
            .map((permission, i) => 
              <PermissionRow
                key={i}
                permission={permission} 
                onChange={this.onGroupPermissionChange}
                selected={this.isPermissionSelected(permission)}
                onClick={() => this.selectPermissionRow(permission)}
              />
          )*/}          
        </s.AddressList>

        <s.Actions>            
          <s.SaveButton onClick={() => this.permissionsStore.saveChanges() }>Save</s.SaveButton>
        </s.Actions>        

        <SidePanel 
          title="Add a permission"
          opened={this.state.sidePanel} 
          onClose={() => this.setState({ sidePanel: false })}
        >
            <AddPermissions />
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