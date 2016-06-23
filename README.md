# PostCSS Banner [![Current version](https://img.shields.io/npm/v/postcss-banner.svg?style=flat-square)](https://www.npmjs.com/package/postcss-banner) [![Build Status](https://img.shields.io/travis/princed/postcss-banner.svg?style=flat-square)](https://travis-ci.org/princed/postcss-banner)

[PostCSS] plugin to add text banner and footer to resulting file.

[PostCSS]: https://github.com/postcss/postcss

## Migration from previous versions

* Asterisks to beginning of line are added automatically (use `inline: false` to disable)
* Bang isn't added automatically (use `important: true` to enable)    

## Usage

Add PostCSS Banner to your build tool:

```sh
npm install --save-dev postcss-banner
```

Set `banner` and/or `footer` properties to add banner and/or footer to your
resulting css (so use after minifier).

Example:

```js
postcss(require('postcss-banner')({banner: 'banner'}))
```

yields

```css
/*
 * banner
 */
.foo {
}
```

Value will be converted to string and wrapped with spaces by default.
Set `inline` to `true` to render the comment in a single line.

Example:

```js
var postcss = require('gulp-postcss');
var postcssBanner = require('postcss-banner');

var banner = 'single line comment';

gulp.task('css', function () {
  return gulp.src('./css/src/*.css')
    .pipe(postcss(
      [
        postcssBanner({
          banner: banner,
          inline: true
        })
      ]))
    .pipe(gulp.dest('./css'));
});
```

yields

```css
/* single line comment */
.foo {
}
```

## Options

### `banner`

Type: `String`

The string will be converted in a css comment and put at the
beginning of the css file.

### `footer`

Type: `String`

The string will be converted in a css comment and put at the
end of the css file.

### `inline`

Type: `Boolean`

Default: `false`

Render the banner all in one line.

### `important`

Type: `Boolean`

Default: `false`

Add a bang to the comment. (eg. `/*! banner v.0.0.1 */`)

NOTE: Important css comments are generally preserved from being removed
during a minification process.

## License

[MIT License](https://github.com/princed/postcss-banner/blob/master/LICENSE)
© Eugene Datsky

See [PostCSS](http://postcss.org/) docs for examples for your environment.
