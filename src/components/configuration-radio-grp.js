import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { ImageCheckbox } from './image-checkbox'


// TODO: Move component to its own folder and move images in it
export const ConfigurationRadioGrp = observer(({ options, store }) => 
    <Main>
        {options.map((option, i) => 

            <ImageCheckbox
                key={i}
                active={store.radioGrpSelectedIndex == i}
                template={option}
                icon={require(`./configuration-screen/img/${option}-logo.svg`)}
                label={option}
                onSelect={() => { store.radioGrpSelectedIndex = i; store.radioGrpSelectedValue = options[i];}}
            />
        )}
    </Main>
)

const Main = styled.div`
    padding-left: 32px;
`