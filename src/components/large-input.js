import styled from 'styled-components'
import { TextInput, Button } from '@aragon/ui'

export const LargeTextInput = styled(TextInput)`
    width: 100%;
`

export const SaveButton = styled(Button)
    .attrs({ mode: 'strong', wide: true })`
    margin-top: 20px;    
`