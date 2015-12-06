import React, { Component } from 'react'
import { StyleSheet, Text, View, LinkingIOS } from 'react-native'

let iconClass = 'iconfont '
let prefix = 'icon-'

class SocialItem extends Component {

    handleClick() {
      LinkingIOS.openURL(this.props.link)
    }

    render() {
        return (
            <View className='social-item' key={this.props.key} >
              <View href={this.props.link}
                className={iconClass + prefix + this.props.logo} >
                
                <Text onPress={this.handleClick.bind(this)}>
                  {this.props.text}
                </Text>

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
              text={social.text}
              logo={social.logo}
              link={social.link}
            />
          )
        })
        
        return (
            <View className='social' style={styles.social}>
              {socialNodes}
            </View>
        )
    }

}

const styles = {
  social: {
    width: 200,
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
}

export default Social
