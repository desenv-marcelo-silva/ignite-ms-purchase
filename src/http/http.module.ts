import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from 'src/database/database.module';
import { ProductsResolver } from './resolvers/products.resolver';
import path from 'node:path';
import { ApolloDriver } from '@nestjs/apollo';
import { ProductService } from 'src/services/product.service';
import { PurchasesResolver } from './resolvers/purchases.resolver';
import { PurchaseService } from 'src/services/purchase.service';
import { CustomerService } from 'src/services/customer.service';
import { CustomerResolver } from './resolvers/customer.resolver';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [
    DatabaseModule,
    MessageModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [ProductsResolver, ProductService, PurchasesResolver, PurchaseService, CustomerService, CustomerResolver],
})
export class HttpModule { }
