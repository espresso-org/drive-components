import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'

import { Field, TextInput, Button, RadioButton, TableHeader, TableCell, SidePanel } from '@aragon/ui'
import { CheckButton } from '../../check-button'


const PermissionType = {
    Entity: 'Entity',
    Group: 'Group'
}


export class AddPermissions extends Component {
    
    state = {
        entityAddress: '',
        isRead: false,
        isWrite: false,
        permissionType: PermissionType.Entity
    }
    

    render() {
        return (
            <Main>
                <RadioButton /> Add an entity
                <RadioButton /> Add a group
                <Field label="Entity address:">                   
                    <StyledTextInput 
                        value={this.state.entityAddress} 
                        onChange={e => this.setState({ entityAddress: e.target.value })} 
                    />
                </Field>
                <CheckButton 
                    checked={this.state.isRead} 
                    onClick={() => this.setState({ isRead: !this.state.isRead })} 
                /> Read
                <CheckButton 
                    checked={this.state.isWrite} 
                    onClick={() => this.setState({ isWrite: !this.state.isWrite })} 
                /> Write

                <SaveButton>Save</SaveButton>
            </Main>
        )
    }
}


const Main = styled.div`
    
`

const StyledTextInput = styled(TextInput)`
    width: 100%;
`

const SaveButton = styled(Button)
    .attrs({ mode: 'strong', wide: true })`
    margin-top: 40px;    
`