import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'

let iconClass = 'iconfont '
let prefix = 'icon-'

class SocialItem extends Component {

    render() {
        return (
            <View className='social-item' key={this.props.key}>
              <View href={this.props.link} className={iconClass + prefix + this.props.logo}>
                <Text>{this.props.text}</Text>
              </View>
            </View>
        )
    }

}

class Social extends Component {

    render() {
        let socialNodes = this.props.data.map((social,i) => {
          return (
            <SocialItem 
              key={i}
              logo={social.logo}
              link={social.link}
            />
          )
        })
        
        return (
            <View className='social'>
              {socialNodes}
            </View>
        )
    }

}

export default Social
