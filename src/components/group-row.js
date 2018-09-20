import React from 'react'
import styled from 'styled-components'
import { TableRow, TableCell } from '@aragon/ui'

export const GroupRow = ({ group, onClick, selected }) => 
  <Container {...{ onClick, selected }}>
    <Cell>
      <InCell>{group.name}</InCell>
    </Cell>  
    <Cell>
      <InCell>{getEntitiesLength(group.entities)}</InCell>
    </Cell>         
  </Container>


function getEntitiesLength(entities) {
  var counter = 0;
  for(var i = 0; i < entities.length; i++ ) {
    if(entities[i] != '0x0000000000000000000000000000000000000000')
      counter++
  }
  return counter
}

const Container = styled(TableRow)`
    cursor: pointer;
    > * {
    background: ${ props => props.selected ? '#e3f7f5' : '#FFF' };
    } 
`
const InCell = styled.div`
    min-width: 240px;
`
const Cell = styled(TableCell)`
    min-width: 180px;
    width: 100%;
`
