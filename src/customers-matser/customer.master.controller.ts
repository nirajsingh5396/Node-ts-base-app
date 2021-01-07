/**
* Required External Modules and Interfaces
*/

import express, { Request, Response } from 'express';

import * as CustomerService from './customer.master.service';

/**
 * Router Definition
 */

export const customerRouter = express.Router();


/**
 * Controller Definitions
 */

// GET customer-master/:id

customerRouter.post('/' , CustomerService.uploadXlsx );