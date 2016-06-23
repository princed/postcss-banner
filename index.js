var postcss = require('postcss');

module.exports = postcss.plugin('postcss-banner', function configure(opts) {
  opts = opts || {};

  function process(value) {
    var comment = String(value);
    var bang = opts.important ? '!' : '';

    if (!!opts.inline) {
      comment = ['',
                  comment,
                  ''
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
        css.nodes[1].raws.before = '\n';
      }
    }

    if ('footer' in opts) {
      var footer = process(opts.footer);
      css.append(footer);
      css.nodes[css.nodes.length - 1].raws.before = '\n';
    }
  };
});
