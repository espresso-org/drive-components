import { configure } from '@storybook/react'

function loadStories() {
  require('../stories/eth-address.js')
}

configure(loadStories, module)
