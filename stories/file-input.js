import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { FileInput } from "../src/components/file-input"

storiesOf("FileInput", module).add("Basic", () => (
  <FileInput onChange={e => console.log(e.target.files)} >Upload File</FileInput>
))
