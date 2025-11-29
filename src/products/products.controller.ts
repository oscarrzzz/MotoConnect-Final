import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../shared/auth.guard';

class CreateProductDto {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

class UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
}

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // pública
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(Number(id));
  }

  // protegida (necesita token)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateProductDto, @Req() req: any) {
    const ownerId = req.user?.sub;
    return this.productsService.create({ ...dto, ownerId });
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(Number(id), dto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(Number(id));
  }
}
