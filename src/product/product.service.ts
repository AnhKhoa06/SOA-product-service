import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly repo: Repository<Product>,
  ) {}

  findAll() {
    return this.repo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const p = await this.repo.findOneBy({ id });
    if (!p) throw new NotFoundException(`Không tìm thấy sản phẩm ${id}`);
    return p;
  }

  create(dto: ProductDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: ProductDto) {
    const p = await this.findOne(id);
    Object.assign(p, dto);
    return this.repo.save(p);
  }

  async remove(id: number) {
    const p = await this.findOne(id);
    await this.repo.remove(p);
    return { message: 'Đã xóa sản phẩm' };
  }
}
