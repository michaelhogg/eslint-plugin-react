/**
 * @fileoverview Enforce component methods order
 * @author Yannick Croissant
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/sort-comp');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 8,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
    jsx: true
  }
};

require('babel-eslint');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({parserOptions});
ruleTester.run('sort-comp', rule, {

  valid: [{
    // Instance methods should be at the top
    code: [
      'class Hello extends React.Component {',
      '  foo = () => {}',
      '  constructor() {}',
      '  classMethod() {}',
      '  static bar = () => {}',
      '  render() {',
      '    return <div>{this.props.text}</div>;',
      '  }',
      '}'
    ].join('\n'),
    parser: 'babel-eslint',
    options: [{
      order: [
        'instance-methods',
        'lifecycle',
        'everything-else',
        'render'
      ]
    }]
  }],

  invalid: [{
    // Instance methods should not be at the top
    code: [
      'class Hello extends React.Component {',
      '  constructor() {}',
      '  static bar = () => {}',
      '  classMethod() {}',
      '  foo = function() {}',
      '  render() {',
      '    return <div>{this.props.text}</div>;',
      '  }',
      '}'
    ].join('\n'),
    parser: 'babel-eslint',
    errors: [{message: 'foo should be placed before constructor'}],
    options: [{
      order: [
        'instance-methods',
        'lifecycle',
        'everything-else',
        'render'
      ]
    }]
  }]
});
