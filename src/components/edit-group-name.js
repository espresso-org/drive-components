import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { Field, Button, TextInput } from '@aragon/ui'
import { SaveButton, LargeTextInput } from './large-input'

@inject("mainStore")
@observer
export class EditGroupName extends Component {
  state = { groupName: '' }

  get mainStore() { return this.props.mainStore }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Main>
        <Field label="Group name:">
            <LargeTextInput value={this.state.groupName} onChange={e => this.setState({ groupName: e.target.value })} />
        </Field>
        <Actions>
            <SaveButton onClick={() => this.mainStore.renameGroup(this.props.group.id, this.state.groupName)}>Rename</SaveButton>
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