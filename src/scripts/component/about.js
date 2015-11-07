var React = require('react');

var About = React.createClass({

    render: function() {
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

});

module.exports = About;