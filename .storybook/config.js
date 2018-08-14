import { configure } from '@storybook/react'

function loadStories() {
  require('../stories/button.js')
  require('../stories/eth-address.js')
}

configure(loadStories, module)
