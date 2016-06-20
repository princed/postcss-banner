var postcss = require('postcss');

module.exports = postcss.plugin('postcss-banner', function (opts) {
  opts = opts || {};

  function process(value) {
    var text = String(value);
    var comment = text;

    if (!opts.inline) {
      comment = [''].
        concat(text.split('\n')).
        join('\n * ').
        concat('\n ');
    } else {
      comment = [' ', comment, ' '].join('');
    }

    comment = ['/*!', comment, '*/'].join('');

    return comment;
  }

  return function (css) {
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
