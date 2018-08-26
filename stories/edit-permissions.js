import React from "react"
import { action } from "@storybook/addon-actions"
import { aragonStoriesOf } from '../src/utils/aragon-stories-of'
import { EditPermissions } from '../src/components/edit-permissions'
import { BigNumber } from 'bignumber.js'
import * as AragonDatastore from 'aragon-datastore'
import { Datastore as MockedDatastore } from '../src/__mocks__/datastore'

AragonDatastore.Datastore = MockedDatastore

import { mainStore } from '../src/stores/main-store'

const file = {
  name: 'file-name.jpg',
  owner: '0x2284dd7330abade7fa8951414fcf7d17be35f69b',
  lastModification: new BigNumber(1534519442),
  permissions: {
    read: true,
    write: true
  }
}

setTimeout(async () => {
  await mainStore._datastore.addFile('test.jpeg', new ArrayBuffer(60))
  await mainStore._refreshFiles()
  await mainStore.selectFile(1)
}, 500)

window.mainStore = mainStore

aragonStoriesOf("EditPermissions", module).add("Basic", () => (
  <EditPermissions file={file} mainStore={mainStore}></EditPermissions>
))
