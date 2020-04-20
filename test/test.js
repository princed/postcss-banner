/* eslint-env mocha */

const postcss = require('postcss');
const { expect } = require('chai');

const plugin = require('..');

function testProcess(input, output, opts) {
  expect(postcss(plugin(opts)).process(input).css).to.eql(output);
}

const input = 'a{ decl: value; }';

const multilineText = [
  'multi',
  'line',
  'comment',
].join('\n');

const multilineResult = [
  '/*',
  ' * multi',
  ' * line',
  ' * comment',
  ' */',
].join('\n');

const multilineBangResult = [
  '/*!',
  ' * multi',
  ' * line',
  ' * comment',
  ' */',
].join('\n');

describe('postcss-banner', () => {
  describe('banner', () => {
    it('should add banner', () => {
      testProcess(input, '/*\n * LOL\n */\na{ decl: value; }',
        { banner: 'LOL' });
    });

    it('should render the comment inline', () => {
      testProcess(input, '/* LOL */\na{ decl: value; }',
        { banner: 'LOL', inline: true });
    });

    it('should add multiline banner', () => {
      testProcess(input, `${multilineResult}\na{ decl: value; }`,
        { banner: multilineText });
    });
  });

  describe('footer', () => {
    it('should add footer', () => {
      testProcess(input, 'a{ decl: value; }\n/*\n * LOL\n */',
        { footer: 'LOL' });
    });

    it('should add footer inline', () => {
      testProcess(input, '/* LOL */\na{ decl: value; }',
        { banner: 'LOL', inline: true });
    });

    it('should add multiline footer', () => {
      testProcess(input, `a{ decl: value; }\n${multilineResult}`,
        { footer: multilineText });
    });
  });

  describe('both', () => {
    it('should add banner and footer', () => {
      testProcess(input, '/*\n * banner\n */\na{ decl: value; }\n/*\n * footer\n */',
        {
          footer: 'footer',
          banner: 'banner',
        });
    });

    it('should convert values to string', () => {
      testProcess(input, '/* undefined */\na{ decl: value; }\n/* undefined */',
        {
          banner: undefined,
          footer: undefined,
          inline: true,
        });
    });

    it('should add inline bang decorator', () => {
      testProcess(input, '/*! LOL */\na{ decl: value; }',
        { banner: 'LOL', inline: true, important: true });
    });

    it('should add multiline bang decorator', () => {
      testProcess(input, `${multilineBangResult}\na{ decl: value; }`,
        { banner: multilineText, important: true });
    });

    it('should ignore not set values', () => {
      testProcess(input, input, {});
    });
  });
});
