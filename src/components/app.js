import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'

import { AragonApp, AppBar, Table, TableHeader, TableRow, IconSettings, SidePanel } from '@aragon/ui'

import { AppLayout } from './app-layout'
import { FileInput } from './file-input'
import { FileRow } from './file-row'
import { EditPanel } from './edit-panel'
import { SideBar } from './side-bar'
import { ConfigurationScreen } from './configuration-screen/configuration-screen'
import Screen from './screen'
import LeftIcon from './left-icon'
import { AddPermissions } from './add-permissions'


export const App = 
inject("mainStore", "configStore")(
observer(({ mainStore, configStore }) =>
    <AragonApp publicUrl="./aragon-ui/">

      <Screen position={0} animate={true}>
        {!configStore.isConfigSectionOpen && (
        <div>
          <AppBar
            title="Drive"
            endContent={
              <div>
                <span style={{cursor: 'pointer'}} onClick={() => configStore.isConfigSectionOpen = true}><ConfigurationSectionBtn /></span>
                <FileInput onChange={e => { mainStore.uploadFiles(e.target.files);e.target.value = '' }}>New File</FileInput>
              </div>
            }
          />

          <AppLayout.ScrollWrapper>
            <AppLayout.Content>
              <Breadcrumb>/</Breadcrumb>
              <TwoPanels>
                <Main>
                  <Table
                    header={
                      <TableRow>
                        <TableHeader title="Name" />
                        <TableHeader title="Owner" />
                        <TableHeader title="Permissions" />
                        <TableHeader title="Last Modified" />
                        <TableHeader title="" />
                      </TableRow>
                    }
                  >
                    {mainStore.files.toJS().map(file => 
                      file && !file.isDeleted && <FileRow
                                key={file.id}
                                file={file}
                                selected={mainStore.isFileSelected(file)}
                                onClick={() => mainStore.selectFile(file.id)}
                                onDownloadClick={() => mainStore.downloadFile(file.id)}
                              />
                    )}
                  </Table>
                </Main>
                <AddPermissionsPanel>
                  <SidePanel 
                    title="Add a permission"
                    opened={mainStore.isAddPermissionPanelOpen} 
                    onClose={() => mainStore.isAddPermissionPanelOpen = false }
                  >
                    <AddPermissions />
                  </SidePanel>
                </AddPermissionsPanel>                
                <SideBar file={mainStore.selectedFile} />
              </TwoPanels>
            </AppLayout.Content>
          </AppLayout.ScrollWrapper>
          <EditPanel/>
        </div>
        )}
      </Screen>

      <Screen position={1} animate={true}>
        {configStore.isConfigSectionOpen && (
          <span>
            <AppBar>
              <BackButton onClick={() => { configStore.isConfigSectionOpen = false; configStore.isAdvancedConfigOpen = false }} style={{"display": configStore.configSelected ? 'flex' : 'none'}}>
                <LeftIcon />
              </BackButton>        
              <h1 style={{"lineHeight": 1.5, "fontSize": "22px"}}>Drive - Configuration</h1>
            </AppBar>
            <ConfigurationScreen />
          </span>
        )}
      </Screen>
    </AragonApp>
))

const Breadcrumb = styled.div`
  font-size: 21px;
  color: #000;`

const Main = styled.div`
  width: 100%;
`
const TwoPanels = styled.div`
  display: flex;
  width: 100%;
  min-width: 800px;
`
const ConfigurationSectionBtn = styled(IconSettings).attrs({
  width: "30px",
  height: "30px"
})`
  vertical-align: middle;
  margin-right: 15px;
`
const BackButton = styled.span`
  display: flex;
  align-items: center;
  height: 63px;
  margin: 0 30px 0 -30px;
  cursor: pointer;
  svg path {
    stroke: hsl(179, 76%, 48%);
  }
  :active svg path {
    stroke: hsl(179, 76%, 63%);
  }
`

const AddPermissionsPanel = styled.div`
  > * {
    z-index: 4 !important;
  }
`