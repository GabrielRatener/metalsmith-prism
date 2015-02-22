# metalsmith-prism

> Syntax highlighting for [Metalsmith](http://www.metalsmith.io/) HTML templates using [Prism.js](http://prismjs.com/)

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square&label=windows)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://img.shields.io/david/Availity/metalsmith-prism.svg?style=flat-square)](https://david-dm.org/Availity/metalsmith-prism)
[![Linux Passing](https://img.shields.io/travis/Availity/metalsmith-prism.svg?style=flat-square&label=linux)](https://travis-ci.org/Availity/metalsmith-prism.svg?branch=master)
[![Windows Passing](https://img.shields.io/appveyor/ci/robmcguinness/metalsmith-prism.svg?style=flat-square&label=windows)](https://ci.appveyor.com/project/robmcguinness/metalsmith-prism)

## Quickstart

+ Install **metalsmith-prism** with npm

>
``` bash
  npm install metalsmith-prism --save-dev
```

+ Add language definition to code block

>
``` html
<code class="language-css">p { color: red }</code>
```

+ Add `metalsmith-prism` plugin to metalsmith

>
``` js
var metalsmith = require('metlasmith');
var metalsmithMock = require('metalsmith-prism');
metalsmith(__dirname)
  .use(metalsmithMock())
  .build();
```

## API

JSON syntax highlighting is enhanced using the following syntax definition

>
``` js
Prism.languages.json = {
  'keys': /".+"(?=:)/g,
  'boolean': /\b(true|false)/g,
  'punctuation': /({|}|:|\[|\]|,)/g,
  'keyword': /\b(null)\b/g
}
```

## Authors

**Robert McGuinness**
+ [rob.mcguinness@availity.com](rob.mcguinness@availity.com)

## Disclaimer

Open source software components distributed or made available in the Availity Materials are licensed to Company under the terms of the applicable open source license agreements, which may be found in text files included in the Availity Materials.

## Copyright and license

Code and documentation copyright 2015 Availity, LLC. Code released under [the MIT license](https://github.com/Availity/metalsmith-prism/blob/master/LICENSE).



