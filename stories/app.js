import React from "react"
import { action } from "@storybook/addon-actions"
import { aragonStoriesOf } from '../src/utils/aragon-stories-of'
import { App } from '../src/components/app'
import { BigNumber } from 'bignumber.js'
import { Provider } from 'mobx-react'
import { Datastore as MockedDatastore } from '../src/__mocks__/datastore'
import { MainStore } from '../src/stores/main-store'
import { ConfigStore } from '../src/stores/config-store'
import { PermissionsStore } from '../src/stores/permissions-store'



const datastore = new MockedDatastore({})
const configStore = new ConfigStore(datastore)
const mainStore = new MainStore(datastore)
const permissionsStore = new PermissionsStore(datastore, mainStore)


aragonStoriesOf("Main App", module).add("Basic", () => (
  <Provider permissionsStore={permissionsStore} datastore={datastore} mainStore={mainStore} configStore={configStore}>
    <App></App>
  </Provider>
))
