import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { Field, Button, TextInput } from '@aragon/ui'
import { SaveButton, LargeTextInput } from './large-inputs'

@inject("mainStore")
@observer
export class EditGroupCreate extends Component {
  state = { groupName: '' }

  get mainStore() { return this.props.mainStore }

  render() {
    return (
      <Main>
        <Field label="Group name:">
            <LargeTextInput value={this.state.groupName} onChange={e => this.setState({ groupName: e.target.value })} />
        </Field>
        <Actions>
            <SaveButton mode="strong" onClick={() => this.mainStore.createGroup(this.state.groupName)}>Create</SaveButton>
        </Actions>
      </Main>
    )
  }
}

const Main = styled.div`  
`
const Actions = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
`
const ActionButton = styled(Button)`
  display: inline-block;
  margin: 8px 10px;
`