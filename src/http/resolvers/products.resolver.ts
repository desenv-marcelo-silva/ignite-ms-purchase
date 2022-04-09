import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from 'src/services/product.service';
import { Product } from '../graphql/models/product';

@Resolver()
export class ProductsResolver {
  constructor(private productService: ProductService) {}

  @Query(() => [Product])
  //@UseGuards(AuthorizationGuard)
  products() {
    return this.productService.listAllProducts();
  }

  @Mutation()
  createProduct() {
    this.productService.createProduct();
  }
}
