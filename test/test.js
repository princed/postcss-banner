/* eslint-env mocha */

const postcss = require('postcss');
const { expect } = require('chai');

const plugin = require('..');

function testProcess(input, output, opts) {
  expect(postcss(plugin(opts)).process(input).css).to.eql(output);
}

function trim(strings, ...values) {
  return []
    .concat(...strings.map((s, i) => (values[i] ? [s, values[i]] : s)))
    .join('')
    .trim();
}

const input = 'a { decl: value; }';

const multilineText = trim`
multi
line
comment
`;

const multilineResult = trim`
/*
 * multi
 * line
 * comment
 */
`;

const multilineBangResult = trim`
/*!
 * multi
 * line
 * comment
 */
`;

describe('postcss-banner', () => {
  describe('banner', () => {
    it('should add banner', () => {
      testProcess(
        input,
        trim`
/*
 * LOL
 */
a { decl: value; }
`,
        { banner: 'LOL' },
      );
    });

    it('should render the comment inline', () => {
      testProcess(
        input,
        trim`
/* LOL */
a { decl: value; }
`,
        { banner: 'LOL', inline: true },
      );
    });

    it('should add multiline banner', () => {
      testProcess(
        input,
        trim`
${multilineResult}
a { decl: value; }
`,
        { banner: multilineText },
      );
    });
  });

  describe('footer', () => {
    it('should add footer', () => {
      testProcess(
        input,
        trim`
a { decl: value; }
/*
 * LOL
 */
`,
        { footer: 'LOL' },
      );
    });

    it('should add footer inline', () => {
      testProcess(
        input,
        trim`
/* LOL */
a { decl: value; }
`,
        {
          banner: 'LOL',
          inline: true,
        },
      );
    });

    it('should add multiline footer', () => {
      testProcess(
        input,
        trim`
a { decl: value; }
${multilineResult}
`,
        {
          footer: multilineText,
        },
      );
    });
  });

  describe('both', () => {
    it('should add banner and footer', () => {
      testProcess(
        input,
        trim`
/*
 * banner
 */
a { decl: value; }
/*
 * footer
 */
`,
        {
          footer: 'footer',
          banner: 'banner',
        },
      );
    });

    it('should convert values to string', () => {
      testProcess(
        input,
        trim`
/* undefined */
a { decl: value; }
/* undefined */
`,
        {
          banner: undefined,
          footer: undefined,
          inline: true,
        },
      );
    });

    it('should add inline bang decorator', () => {
      testProcess(
        input,
        trim`
/*! LOL */
a { decl: value; }
`,
        {
          banner: 'LOL',
          inline: true,
          important: true,
        },
      );
    });

    it('should add multiline bang decorator', () => {
      testProcess(
        input,
        trim`
${multilineBangResult}
a { decl: value; }
`,
        {
          banner: multilineText,
          important: true,
        },
      );
    });

    it('should ignore not set values', () => {
      testProcess(input, input, {});
    });
  });
});
