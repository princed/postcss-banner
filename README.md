# PostCSS Banner [![Current version](https://img.shields.io/npm/v/postcss-banner.svg?style=flat-square)](https://www.npmjs.com/package/postcss-banner) [![Build Status](https://img.shields.io/travis/princed/postcss-banner.svg?style=flat-square)](https://travis-ci.org/princed/postcss-banner)

[PostCSS] plugin to add text banner and footer to resulting file.

[PostCSS]: https://github.com/postcss/postcss

## Usage

Set `banner` and `footer` properties to add banner and/or footer to your resulting css (so use after minifier). 

Example:

```js
postcss(require('postcss-banner')({banner: 'banner'}))
```

yields

```css
/* banner */
.foo {
}
```

Value will be converted to string and wrapped with spaces by default.
Add `*` or `!` as a first symbol to avoid wrapping in spaces (and achieve nice multi-line comments for instance).

Example:
    
```js
postcss(require('postcss-banner')({banner: '*\n' +
                                          ' * multi\n' +
                                          ' * line\n' +
                                          ' * comment\n' +
                                          ' '}))
```

yields

```css
/**
 * multi
 * line
 * comment
 */
.foo {
}
```

See [PostCSS] docs for examples for your environment.
