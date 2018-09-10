import React from "react"
import { storiesOf } from "@storybook/react"
import { aragonStoriesOf } from '../src/utils/aragon-stories-of'
import { action } from "@storybook/addon-actions"
import { CheckButton } from "../src/components/check-button"

aragonStoriesOf("CheckButton", module).add("Basic", () => (
  <div>
    <CheckButton  /> Unchecked <br />
    <CheckButton checked /> Checked
  </div>
))
