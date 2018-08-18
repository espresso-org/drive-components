import React from 'react'
import styled from 'styled-components'
import { TableRow, TableCell } from '@aragon/ui'
import { EthAddress } from './eth-address'
import fontawesome from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import { getClassNameForFilename } from '../utils/files'
import moment from 'moment'


fontawesome.library.add(solid.faDownload)

const Container = styled(TableRow)`
  cursor: pointer;
  > * {
    background: ${ props => props.selected ? '#e3f7f5' : '#FFF' };
  } 
`

const Name = styled.div`
  min-width: 200px;
  
`

const NameCell = styled(TableCell)`
  min-width: 140px;
  width: 100%;
  box-sizing: initial;
`

const OwnerCell = styled(TableCell)`
  min-width: 90px;
  width: 90px;
  box-sizing: initial;
`

const PermissionsCell = styled(TableCell)`
  min-width: 77px;
  width: 77px;
  box-sizing: initial;
`

const LastModifCell = styled(TableCell)`
  min-width: 95px;
  width: 95px;
  box-sizing: initial;
`

const DownloadIco = styled.i`
  /*width: 64px;
  height: 64px;*/
`

export const FileRow = ({ file, onClick, onDownloadClick, selected }) => 
  <Container {...{ onClick, selected }}>
    <NameCell>
      <Name>
        <i className={`fa ${getClassNameForFilename(file.name)}`} /> {file.name}
      </Name>
    </NameCell>
    <OwnerCell>
      <EthAddress ethAddress={file.owner} />
    </OwnerCell>
    <PermissionsCell>
      {file.permissions.read && 'Read'}
      {file.permissions.read && file.permissions.write && ', '}
      {file.permissions.write && 'Write'}
    </PermissionsCell>            
    <LastModifCell>
      {moment.unix(file.lastModification.toNumber()).format('YYYY-MM-DD')}
    </LastModifCell> 
    <TableCell onClick={onDownloadClick}>
      <DownloadIco className="fa fa-download" />    
    </TableCell>
  </Container>
