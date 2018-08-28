import React from "react"
import { action } from "@storybook/addon-actions"
import { aragonStoriesOf } from '../src/utils/aragon-stories-of'
import { App } from '../src/components/app'
import { BigNumber } from 'bignumber.js'
import { Provider } from 'mobx-react'
//import * as AragonDatastore from 'aragon-datastore'
import { Datastore as MockedDatastore } from '../src/__mocks__/datastore'
import { MainStore } from '../src/stores/main-store'
import { ConfigStore } from '../src/stores/config-store'

//AragonDatastore.Datastore = MockedDatastore

const datastore = new MockedDatastore({
})
const configStore = new ConfigStore()
const mainStore = new MainStore(datastore, configStore)


aragonStoriesOf("Main App", module).add("Basic", () => (
  <Provider mainStore={mainStore} configStore={configStore}>
    <App></App>
  </Provider>
))
