'use strict'

import React from 'react'
import { AppRegistry, View, WebView } from 'react-native'

import Page from './src/scripts/page.native'


var mapp = React.createClass({
  render: function() {
    return (
      <View>
        {/*
          <WebView url={'https://xwartz.github.com'}>
          </WebView>
        */}
        <Page />
      </View>
    )
  }
})


AppRegistry.registerComponent('mapp', () => mapp)
