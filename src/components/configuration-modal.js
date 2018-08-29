import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import '../css/styles.css'

import { Field, TextInput, DropDown, Button } from '@aragon/ui'
import { ConfigurationRadioGrp } from './configuration-radio-grp'

export const ConfigurationModal = inject("configStore", "mainStore")(observer(({ configStore, mainStore }) => 
    <div>
      <ConfigurationRadioGrp options={["ipfs","filecoin","swarm"]} store={configStore}/>

      <ConfigurationSectionAdvancedBtn href="#" onClick={(e) => {configStore.isAdvancedConfigOpen = !configStore.isAdvancedConfigOpen;e.nativeEvent.stopImmediatePropagation();}}>
        {configStore.isAdvancedConfigOpen ? '-' : '+'}Advanced options
      </ConfigurationSectionAdvancedBtn>

      <div className={configStore.isAdvancedConfigOpen ? 'advancedOptionsContainer' : 'advancedOptionsContainer--hidden'} style={{'margin-left': '40px'}}>
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
      </div>

      <div style={{'margin-top': '35px', 'margin-left': '40px'}}>
        <ActionButton mode="outline" emphasis="positive" disabled={configStore.radioGrpSelectedValue == "filecoin" || configStore.radioGrpSelectedValue == "swarm"} onClick={()=> {mainStore.setIpfsStorageSettings(configStore.host, configStore.port, configStore.protocolArray[configStore.protocolIndex]);configStore.isConfigSectionOpen = false;configStore.showBackButton= true;}}>OK</ActionButton>
        <ActionButton mode="outline" onClick={() => {configStore.isConfigSectionOpen = false;configStore.isAdvancedConfigOpen = false;}} emphasis="negative">Cancel</ActionButton>
      </div>
    </div>
))

const ActionButton = styled(Button)`
  display: inline-block;
  margin: 8px 10px;
`
const ConfigurationSectionAdvancedBtn = styled.a`
    font-size: small;
    &:hover ${ConfigurationSectionAdvancedBtn} {
        color: #50B6E1;
    }
    margin-left: 40px;
`
