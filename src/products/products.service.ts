import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'; 
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.product.findMany();
  }

  async getById(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    return product;
  }

  async create(data: Prisma.ProductCreateInput) {
    if (!data.name || data.price <= 0) {
      throw new BadRequestException('Nome não pode ser vazio e preço deve ser positivo.');
    }
    return await this.prisma.product.create({ data });
  }

  async update(id: number, data: Prisma.ProductUpdateInput) {
    await this.getById(id); // Verifica se existe
    return await this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    await this.getById(id); // Verifica se existe
    return await this.prisma.product.delete({ where: { id } });
  }
}
