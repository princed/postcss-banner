const postcss = require('postcss');

module.exports = postcss.plugin('postcss-banner', (opts = {}) => {
  function makeComment(banner) {
    const bang = opts.important ? '!' : '';

    if (opts.inline) {
      return `/*${bang} ${banner} */`;
    }
    return `/*${bang}
${banner.replace(/^|\n/g, '$& * ')}
 */`;
  }

  return function andBanner(css) {
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
  };
});
