"use strict";
require('@next/env').loadEnvConfig('./');
const _ = require('lodash');

const sequalizeConfig = require('./sequalize_config');

sequalizeConfig.syncModels();
