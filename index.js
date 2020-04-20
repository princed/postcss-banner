const postcss = require('postcss');

module.exports = postcss.plugin('postcss-banner', (opts = {}) => {
  function process(value) {
    let comment = String(value);
    const bang = opts.important ? '!' : '';

    if (opts.inline) {
      comment = ['',
        comment,
        '',
      ].join(' ');
    } else {
      comment = [].concat('', comment.split('\n'))
        .join('\n * ')
        .concat('\n ');
    }

    return ['/*', bang, comment, '*/'].join('');
  }

  return function andBanner(css) {
    if ('banner' in opts) {
      css.prepend(process(opts.banner));

      // New line after banner
      if (css.nodes[1]) {
        // eslint-disable-next-line no-param-reassign
        css.nodes[1].raws.before = '\n';
      }
    }

    if ('footer' in opts) {
      const footer = process(opts.footer);
      css.append(footer);
      // eslint-disable-next-line no-param-reassign
      css.nodes[css.nodes.length - 1].raws.before = '\n';
    }
  };
});
