// tests/unit/chartist-module-test.js
import { module, test } from 'qunit';
import hljs from 'hightlightjs';

module('highlightjs as an ES6 module');

test('it works', function(assert) {
  assert.ok(hljs !== null);
});
