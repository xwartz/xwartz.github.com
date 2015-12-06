import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'

class Cover extends Component {
    render() {
        return (
            <Image className='cover' source={this.props.image} />
        )
    }
}

export default Cover