/**
 * Data Model Interfaces
 */

import { Request, Response } from "express";
import { IProducts } from "./interafaces/products.interaface";
import axios from 'axios';
import { IException } from "../common/exception/exception.interaface";

import Axios from 'axios-observable';

import { of , Observable  , forkJoin} from 'rxjs'

import { map , mergeMap , filter } from 'rxjs/operators'

/**
 * In-Memory Store
 */


const products: IProducts[] =
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


/**
 * Service Methods
 */

export const findAll = async (): Promise<IProducts[]> => {

  return products;

}

export const find = async (id: number): Promise<IProducts> => {

  const product = products.find(x => x.id === id);

  if (!product) {

    throw new Error('Product not found');

  }

  return product;

};

export const create = async (newProduct: IProducts): Promise<void> => {

  products.push(newProduct);

};

export const update = async (updatedProduct: IProducts): Promise<void> => {

  const found = products.find(x => x.id === updatedProduct.id);

  if (!found) {

    throw new Error("No record found to update");

  }

  products[updatedProduct.id] = updatedProduct;

};

export const remove = async (id: number): Promise<void> => {

  const found = products.find(x => x.id === id);

  if (!found) {

    throw new Error("No record found to update");

  }

  delete products[found.id];

};


export async function findAllProducts(req: Request, res: Response): Promise<void> {

  getAllusers();
  try {

    const products = await findAll();
    res.status(200).send(products);

  } catch (e) {

    res.status(404).send(e.message)
  }

}

export async function getAllusers() {
  const url = 'http://142.93.214.14:8080/engine-rest/task?assignee=LMYA'

  const tasks = Axios.get(url);

  tasks.subscribe((res)=>console.log(res) );
}

