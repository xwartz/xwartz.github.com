var notify = require('gulp-notify')

var config = {
  errorNotify: {
    errorHandler: notify.onError({
      message: "Error: <%= error.message %>"
    })
  }
}

module.exports = config