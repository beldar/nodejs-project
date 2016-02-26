'use strict';

module.exports = (() => {
  const env = process.env.NODE_ENV || 'development';

  console.info( 'Environment: ' + env );

  try {
    return require('./env/' + env );
  } catch (ex) {
    console.error('Environment not recognised, exiting');
    process.exit(1);
  }
})();
