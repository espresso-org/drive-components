import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'

import { Field, TextInput, TableRow, TableHeader, TableCell, SidePanel } from '@aragon/ui'
import { CheckButton } from '../../check-button'


export class AddPermissions extends Component {
    
    state = {
        entityAddress: '',
        isRead: false,
        isWrite: false
    }
    
    handleChange = e => {
        console.log('change')
        this.setState({ isRead: !this.state.isRead})
    }

    render() {
        return (
            <Main>
                <Field label="Entity address:">                   
                    <TextInput value={this.state.entityAddress} onChange={e => this.setState({ entityAddress: e.target.value })} />
                </Field>
                <CheckButton 
                    checked={this.state.isRead} 
                    onClick={() => this.setState({ isRead: !this.state.isRead })} 
                /> Read
                <CheckButton 
                    checked={this.state.isWrite} 
                    onClick={() => this.setState({ isWrite: !this.state.isWrite })} 
                /> Write
            </Main>
        )
    }
}


const Main = styled.div`

`