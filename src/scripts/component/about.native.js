import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'

class About extends Component {

    render() {
        return (
            <View className='about'>
              <View className='avatar'>
                <Image source={this.props.avatar} alt={this.props.author} />
              </View>
              <Text className='author'>
                {this.props.author}
              </Text>
              <Text className='description'>
                {this.props.description}
              </Text>
            </View>
        );
    }

}

export default About;