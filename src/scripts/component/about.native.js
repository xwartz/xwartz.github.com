import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'

class About extends Component {

    render() {
        return (
            <View className='about' style={styles.about}>
              <View className='avatar'>
                <Image 
                  source={this.props.avatar} 
                  alt={this.props.author} 
                  style={styles.img} />
              </View>
              <Text className='author' style={styles.author}>
                {this.props.author}
              </Text>
              <Text className='description' style={styles.description}>
                {this.props.description}
              </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    about: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 40
    },
    img: {
        width: 86,
        height: 86,
        borderRadius: 43,
        marginTop: -40,
        overflow: 'hidden',
        borderColor: '#fff',
        borderWidth: 3,
        borderStyle: 'solid',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 1},
        shadowRadius: 1,
    },
    author: {
        fontSize: 22,
        lineHeight: 40,
        fontWeight: '700'
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
        color: '#aaa'
    }
})

export default About;