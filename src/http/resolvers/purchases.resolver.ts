import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PurchaseService } from 'src/services/purchase.service';
import { Purchase } from '../graphql/models/purchase';
import { Product } from '../graphql/models/product';
import { ProductService } from 'src/services/product.service';
import { CreatePurchaseInput } from '../graphql/inputs/create-purchase-input';
import { AuthUser, CurrentUser } from '../auth/current-user';
import { CustomerService } from 'src/services/customer.service';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchaseService: PurchaseService,
    private customerService: CustomerService,
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

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Purchase)
  async createPurchase(@Args('data') data: CreatePurchaseInput, @CurrentUser() user: AuthUser) {
    let customer = await this.customerService.getCustomerByAuthUserId(user.sub);

    if (!customer) {
      customer = await this.customerService.createCustomer({
        authUserId: user.sub
      });
    }

    return this.purchaseService.createPurchase({
      productId: data.productId,
      customerId: customer.id
    });
  }
}
