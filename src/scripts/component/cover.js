import React, { Component } from 'react';

class Cover extends Component {
    render() {
        return (
            <a className='cover'
              style={{backgroundImage: 'url(' + this.props.image + ')'}}
              >
            </a>
        );
    }
}

export default Cover;
