'use strict';

import _ from 'lodash';
import express from 'express';
import NumWordsController from './num-words.controller';

let ctrl = new NumWordsController();

let router = express.Router();
router.get('/', ctrl.getResult.bind(ctrl));

export default router;
