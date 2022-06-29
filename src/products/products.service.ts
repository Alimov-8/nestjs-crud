import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";

import { Product } from './products.model';

@Injectable()
export class ProductsService {
    products: Product [] = [];

    constructor(
      @InjectModel('Product') private readonly productModel: Model<Product>
      ) {};

    async insertProduct(
        title: string,
        description: string,
        price: number,
    ) {
        const newProduct = new this.productModel({
          title, 
          description, 
          price,
        });
        const result = await newProduct.save();
        return result.id as string;
    };

    async getProdutcs() {
        const products = await this.productModel.find();
        return products.map((prod) => ({
          id: prod.id,
          title: prod.title,
          description: prod.description,
          price: prod.price,
        }))
    };

    async getSingleProduct(id: string) {
        const product = await this.findProduct(id);
        return {
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
        };
    };

    async updateProduct(
        productId: string, 
        title: string,
        description: string,
        price: number,
    ) {
        const updatedProduct = await this.findProduct(productId);
        if (title) {
          updatedProduct.title = title;
        }
        if (description) {
          updatedProduct.description = description;
        }
        if (price) {
          updatedProduct.price = price;
        }
        updatedProduct.save();
      }

    async deleteProduct(
      productId: string, 
    ) {
      const result = await this.productModel.deleteOne({_id: productId}).exec();
    };

    private async findProduct(id: string): Promise<Product> {
      let product;
      try {
        product = await this.productModel.findById(id).exec();
      } catch (error) {
        throw new NotFoundException('Could not find product.');
      }
      if (!product) {
        throw new NotFoundException('Could not find product.');
      }
      return product;
    }
}