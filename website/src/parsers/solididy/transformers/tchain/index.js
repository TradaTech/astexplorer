import compileModule from '../../../utils/compileModule';

const ID = 'tchain';

export default {
  id: ID,
  displayName: ID,
  version: "0.1",
  homepage: "https://trada.tech",

  defaultParserID: 'solidity-parser-antlr',

  loadTransformer(callback) {
    require([
      '../../../transpilers/babel',
      'solidity-parser-antlr',
      'prettier/standalone', 'prettier/parser-babylon'
    ], (transpile, parser, prettier, babylon) => callback({ transpile: transpile.default, parser, prettier, babylon }));
  },

  transform({ transpile, parser, prettier, babylon }, transformCode, code) {
    transformCode = transpile(transformCode);
    let transform = compileModule( // eslint-disable-line no-shadow
      transformCode
    );

    const src = (transform.default || transform)(parser.parse(code));
    try {
      return prettier.format(
        src,
        Object.assign({ plugins: [babylon] }),
      );
    } catch (err) {
      console.log(err);
      return src;
    }
  },
};