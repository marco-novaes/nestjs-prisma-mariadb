import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from 'src/prisma.module';  

@Module({
  imports: [PrismaModule], // 🔹 Importando o módulo PrismaModule
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
