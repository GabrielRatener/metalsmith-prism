var cheerio = require('cheerio');
var extname = require('path').extname;
var _ = require('lodash');
var Prism = require('prismjs');
var he = require('he');
var vm = require('vm');
var fs = require('fs');

var jsonSyntax = require('./prism-json');

var isHTMLFile = function(filePath) {
  return /\.html|\.htm/.test(extname(filePath));
};

module.exports = function(_options) {

  var options = _options || {};

  Prism.languages.json = options.json ? options.json : jsonSyntax;

  if (options.hasOwnProperty('newLanguages')) {
    for (var newLang in options.newLanguages) {
      if (!options.newLanguages.hasOwnProperty(newLang)) {
        continue;
      }

      Prism.languages[newLang] = options.newLanguages[newLang];
    }
  }

  return function(files, metalsmith, done) {

    setImmediate(done);

    function requireLanguage(language) {

      if (!Prism.languages[language]) {

        var path = require.resolve('prismjs/components/prism-' + language);
        var code = fs.readFileSync(path, 'utf8').toString();

        // make Prism and self object available in the plugins local scope
        vm.runInNewContext(code, {
          self: {},
          Prism: Prism
        });
      }
    }

    function addLineNumber($el) {

      var $parent = $el.parent();
      if ($parent && $parent.is('pre')) {
        $parent.addClass('line-numbers');
      }

    }

    _.each(files, function(file, name) {

      // gulpsmith || vanilla Metalsmith support
      if (!isHTMLFile(file.path || name)) {
        return;
      }

      var contents = file.contents.toString();
      var $ = cheerio.load(contents);
      var highlighted = false;

      $('code').each(function() {

        var $this = $(this);
        var className = $this.attr('class') || '';
        var targets = className.split('language-');

        if (targets.length > 1) {

          if (options.lineNumbers) {
            addLineNumber($this);
          }

          highlighted = true;

          var language = targets[1];

          requireLanguage(language);

          var html = (language === 'markup' && !options.decode) ? $this.html() : he.decode($this.html());

          var highlightedCode = Prism.highlight(html, Prism.languages[language]);

          if (options.lineNumbers) {
            // Work-around to get the number of lines
            var numberOfLines = html.split('\n').length;
            var $lineNumbersRows = '' +
                '<span class="line-numbers-rows">' +
                    _.range(numberOfLines).map(function() { return '<span></span>'; }).join('') +
                '</span>';
            highlightedCode += $lineNumbersRows;
          }

          $this.html(highlightedCode);

        }

      });

      if (highlighted) {
        file.contents = new Buffer($.html());
      }

    });
  };

};
