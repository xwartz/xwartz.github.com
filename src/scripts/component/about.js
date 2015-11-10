import React, { Component } from 'react';

class About extends Component {

    render() {
        return (
            <div className='about'>
             <a className='avatar'>
               <img src={this.props.avatar} alt={this.props.author} />
             </a>
             <h3 className='author'>{this.props.author}</h3>
             <p className='description'>{this.props.description}</p>
            </div>
        );
    }

}

export default About;