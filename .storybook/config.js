import { configure } from '@storybook/react'

function loadStories() {
  require('../stories/eth-address.js')
  require('../stories/file-input.js')
  require('../stories/file-row.js')
  require('../stories/side-panel.js')
}

configure(loadStories, module)
