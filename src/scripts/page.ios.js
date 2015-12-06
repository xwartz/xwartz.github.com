import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'

import ComCover from './component/cover.native'
import ComAbout from './component/about.native'
import ComSocial from './component/social.native'

import DataCover from './data/cover'
import DataAbout from './data/about'
import DataSocial from './data/social'

class Page extends Component {

  render() {
      return (
          <View style={styles.page}>
            <View style={styles.card}>
              <ComCover image={DataCover.image} />
              <ComAbout 
                avatar={DataAbout.avatar}
                author={DataAbout.author}
                description={DataAbout.description}
              />
              <ComSocial data={DataSocial} />
            </View>
          </View>
      )
  }

}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center'
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    width: 400,
    height: 390,
    overflow: 'hidden',
    marginTop: 100,
    borderColor: '#ececec',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    shadowColor: '#ebebeb',
    shadowOpacity: 0.75,
    shadowRadius: 5,
    backgroundColor: '#fff'
  }
})

export default Page