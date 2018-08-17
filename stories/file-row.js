import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { FileRow } from "../src/components/file-row"
import { BigNumber } from 'bignumber.js'


storiesOf("FileRow", module).add("Read Write Jpg", () => {
  const file = {
    name: 'file-name.jpg',
    owner: '0x2284dd7330abade7fa8951414fcf7d17be35f69b',
    lastModification: new BigNumber(1534519442),
    permissions: {
      read: true,
      write: true
    }
  }

  return <FileRow
    file={file}
    selected={false}
    onClick={console.log}
    onDownloadClick={console.log}
  />
})
