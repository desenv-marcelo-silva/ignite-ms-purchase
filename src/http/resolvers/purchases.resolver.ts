import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PurchaseService } from 'src/services/purchase.service';
import { Purchase } from '../graphql/models/purchase';
import { Product } from '../graphql/models/product';
import { ProductService } from 'src/services/product.service';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(private purchaseService: PurchaseService,
    private productService: ProductService) { }

  @UseGuards(AuthorizationGuard)
  @Query(() => [Purchase])
  purchases() {
    return this.purchaseService.listAllPurchases();
  }

  @ResolveField(() => Product)
  product(
    @Parent() purchase: Purchase
  ) {
    return this.productService.getProductById(purchase.productId)
  }
}
