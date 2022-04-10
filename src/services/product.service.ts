import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/database/prisma.service';
import slugify from 'slugify';

interface CreateProductParams {
  title: string;
}

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  listAllProducts() {
    return this.prisma.product.findMany();
  }

  async createProduct({ title }: CreateProductParams) {
    const slug = slugify(title, {
      lower: true
    });

    const productWithSameSlug = await this.prisma.product.findUnique({
      where: {
        slug,
      }
    });

    if (productWithSameSlug) {
      throw new Error('There is a product with same slug!')
    }

    return this.prisma.product.create({
      data: {
        title,
        slug
      }
    });
  }
}