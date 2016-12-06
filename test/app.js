'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const {toStudlyCaps} = require('strman');

let name = 'library';

describe('generator-library:app', () => {
  before(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({name, description: ''})
      .toPromise();
  });

  it('creates name.js files', () => {
    assert.file([`lib/${name}.js`]);
  });

  it('includes Name class', () => {
    assert.noFileContent(`lib/${name}.js`, `Class ${toStudlyCaps(name)}`);
  });
});
