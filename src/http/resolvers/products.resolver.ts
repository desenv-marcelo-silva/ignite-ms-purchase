import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from 'src/services/product.service';
import { Product } from '../graphql/models/product';
import { CreateProductInputs } from '../graphql/inputs/create-product-inputs';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productService: ProductService) { }

  @Query(() => [Product])
  products() {
    return this.productService.listAllProducts();
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Product)
  createProduct(
    @Args('data') data: CreateProductInputs) {
    return this.productService.createProduct(data);
  }

  
}
