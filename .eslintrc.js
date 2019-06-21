module.exports = {
  'env': {
    'browser': true,
    'node': true,
    'jest': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'standard'
  ],
  'plugins': [
    'standard',
    'promise',
    'react'
  ],
  'rules': {
    'eol-last': ['error', 'always'],
    'no-multiple-empty-lines': [
      'error', { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 }
    ],
    'object-curly-spacing': [2, 'always'],
    'react/prop-types': 'off'
  }
}
