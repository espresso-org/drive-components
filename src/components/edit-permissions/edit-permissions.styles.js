import styled from 'styled-components'
import { Field, Button, TextInput, Text } from '@aragon/ui'

export const Main = styled.div`
    
`


export const Title = styled(Text).attrs({ size: 'xlarge'})`
  display: block;
  margin: 8px 0;
`

export const AddButton = styled(Button).attrs({ 
    compact: true, 
    mode: 'outline', 
    emphasis: 'positive' 
  })`
  display: inline-block;
  margin: 0px 4px;
`

export const RemoveButton = styled(Button).attrs({ 
  compact: true, 
  mode: 'outline', 
  emphasis: 'negative' 
})`
display: inline-block;
margin: 0px;
`

export const AddressList = styled.div`
  margin-top: 12px;
  overflow-y: scroll;
  max-height: 150px;
`

export const Address = styled(Button)`
  margin-bottom: 2px;
  margin-left: 1px;
  width: 349px;
  font-size: small;
`

export const Actions = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
`

export const ActionButton = styled(Button)`
  display: inline-block;
  margin: 8px 10px;
`