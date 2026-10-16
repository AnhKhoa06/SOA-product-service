# Product Service (Bài thực hành 3 - SOA NestJS)

Dịch vụ quản lý sản phẩm, chạy cổng 3001, database riêng product_db.
Xác thực bằng cách gọi dịch vụ ở bài thực hành 2 (POST /auth, cổng 3000).

## Cài đặt

1. `npm install`
2. Tạo database: chạy file database/product_db.sql trong MySQL
3. Copy `.env.example` thành `.env` rồi điền mật khẩu MySQL
4. Chạy dịch vụ bài 2 (cổng 3000) trước
5. `npm run start:dev`

## API

Cần header `Authorization: Bearer <token>`

- GET /products
- GET /products/:id
- POST /products
- PUT /products/:id
- DELETE /products/:id

## SQL

```sql
CREATE DATABASE product_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE product_db;

CREATE TABLE products (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255)   NOT NULL,
  description TEXT,
  price       DECIMAL(10, 2) NOT NULL,
  quantity    INT            NOT NULL DEFAULT 0,
  created_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```
