# Create Regex

[![Greenkeeper badge](https://badges.greenkeeper.io/hisco/create-regex.svg)](https://greenkeeper.io/)
[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

  Simple and powerful utility to create complex regex in javascript
# Create regex
When createing long and powerful regular expression it becomes hard to rember and manage to numerous signs and sub patterns.

`create-regex` allows you to write the regex in a more code like approche while also reducing burden of some boilerplate actions.
It also encourges the usage of regex named groups.

## Simple to use
```js
  // import the regex factory
  const {RegExpFactory} = require('create-regex');
  // The regex factory assit you in creating the regex instance
  const regexFactory = new RegExpFactory({ });
  // Now by using the `create` method you create the regex instance
  // For more advanced usage go to the `API` section
  const yourRegex = regexFactory.create(({
    nonCaptureGroupWithSeperator,
    group
  })=>
    nonCaptureGroupWithSeperator([
      group(`digits`,`\\d+`),
      group(`words`, `\\w+`),
      group(`else`, `[\\s\\S]+`)
    ])
  ,'gm');
  /*
    Prodcues the following regex:
    /(?:(?:(?<digits>\d+))|(?:(?<words>\w+))|(?:(?<else>[\s\S]+)))/gm
    Try it with the following string (we higly recommend to using the site `regex101`)
  */
  const str = `121212ababa...{}`;
  let match;

  while ((match = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (match.index === regex.lastIndex) {
          regex.lastIndex++;
      }
      
      Object.keys(match.groups).forEach((groupName) => {
      if (match.groups[groupName])
          console.log(`Found match, group ${groupName}: ${match.groups[groupName]}`);
      });
  }
  //It should produce the following output
  /*
    Found match, group digits: 121212
    Found match, group words: ababa
    Found match, group else: ...{}
  */
```
# API
The API is very simple and yet powerfull.
The factory accepts mixins the you will be able to during create

```js
  const regexFactory = new RegExpFactory({ 
    mixins: {
      stringSigns: [`'`,'"',"'"]
    },
    RegExp : RegExp // <-- you can overide the regex used internally
  });
  // Let's say we want to match quoted number and digits
  // Really quoted with the same string sign from both sides
  regexFactory.create(({
      // Built in helpers
      nonCaptureGroupWithSeperator,
      group,
      wrapPattern,
      // User mixins
      stringSigns
    })=>
      nonCaptureGroupWithSeperator([
        group(`digits`,
          wrapPattern(`\\d+`,stringSigns)
        ),
        group(`words`,
          wrapPattern(`\\w+`,stringSigns)
        ),
        group(`else`, `[\\s\\S]+`)
      ])
    ,'gm');
  /* Produces the following regex:
    /(?:(?:(?<digits>(?:(?:'\d+')|(?:"\d+")|(?:'\d+'))))|(?:(?<words>(?:(?:'\w+')|(?:"\w+")|(?:'\w+'))))|(?:(?<else>[\s\S]+)))/gm
  */
```

## License

  [MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/create-regex.svg
[npm-url]: https://npmjs.org/package/create-regex
[travis-image]: https://img.shields.io/travis/hisco/create-regex/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/hisco/create-regex
[coveralls-image]: https://coveralls.io/repos/github/hisco/create-regex/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/hisco/create-regex?branch=master
