var React = require('react');

var iconClass = 'iconfont ';
var prefix = 'icon-';

var SocialItem = React.createClass({

    render: function() {
        return (
            <li className='social-item' key={this.props.key}>
              <a href={this.props.link} className={iconClass + prefix + this.props.logo} title={this.props.text} ></a>
            </li>
        );
    }

});

var Social = React.createClass({

    render: function() {
        var socialNodes = this.props.data.map(function (social,i) {
          return (
            <SocialItem 
              key={i}
              logo={social.logo}
              text={social.text}
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

});

module.exports = Social;


// import React from 'react';

// let iconClass = 'iconfont ';
// let prefix = 'icon-';
// let Social = React.createClass({

//     render() {
//         return (
//             <li className="social-item">
//               <a href={this.props.link} className={iconClass + prefix + this.this.props.logo} title={this.this.props.text} ></a>
//             </li>
//         );
//     }

// });

// export default Social;