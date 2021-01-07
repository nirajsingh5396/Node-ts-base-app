/**
 
 * Controllers are responsible for handling incoming requests and returning responses to the client.
 */



/**
* Required External Modules and Interfaces
*/

import express, { Request, Response } from 'express';
import { IProducts } from './interafaces/products.interaface';
import * as ProductsService from './products.service'

/**
 * Router Definition
 */

export const productsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items/

productsRouter.get('/', ProductsService.findAllProducts);

// GET items/:id

productsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const product: IProducts = await ProductsService.find(id);

    res.status(200).send(product);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// POST items/

productsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const product: IProducts = req.body;

    await ProductsService.create(product);

    res.send({
      status: 200,
      message: "Product Created successfully"
    })
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// PUT items/

productsRouter.put("/", async (req: Request, res: Response) => {
  try {
    const item: IProducts = req.body;

    await ProductsService.update(item);

    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }

});

// DELETE items/:id

productsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await ProductsService.remove(id);

    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }

});