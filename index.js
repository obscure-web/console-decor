const _ = require('lodash');
const moment = require('moment');
const path = require('path');

module.exports = decor;

/* config = { basedir: String }
 * 
 */
function decor(config={}) {
  console.log = decorate(console.log, config);
  console.error = decorate(console.error, config);
}

/* Take a logging function and return a decorated version
 */
function decorate(consolelog, config) {
  config.appdir = config.appdir || path.dirname(require.main.filename);
  
  return (...args) => {
    args = _.values(args);
    
    // pretty print objects
    args = _.map(args, b => {
      if (typeof b === 'object') {
        return JSON.stringify(b, 0, 2);
      } 
      return b;
    });
    
    // add time and location
    const time = moment().format('Y-MM-DD HH:mm:ss');
    const location = new Error().stack // get stack trace
      .split('\n')[2] // back up two function calls
      .replace(/^.*\(|\).*$/g, '') // trim everything but file path and line
      .replace(/\s+at\s+/, '') // handle non-parenthesis format
      .replace(config.appdir, ''); // shorten file path to be relative to app directory
    
    /* breaks mocha templating?
     * args.unshift('['+time+' '+location+']'); // prepend to arguments array   
     */
    args[0] = '['+time+' '+location+'] ' + (args[0] || ''); // prepend to arguments array

    consolelog.apply(null, args); // call original function with new arguments
  };
}