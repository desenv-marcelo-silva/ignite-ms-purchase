import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/database/prisma.service';

interface CreatePurchaseParams {
  customerId: string;
  productId: string;
}

@Injectable()
export class PurchaseService {
  constructor(private prisma: PrismaService) { }

  listAllPurchases() {
    return this.prisma.purchase.findMany(
      {
        orderBy: {
          createdAt: 'desc'
        }
      }
    );
  }

  async createPurchase({ customerId, productId }: CreatePurchaseParams) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId
      }
    });

    if (!product) {
      throw new Error('Purchase not created. Product not found!')
    }

    return await this.prisma.purchase.create({
      data: {
        productId,
        customerId
      }
    });
  }
}