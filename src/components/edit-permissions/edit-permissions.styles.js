import styled from 'styled-components'
import { Field, Button, TextInput, Text } from '@aragon/ui'

export const s = {

    Main: styled.div`
        
    `,

    Title: styled(Text).attrs({ size: 'xlarge'})`
        display: block;
        margin: 8px 0;
    `,

    AddButton: styled(Button).attrs({ 
        compact: true, 
        mode: 'outline', 
        emphasis: 'positive' 
    })`
        display: inline-block;
        margin: 0px 4px;
    `,

    RemoveButton: styled(Button).attrs({ 
        compact: true, 
        mode: 'outline', 
        emphasis: 'negative' 
    })`
        display: inline-block;
        margin: 0px;
    `,

    AddressList: styled.div`
    margin-top: 12px;
    overflow-y: scroll;
    max-height: 150px;
    `,

    Address: styled(Button)`
    margin-bottom: 2px;
    margin-left: 1px;
    width: 349px;
    font-size: small;
    `,

    Actions: styled.div`
    margin-top: 40px;
    margin-bottom: 20px;
    `,

    ActionButton: styled(Button)`
    display: inline-block;
    margin: 8px 10px;
    `

}