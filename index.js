var postcss = require('postcss');

module.exports = function (opts) {
    opts = opts || {};

    function process(value) {
        var text = String(value);
        var comment = postcss.comment({ text: text });

        if (text.indexOf('*') === 0 || text.indexOf('!') === 0) {
            comment.left = '';
            comment.right = '';
        }

        return comment;
    }

    return function (css) {
        if ('banner' in opts) {
            css.prepend(process(opts.banner));

            // New line after banner
            if (css.nodes[1]) {
                css.nodes[1].before = '\n';
            }
        }

        if ('footer' in opts) {
            var footer = process(opts.footer);
            footer.before = '\n';

            css.append(footer);
        }
    };
};
module.exports.postcss = function (css) {
    return module.exports()(css);
};
