import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'

class Cover extends Component {
    render() {
        return (
            <Image className='cover' 
              source={this.props.image} 
              style={styles.cover} />
        )
    }
}

const styles = StyleSheet.create({
  cover: {
    width: 398,
    height: 150
  }
})

export default Cover