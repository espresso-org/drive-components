import { configure } from '@storybook/react'

function loadStories() {
  require('../stories/eth-address.js')
  require('../stories/file-input.js')
  require('../stories/file-row.js')
  require('../stories/edit-permissions.js')
}

configure(loadStories, module)
