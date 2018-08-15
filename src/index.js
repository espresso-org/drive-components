import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

export class ExampleComponent extends Component {
  static propTypes = {
    text: PropTypes.string
  }

  render() {
    const {
      text
    } = this.props

    return (
      <div className={styles.test}>
        Example Component: {text}
      </div>
    )
  }
}


export const EthAddress = ({ ethAddress }) =>
  <div title={ethAddress}>
    {ethAddress && `${ethAddress.substr(0, 6)}...${ethAddress.substr(ethAddress.length - 4)}`}
  </div>
