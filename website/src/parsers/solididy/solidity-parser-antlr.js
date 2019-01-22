import pkg from 'solidity-parser-antlr/package.json';
import defaultParserInterface from '../utils/defaultParserInterface';

const ID = 'solidity-parser-antlr';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/federicobond/solidity-parser-antlr',
  locationProps: new Set(['pos']),

  loadParser(callback) {
    require(['solidity-parser-antlr'], callback);
  },

  parse(parser, code, options) {
    return parser.parse(code, options);
  },

  getDefaultOptions() {
    return {
      loc: true,
      tolerant: false,
      range: true,
    };
  },

  _getSettingsConfiguration() {
    return {
      fields: [
        'range',
        'loc',
        'tolerant'
      ]
    };
  }

};

