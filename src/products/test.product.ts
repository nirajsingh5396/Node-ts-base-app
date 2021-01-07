
/**
 * Data Model Interfaces
 */

import { Request, Response } from "express";
import { IProducts } from "./interafaces/products.interaface";

export default class ProductsService {

  /**
 * In-Memory Store
 */

  products: IProducts[] =
    [
      {
        id: 1,
        name: "Burger",
        price: 5.99,
        description: "Tasty",
        image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
      },
      {
        id: 2,
        name: "Pizza",
        price: 2.99,
        description: "Cheesy",
        image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
      },
      {
        id: 3,
        name: "Tea",
        price: 1.99,
        description: "Informative",
        image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
      }
    ]

  constructor() {

  }

  /**
  * Service Methods
  */

  async findAll(): Promise<IProducts[]> {

    return this.products;

  };

  async find(id: number): Promise<IProducts> {

    const product = this.products.find(x => x.id === id);

    if (!product) {

      throw new Error('Product not found');

    }

    return product;

  };

  async create(newProduct: IProducts): Promise<void> {

    this.products.push(newProduct);

  };

  async update(updatedProduct: IProducts): Promise<void> {

    const found = this.products.find(x => x.id === updatedProduct.id);

    if (!found) {

      throw new Error("No record found to update");

    }

    this.products[updatedProduct.id] = updatedProduct;

  };

  async remove(id: number): Promise<void> {

    const found = this.products.find(x => x.id === id);

    if (!found) {

      throw new Error("No record found to ");

    }

    delete this.products[found.id];

  };

  async findAllProducts(req: Request, res: Response): Promise<void> {

    try {

      const products = await this.findAll();
      res.status(200).send(products);

    } catch (e) {

      res.status(404).send(e.message)
    }

  }

}