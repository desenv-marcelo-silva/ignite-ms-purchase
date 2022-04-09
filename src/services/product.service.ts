import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/database/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  listAllProducts() {
    return this.prisma.product.findMany();
  }

  createProduct() {
    
  }
}