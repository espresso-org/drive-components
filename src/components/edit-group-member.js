import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { Field, Button, TextInput } from '@aragon/ui'
import { SaveButton, LargeTextInput } from './large-inputs'

@inject("mainStore")
@observer
export class EditGroupMember extends Component {
  state = { newMember: '' }

  get mainStore() { return this.props.mainStore }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Main>
        <Field label="Member address:">
            <LargeTextInput value={this.state.newMember} onChange={e => this.setState({ newMember: e.target.value })} />
        </Field>
        <Actions>
            <SaveButton onClick={() => this.mainStore.addEntityToGroup(this.props.group.id, this.state.newMember)}>Add Member</SaveButton>
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