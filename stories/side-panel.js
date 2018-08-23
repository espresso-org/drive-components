import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { aragonStoriesOf } from '../src/utils/aragon-stories-of'
import { SidePanel } from '@aragon/ui'

aragonStoriesOf("SidePanel", module).add("Basic", () => (
  <Story />
))


class Story extends React.Component {

  state = { open: false }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ open: true })}>Open side panel</button>
        <SidePanel opened={this.state.open} onClose={() => this.setState({ open: false })}>test</SidePanel>
      </div>
    )
  }

}