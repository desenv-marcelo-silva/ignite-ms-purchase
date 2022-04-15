import { Injectable } from '@nestjs/common';
import { KafkaService } from 'src/message/kafka.service';
import { PrismaService } from '../database/prisma/database/prisma.service';

interface CreatePurchaseParams {
  customerId: string;
  productId: string;
}

@Injectable()
export class PurchaseService {
  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService) { }

  listAllPurchases() {
    return this.prisma.purchase.findMany(
      {
        orderBy: {
          createdAt: 'desc'
        }
      }
    );
  }

  listAllFromCustomer(customerId: string) {
    return this.prisma.purchase.findMany(
      {
        where: {
          customerId,
        },
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

    const purchase = await this.prisma.purchase.create({
      data: {
        productId,
        customerId
      }
    });

    const customer = await this.prisma.customer.findUnique({
      where: {
        id: customerId
      }
    })

    this.kafka.emit('purchases.purchase-created', {
      customer: {
        authUserId: customer.authUserId
      },
      product: {
        id: product.id,
        title: product.title,
        slug: product.slug
      }
    });

    return purchase;
  }
}