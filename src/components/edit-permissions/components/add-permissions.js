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
        groups: [],
        onChange: e => null
    }

    state = {
        entityAddress: '',
        isRead: false,
        isWrite: false,
        permissionType: PermissionType.Entity,
        selectedGroupIndex: 0
    }

    onSaveClick = () => this.props.onChange({
        permissionType: this.state.permissionType,
        read: this.state.isRead,
        write: this.state.isWrite,
        entity: this.state.entityAddress,
        group: this.props.groups[this.state.selectedGroupIndex]
    })
    

    render() {
        return (
            <Main>
                
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
                        <DropDown
                            items={this.props.groups.map(group => group.name)}
                            active={this.state.selectedGroupIndex}
                            onChange={selectedIndex => this.setState({ selectedGroupIndex: selectedIndex })}
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

                <SaveButton onClick={this.onSaveClick}>Save</SaveButton>
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