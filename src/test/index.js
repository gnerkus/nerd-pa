import path from 'path';
require('app-module-path').addPath(path.resolve('./dist'));
require('dotenv').config();

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import httpMocks from 'node-mocks-http';
chai.use(chaiAsPromised);
chai.should();

global.EventEmitter = require('events').EventEmitter;
global.chai = chai;
global.chaiAsPromised = chaiAsPromised;
global.httpMocks = httpMocks;
global.MODELS = require('models').default;
global.CONFIG = require('config').default;

// The type of test being executed
const TEST_DIR = process.env.TEST_DIR || 'all';

const TEST_LOADER = {
  unit() {
    // Load model tests
    require('test/unit/models/mot.spec');

    // Load controller tests
    require('test/unit/controllers/base.controller.spec');
    require('test/unit/controllers/mot.controller.spec');
  },
  integration() {
    // Load route tests
    require('test/integration/routes/mot.route.spec');
  },
  all() {
    this.unit();
    this.integration();
  },
};

TEST_LOADER[TEST_DIR]();
