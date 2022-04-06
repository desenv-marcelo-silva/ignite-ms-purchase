import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/database/prisma/database/prisma.service';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';

@Resolver()
export class TestResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => String)
  @UseGuards(AuthorizationGuard)
  hello() {
    return 'Hello World GQL!'; //this.prisma.customer.findMany();
  }
}
