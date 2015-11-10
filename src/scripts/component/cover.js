import React, { Component } from 'react';

class Cover extends Component {
    render() {
        return (
            <div className='cover' style={{backgroundImage: 'url(' + this.props.image + ')'}}>
            </div>
        );
    }
}

export default Cover;