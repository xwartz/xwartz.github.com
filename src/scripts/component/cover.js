var React = require('react');

var Cover = React.createClass({

    render: function() {
        return (
            <div className='cover' style={{backgroundImage: 'url(' + this.props.image + ')'}}>
            </div>
        );
    }

});

module.exports = Cover;