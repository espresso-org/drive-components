import { configure } from '@storybook/react'

function loadStories() {
  require('../stories/eth-address.js')
  require('../stories/file-input.js')
}

configure(loadStories, module)
