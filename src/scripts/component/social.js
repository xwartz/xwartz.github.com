import React, { Component } from 'react';

let iconClass = 'iconfont ';
let prefix = 'icon-';

class SocialItem extends Component {

    render() {
        return (
            <li className='social-item' key={this.props.key}>
              <a href={this.props.link} className={iconClass + prefix + this.props.logo}></a>
            </li>
        );
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
          );
        });
        
        return (
            <div className='social'>
              {socialNodes}
            </div>
        );
    }

}

export default Social;
