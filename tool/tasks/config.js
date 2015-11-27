var notify = require('gulp-notify')

var dirs = {
  'dest': './',
  'chrome': './chrome',
  'firefox': './firefox'
}


var config = {
  errorNotify: {
    errorHandler: notify.onError({
      message: "Error: <%= error.message %>"
    })
  }
}

module.exports = config