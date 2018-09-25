import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { Table, TableCell, Text, Button, TableRow, theme } from '@aragon/ui'

import { ActionButton } from './action-button'
import { SelectableRow } from './selectable-row'
import { EditMode } from '../stores/edit-mode'

export const SideBarGroups = 
  inject("mainStore")( 
  observer(({ group, mainStore }) =>
    <Main>
      <Tabs>Details</Tabs>
        
      {group &&
        <Details>
          <Text size="large">{group.name}</Text>
          <Info>
            <Label>Members</Label>

            <Table>
              {group.entities.toJS().map(entity => 
                entity && entity !== '0x0000000000000000000000000000000000000000' && 
                <GroupMemberRow 
                    key={entity} 
                    entity={entity} 
                    selected={mainStore.isGroupEntitySelected(entity)}
                    onClick={() => mainStore.selectGroupEntity(entity)} 
                />
              )}
            </Table>
          </Info>
          <Separator />

          <Actions>
            <ActionButton onClick={() => {mainStore.setEditMode(EditMode.GroupMember)}}>Add member</ActionButton>
            <ActionButton disabled={mainStore.selectedGroupEntity == null} onClick={() => {mainStore.removeEntityFromGroup(group.id, mainStore.selectedGroupEntity)}}>Remove member</ActionButton>
            <ActionButton onClick={() => {mainStore.setEditMode(EditMode.GroupName)}}>Rename group</ActionButton>
            <ActionButton emphasis="negative" mode="outline" onClick={() => {mainStore.deleteGroup(group.id)}}>Delete group</ActionButton>
          </Actions>
        </Details>
      }
    </Main>
))

const GroupMemberRow = ({ entity, onClick, selected }) => 
  <SelectableRow size="small" {...{ onClick, selected }}>
    <EntityTableCell>{entity}</EntityTableCell>
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
const Separator = styled.div`  
  border-bottom: 1px solid ${theme.contentBorder};
`
const EntityTableCell = styled(TableCell)`
  padding: 8px;
  align-items:center;
  justify-content:center;
  display: flex;
`
