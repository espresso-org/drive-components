import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'

import { Field, TextInput, DropDown, Button, Text } from '@aragon/ui'
import { ConfigurationRadioGrp } from '../configuration-radio-grp'

export const ConfigurationScreen = inject("configStore", "mainStore")(observer(({ configStore, mainStore }) => 
    <Main>
      <Title>Storage</Title>

      <ConfigurationRadioGrp 
        options={configStore.configSelected ? [configStore.radioGrpSelectedValue] : ["ipfs","filecoin","swarm"]} 
        store={configStore}
      />

      <ConfigurationSectionAdvancedBtn href="#" onClick={(e) => {configStore.isAdvancedConfigOpen = !configStore.isAdvancedConfigOpen;e.nativeEvent.stopImmediatePropagation();}}>
        {configStore.isAdvancedConfigOpen ? '-' : '+'}Advanced options
      </ConfigurationSectionAdvancedBtn>

      <AdvancedOptionsContainer open={configStore.isAdvancedConfigOpen}>
        <div className="ipfsAdvancedOptions" style={{display: configStore.radioGrpSelectedValue == "ipfs" ? 'block' : 'none'}}>
          <Field label="IPFS host:">
            <TextInput value={configStore.host} onChange={e => configStore.host = e.target.value} />
          </Field>
          <Field label="IPFS port:">
            <TextInput value={configStore.port} onChange={e => configStore.port = e.target.value} />
          </Field>
          <Field label="Protocol">
            <DropDown items={['HTTP', 'HTTPS']} active={configStore.protocolIndex} onChange={e => configStore.protocolIndex = e}/>
          </Field>
        </div>
        <div className='filecoinAdvancedOptions' style={{display: configStore.radioGrpSelectedValue == "filecoin" ? 'block' : 'none'}}>Coming soon</div>
        <div className='swarmAdvancedOptions' style={{display: configStore.radioGrpSelectedValue == "swarm" ? 'block' : 'none'}}>Coming soon</div>
      </AdvancedOptionsContainer>


      <Title style={{ marginTop: '50px' }}>Encryption</Title>

      <ComingSoon>
        Coming soon
      </ComingSoon>

      <div style={{'marginTop': '35px', 'marginLeft': '40px'}}>
        <ActionButton mode="outline" emphasis="positive" disabled={configStore.radioGrpSelectedValue == "filecoin" || configStore.radioGrpSelectedValue == "swarm"} onClick={()=> {mainStore.setIpfsStorageSettings(configStore.host, configStore.port, configStore.protocolArray[configStore.protocolIndex]);}}>OK</ActionButton>
        <ActionButton mode="outline" disabled={!configStore.configSelected} onClick={() => {configStore.isConfigSectionOpen = false;configStore.isAdvancedConfigOpen = false;}} emphasis="negative">Cancel</ActionButton>
      </div>
    </Main>
))

const Main = styled.div`
  padding-top: 30px;
  padding-left: 50px;
`

const Title = styled(Text).attrs({ size: 'xlarge' })`
  margin-left: 16px;
  display: block;
`

const ActionButton = styled(Button)`
  display: inline-block;
  margin: 8px 10px;
`
const AdvancedOptionsContainer = styled.div`
  display: ${ ({open}) => open ? 'block' : 'none' };
  margin-left: 50px;
`

const ComingSoon = styled.div`
  width: 552px;
  text-align: center;
  color: #bbb;
  font-size: 20px;
  padding: 20px 0;
  margin-left: 30px;
`

const ConfigurationSectionAdvancedBtn = styled.a`
    font-size: small;
    &:hover ${ConfigurationSectionAdvancedBtn} {
        color: #50B6E1;
    }
    margin-left: 50px;
`