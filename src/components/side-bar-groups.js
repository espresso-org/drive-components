import React from 'react'
import styled from 'styled-components'
import { inject } from 'mobx-react'
import { TableCell, Text, Button, TableRow, theme } from '@aragon/ui'

import { EditMode } from '../stores/edit-mode'
import { EthAddress } from './eth-address'

export const SideBarGroups = 
  inject("mainStore")( 
  ({ group, mainStore }) =>
    <Main>
      <Tabs>Details</Tabs>
        
      {group &&
        <Details>
          <Text size="large">{group.name}</Text>
          <Info>
            <Label>Members</Label>

            {group.entities.toJS().map(entity => 
              entity && <GroupMemberRow entity={entity} onClick={() => mainStore.selectGroupEntity(entity)} selected={mainStore.isGroupEntitySelected(entity)} />
            )}
          </Info>
          <Separator />

          <Actions>
            <ActionButton onClick={() => {mainStore.setEditMode(EditMode.GroupMember)}}>Add member</ActionButton>
            <ActionButton onClick={() => {mainStore.removeEntityFromGroup(group.id, mainStore.selectedGroupEntity)}}>Remove a member</ActionButton>
            <ActionButton onClick={() => {mainStore.setEditMode(EditMode.GroupName)}}>Rename group</ActionButton>
            <ActionButton emphasis="negative" mode="outline" onClick={() => {mainStore.deleteGroup(group.id)}}>Delete group</ActionButton>
          </Actions>
        </Details>
      }
    </Main>
)

const GroupMemberRow = ({ entity, onClick, selected, ...props }) => 
  <SelectableRow onClick={onClick} selected={selected} {...props}>
    <TableCell><EthAddressDetails><EthAddress ethAddress={entity}/></EthAddressDetails></TableCell>
  </SelectableRow>

const Main = styled.aside`
  flex-shrink: 0;
  flex-grow: 0;
  width: 300px;
  margin-left: 30px;
  min-height: 100%;
`
const Tabs = styled.div`
  border-bottom: 1px solid ${theme.contentBorder};
  padding-bottom: 8px;
`
const Details = styled.div`
  margin-top: 20px;
`
const Info = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`
const Label = styled.span`
  display: block;
  color: ${theme.textTertiary};
  width: 112px;
`
const Actions = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`
const ActionButton = styled(Button).attrs({ mode: 'secondary'})`
  display: block;
  width: 180px;
  margin: 8px 0;
`
const EthAddressDetails = styled.span`
  max-width: 140px;
  display: block;
  vertical-align: middle;
  white-space: nowrap;
  margin-top: 10px;
  margin-left: 8px;
`
const Separator = styled.div`  
  border-bottom: 1px solid ${theme.contentBorder};
`
const SelectableRow = styled(TableRow)`
  cursor: pointer;
  > * {
      background: ${ props => props.selected ? 'rgba(220, 234, 239, 0.3)' : 'white'};
  }
`