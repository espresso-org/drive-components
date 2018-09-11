import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'

import { Field, TextInput, Button, RadioButton, DropDown } from '@aragon/ui'
import { CheckButton } from '../../check-button'


const PermissionType = {
    Entity: 'Entity',
    Group: 'Group'
}

@observer
export class AddPermissions extends Component {
    
    static defaultProps = {
        groups: []
    }

    state = {
        entityAddress: '',
        isRead: false,
        isWrite: false,
        permissionType: PermissionType.Entity
    }
    

    render() {
        return (
            <Main>
                {this.props.groups.length}
                <RadioButton 
                    checked={this.state.permissionType === PermissionType.Entity} 
                    onClick={e => this.setState({ permissionType: PermissionType.Entity })}
                /> Add an entity
                <RadioButton 
                    style={{ marginLeft: '16px'}}
                    checked={this.state.permissionType === PermissionType.Group} 
                    onClick={e => this.setState({ permissionType: PermissionType.Group })}
                /> Add a group

                { this.state.permissionType === PermissionType.Entity ?
                    <PermissionField label="Entity address:">                   
                        <StyledTextInput 
                            value={this.state.entityAddress} 
                            onChange={e => this.setState({ entityAddress: e.target.value })} 
                        />
                    </PermissionField>
                    :
                    <PermissionField label="Group:">                   
                        <StyledTextInput 
                            value={this.state.entityAddress} 
                            onChange={e => this.setState({ entityAddress: e.target.value })} 
                        />
                    </PermissionField>                    
                }
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

const PermissionField = styled(Field)`
    margin-top: 10px;
`

const StyledTextInput = styled(TextInput)`
    width: 100%;
`

const SaveButton = styled(Button)
    .attrs({ mode: 'strong', wide: true })`
    margin-top: 40px;    
`