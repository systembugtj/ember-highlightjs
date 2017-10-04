/* eslint-env node */
'use strict';
var path = require('path');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var BroccoliDebug = require('broccoli-debug');
var fbTransform = require('fastboot-transform');

module.exports = {
  name: 'ember-highlightjs',

  treeForVendor: function(vendorTree) {
    var highlightjsDir = path.dirname(require.resolve('highlightjs'));

    var highlightjsTree = new Funnel(highlightjsDir, {
      files: ["highlight.pack.js", "highlight.pack.min.js"],
      destDir: "highlightjs"
    });

    highlightjsTree = new BroccoliDebug(
      highlightjsTree, 'ember-highlightjs:highlightjs-tree'
    );

    if (vendorTree) {
      vendorTree = mergeTrees([vendorTree, highlightjsTree]);
    } else {
      vendorTree = highlightjsTree;
    }

    return new BroccoliDebug(
      fbTransform(vendorTree), 'ember-highlightjs:vendor-tree'
    );
  },

  included: function(app) {
    this._super.included(app);
    app.import({
      development: 'vendor/highlightjs/highlight.pack.js',
      production: 'vendor/highlightjs/highlight.pack.min.js',
    });

    app.import("vendor/highlightjs/shim.js");

  }
};
