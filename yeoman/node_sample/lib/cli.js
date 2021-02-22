#!/usr/bin/env node
'use strict';
const meow = require('meow');
const nodeSample = require('./');

const cli = meow(`
Usage
  $ node_sample [input]

Options
  --foo  Lorem ipsum. [Default: false]

Examples
  $ node_sample
  unicorns
  $ node_sample rainbows
  unicorns & rainbows
`);
