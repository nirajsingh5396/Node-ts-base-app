

import { NextFunction, Request, Response } from "express";

import multer from 'multer';

import xlsx from 'xlsx';

import { ICustomers } from "./customer.interface";


const upload = multer({ dest: 'uploads/' }).single("xlsx_to_json");



/**
 * Route handler
 * @param req 
 * @param res 
 * @param next 
 */

export const uploadXlsx = async (req: Request, res: Response, next: NextFunction) => {

  upload(req, res, async (err: any) => {

    if (err) {

      return res.send('something went wrong');

    }

    try {

      const customers = await xlsxToJson(req.file.path);

      res.send(customers);


    } catch (e) {
      res.send(e);
    }



  });

}

/**
 * Service Method to XLSX To JSON
 * @param path 
 */

const xlsxToJson = async (path: string): Promise<ICustomers[]> => {

  /**
   * Creating WorkBook
   */
  const wb = xlsx.readFile(path);

  /**
   * Creating WorkSheets
   */

  const ws = wb.Sheets['Sheet1'];

  /**
   * Converting sheetsToJson
   */

  const json = xlsx.utils.sheet_to_json<ICustomers>(ws);

  const customers = json.map(x => {

    const customer: ICustomers = {
      id: x.id,
      org: x.org,
      bu: x.bu,
      division: x.division,
      plannerCode: x.plannerCode,
      plannerName: x.plannerName,
      oriPartNumber: x.oriPartNumber,
      cidMappedPartNumber: x.cidMappedPartNumber,
      productFamily: x.productFamily,
      description: x.description,
      itemType: x.itemType
    }

    return customer;

  });

  return customers;

}