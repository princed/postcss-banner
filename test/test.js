var postcss = require('postcss');
var expect = require('chai').expect;

var plugin = require('../');

var testProcess = function (input, output, opts) {
    expect(postcss(plugin(opts)).process(input).css).to.eql(output);
};

var input = 'a{ decl: value; }';

var multilineText = '' +
    '*\n' +
    ' * multi\n' +
    ' * line\n' +
    ' * comment\n' +
    ' ';

var multilineResult = '' +
    '/**\n' +
    ' * multi\n' +
    ' * line\n' +
    ' * comment\n' +
    ' */';

describe('postcss-banner', function () {
    describe('banner', function () {
        it('should add banner', function () {
            testProcess(input, '/* LOL */\na{ decl: value; }', {banner: 'LOL'});
        });

        it('should not add spaces with ! and * to banner', function () {
            testProcess(input, '/*!LOL*/\na{ decl: value; }', {banner: '!LOL'});
            testProcess(input, '/**LOL*/\na{ decl: value; }', {banner: '*LOL'});
        });

        it('should add multiline banner', function () {
            testProcess(input, multilineResult + '\na{ decl: value; }', {banner: multilineText});
        });
    });

    describe('footer', function () {
        it('should add footer', function () {
            testProcess(input, 'a{ decl: value; }\n/* LOL */', {footer: 'LOL'});
        });

        it('should not add spaces with ! and * to banner', function () {
            testProcess(input, '/*!LOL*/\na{ decl: value; }', {banner: '!LOL'});
            testProcess(input, '/**LOL*/\na{ decl: value; }', {banner: '*LOL'});
        });

        it('should add multiline footer', function () {
            testProcess(input, 'a{ decl: value; }\n' + multilineResult, {footer: multilineText});
        });
    });

    describe('both', function () {
        it('should add banner and footer', function () {
            testProcess(input, '/* banner */\na{ decl: value; }\n/* footer */', {footer: 'footer', banner: 'banner'});
        });

        it('should convert values to string', function () {
            testProcess(input, '/* undefined */\na{ decl: value; }\n/* undefined */', {banner: undefined, footer: undefined});
        });

        it('should ignore not set values', function () {
            testProcess(input, input, {});
        });
    });
});
