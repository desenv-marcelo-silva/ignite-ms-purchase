import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/database/prisma.service';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';

@Controller('itsok')
export class ItsokController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @UseGuards(AuthorizationGuard)
  hello() {
    return this.prisma.customer.findMany();
  }
}
