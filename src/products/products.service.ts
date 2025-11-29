import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(data: {
    name: string;
    description: string;
    price: number;
    ownerId: number;
    imageUrl?: string;
  }) {
    return this.prisma.product.create({ data });
  }

  findAll() {
    return this.prisma.product.findMany({
      include: { owner: { select: { id: true, name: true, email: true } } },
    });
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { owner: true },
    });
  }

  async update(
    id: number,
    data: Partial<{
      name: string;
      description: string;
      price: number;
      imageUrl?: string;
    }>,
  ) {
    return this.prisma.product.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }

  findByOwner(ownerId: number) {
    return this.prisma.product.findMany({ where: { ownerId } });
  }
}
