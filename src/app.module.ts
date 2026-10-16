import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (c: ConfigService) => ({
        type: 'mysql',
        host: c.get('DB_HOST'),
        port: +c.get('DB_PORT', '3306'),
        username: c.get('DB_USER'),
        password: c.get('DB_PASS'),
        database: c.get('DB_NAME'),
        entities: [Product],
        synchronize: false,
      }),
    }),
    ProductModule,
  ],
})
export class AppModule {}
