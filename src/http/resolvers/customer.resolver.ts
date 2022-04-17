
import { Parent, Query, ResolveField, Resolver, ResolveReference } from '@nestjs/graphql';
import { CustomerService } from 'src/services/customer.service';
import { Customer } from '../graphql/models/customer';
import { PurchaseService } from 'src/services/purchase.service';
import { UseGuards } from '@nestjs/common';
import { AuthUser, CurrentUser } from '../auth/current-user';
import { AuthorizationGuard } from '../auth/authorization.guard';

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

  @ResolveReference()
  resolveReference(reference: { authUserId: string }) {
    return this.customerService.getCustomerByAuthUserId(reference.authUserId);
  }
}
