import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import '../css/styles.css'

const ConfigurationRadioBtn = observer(({ isChecked, value, index, handler}) =>
    <RadioBtn checked={isChecked} onClick={() => handler(index)}>
        <img 
            data-value={value} 
            src={require(`./configuration-modal/img/${value}-logo.png`)}    
        />
    </RadioBtn>
)



export const ConfigurationRadioGrp = observer(({ options, store }) => 
    <div>
        {options.map((option, i) => 
            <ConfigurationRadioBtn 
                key={i} 
                isChecked={(store.radioGrpSelectedIndex == i)} 
                index={i} 
                value={option} 
                handler={() => { store.radioGrpSelectedIndex = i; store.radioGrpSelectedValue = options[i];}} 
            />
        )
    }</div>
)


const RadioBtn = styled.div`
    display: inline-block;
    width: auto;
    height: auto;
    transition: opacity 0.3s;
    opacity: ${({ checked }) => checked ? 1 : 0.5};
    margin: 20px 20px 20px 40px;
    cursor: pointer;

    &:hover {
        opacity: 1;
    }

    > img {
        width: 80px;
    }
`