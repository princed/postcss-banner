module.exports = (opts = {}) => {
  function makeComment(banner) {
    const bang = opts.important ? '!' : '';

    if (opts.inline) {
      return `/*${bang} ${banner} */`;
    }
    return `/*${bang}
${banner.replace(/^|\n/g, '$& * ')}
 */`;
  }

  return {
    postcssPlugin: 'postcss-banner',
    Once(css) {
      if ('banner' in opts) {
        css.prepend(makeComment(opts.banner));

        // New line after banner
        if (css.nodes[1]) {
          // eslint-disable-next-line no-param-reassign
          css.nodes[1].raws.before = '\n';
        }
      }

      if ('footer' in opts) {
        css.append(makeComment(opts.footer));
        // eslint-disable-next-line no-param-reassign
        css.nodes[css.nodes.length - 1].raws.before = '\n';
      }
    },
  };
};
module.exports.postcss = true;
