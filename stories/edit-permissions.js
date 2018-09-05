import React from "react"
import { action } from "@storybook/addon-actions"
import { aragonStoriesOf } from '../src/utils/aragon-stories-of'
import { EditPermissions } from '../src/components/edit-permissions'
import { BigNumber } from 'bignumber.js'
import { Datastore as MockedDatastore } from '../src/__mocks__/datastore'
import { Provider } from 'mobx-react'
import { MainStore } from '../src/stores/main-store'
import { ConfigStore } from '../src/stores/config-store'

const file = {
  name: 'file-name.jpg',
  owner: '0x2284dd7330abade7fa8951414fcf7d17be35f69b',
  lastModification: new BigNumber(1534519442),
  permissions: {
    read: true,
    write: true
  }
}

const datastore = new MockedDatastore({})
const configStore = new ConfigStore(datastore)
const mainStore = new MainStore(datastore)


aragonStoriesOf("EditPermissions", module).add("Basic", () => (
  <Provider datastore={datastore} mainStore={mainStore} configStore={configStore}>
    <EditPermissions file={file} mainStore={mainStore}></EditPermissions>
  </Provider>
))
