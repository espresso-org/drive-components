import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { Table, TableHeader, TableRow, AragonApp } from '@aragon/ui'
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

  return (
    <AragonApp>
    <Table
      header={
        <TableRow>
          <TableHeader title="Name" />
          <TableHeader title="Owner" />
          <TableHeader title="Permissions" />
          <TableHeader title="Last Modified" />
          <TableHeader title="" />
        </TableRow>
      }
    >
      <FileRow
        file={file}
        selected={false}
        onClick={console.log}
        onDownloadClick={console.log}
      />
    </Table>
    </AragonApp>
  )
})
