var React = require('react');
var ReactDom = require('react-dom');

var Page = require('./page');

require('../styles/main.scss');


ReactDom.render(
  <Page />,
  document.getElementById('app')
)


