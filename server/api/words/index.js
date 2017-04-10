'use strict';

import _ from 'lodash';
import express from 'express';
import WordsController from './words.controller';

let ctrl = new WordsController();

let router = express.Router();
router.get('/', ctrl.getWords.bind(ctrl));

export default router;
