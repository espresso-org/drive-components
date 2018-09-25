import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'

import { Field, Button, TextInput } from '@aragon/ui'
import { LargeTextInput, SaveButton } from './large-input'

import { EditMode } from '../stores/edit-mode'

const Main = styled.div`
    
`

@inject("mainStore")
@observer
export class EditName extends Component {
  state = { newFilename: '' }

  get mainStore() { return this.props.mainStore }

  constructor(props) {
    super(props)
    this.state = { newFilename: props.file && props.file.name }
  }

  render() {
    return (
      <Main>
          <Field label="New file name:">
            <LargeTextInput value={this.state.newFilename} onChange={e => this.setState({ newFilename: e.target.value })} />
          </Field>
          
          <SaveButton 
            onClick={() => this.mainStore.setFilename(this.props.file.id, this.state.newFilename)} 
          >
            Save
          </SaveButton>

      </Main>
    )
  }
}

const Actions = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
`

const ActionButton = styled(Button)`
  display: inline-block;
  margin: 8px 10px;
`