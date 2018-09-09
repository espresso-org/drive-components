import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import { Field, Button, TextInput, Text } from '@aragon/ui'

import { EditMode } from '../../stores/edit-mode'
import * as s from './edit-permissions.styles'


@inject("mainStore")
@observer
export class EditPermissions extends Component {

  state = { 
    newAddressWrite: '',
    newAddressRead: ''
  }

  get mainStore() { return this.props.mainStore }
  get file() { return this.mainStore.selectedFile }

  readPermissions = () => this.mainStore.selectedFilePermissions.get()
                            .filter(permission => permission.read === true)

  writePermissions = () => this.mainStore.selectedFilePermissions.get()
                            .filter(permission => permission.write === true)

  addReadPermission = async () => {
    await this.mainStore.addReadPermission(this.file.id, this.state.newAddressRead)
    this.setState({ newAddressRead: '' })
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
        <s.Title>Write permissions</s.Title>
        <Field label="Entity address:">
          <TextInput value={this.state.newAddressWrite} onChange={e => this.setState({ newAddressWrite: e.target.value })} />
          <s.AddButton onClick={this.addWritePermission}>Add</s.AddButton>
          <s.RemoveButton onClick={this.removeWritePermission}>Remove</s.RemoveButton>
        </Field>
        <s.AddressList>
          {this.writePermissions()
            .map(permission => 
              <s.Address key={permission.entity} onClick={this.selectAddressWrite.bind(this, permission.entity)}>{permission.entity}</s.Address>
          )}
        </s.AddressList>

        <s.Title style={{marginTop: '60px'}}>Read permissions</s.Title>
        <Field label="Entity address:">
          <TextInput value={this.state.newAddressRead} onChange={e => this.setState({ newAddressRead: e.target.value })} />
          <s.AddButton onClick={this.addReadPermission}>Add</s.AddButton>
          <s.RemoveButton onClick={this.removeReadPermission}>Remove</s.RemoveButton>
        </Field>
        <s.AddressList>
          {this.readPermissions()
            .map(permission => 
              <s.Address key={permission.entity} onClick={this.selectAddressRead.bind(this, permission.entity)}>{permission.entity}</s.Address>
          )}
        </s.AddressList>

        <s.Actions>            
          <s.ActionButton mode="outline" onClick={() => this.mainStore.setEditMode(EditMode.None)} emphasis="positive">OK</s.ActionButton>
          <s.ActionButton mode="outline" onClick={() => this.mainStore.setEditMode(EditMode.None)} emphasis="negative">Cancel</s.ActionButton>
        </s.Actions>
      </s.Main>
    )
  }
}

