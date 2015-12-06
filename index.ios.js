'use strict'

import React from 'react'
import { AppRegistry, View, WebView } from 'react-native'

import Page from './src/scripts/page.ios'


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
