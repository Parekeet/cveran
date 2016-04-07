var _ = require('lodash');

var localEnvVars = {
  TITLE:          'Mint',
  SAFE_TITLE:     'mint3',
  COOKIE_SECRET:  'notsosecretnowareyou',
  SESSION_SECRET: 'anotherfoolishsecret',
  TOKEN_SECRET:   'andafinalsecretsadasitis'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
