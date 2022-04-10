import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CustomerService } from 'src/services/customer.service';
import { Customer } from '../graphql/models/customer';
import { AuthUser, CurrentUser } from '../auth/current-user';
import { PurchaseService } from 'src/services/purchase.service';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(
    private customerService: CustomerService,
    private purchaseService: PurchaseService) { }

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  me(@CurrentUser() user: AuthUser) {
    return this.customerService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  purchases(
    @Parent() customer: Customer
  ) {
    return this.purchaseService.listAllFromCustomer(customer.id)
  }

}
