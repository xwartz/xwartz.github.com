var React = require('react');

var ComCover = require('./component/cover');
var ComAbout = require('./component/about');
var ComSocial = require('./component/social');

var DataCover = require('./data/cover');
var DataAbout = require('./data/about');
var DataSocial = require('./data/social');

var Page = React.createClass({

    render: function() {
        return (
            <div className='page'>
              <div className='card'>
                <ComCover image={DataCover.image} />
                <ComAbout 
                  avatar={DataAbout.avatar}
                  author={DataAbout.author}
                  description={DataAbout.description}
                />
                <ComSocial data={DataSocial} />
              </div>
            </div>
        );
    }

});

module.exports = Page;