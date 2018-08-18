import React from "react"
import { storiesOf } from "@storybook/react"
import { aragonStoriesOf } from '../src/utils/aragon-stories-of'
import { action } from "@storybook/addon-actions"
import { EthAddress } from "../src/components/eth-address"

aragonStoriesOf("EthAddress", module).add("with address", () => (
  <EthAddress ethAddress="0xb4124ceb3451635dacedd11767f004d8a28c6ee7" />
))
