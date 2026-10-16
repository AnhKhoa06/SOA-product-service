import {
  Injectable,
  NestMiddleware,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private http: HttpService,
    private config: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('Không tìm thấy token');

    try {
      const r = await firstValueFrom(
        this.http.post(
          `${this.config.get('AUTH_URL')}/auth`,
          {},
          { headers: { Authorization: authHeader } },
        ),
      );
      (req as any).user = r.data.payload;
      next();
    } catch (e: any) {
      if (e?.response?.status === 401)
        throw new UnauthorizedException('Token không hợp lệ hoặc đã hết hạn');
      throw new ServiceUnavailableException(
        'Không kết nối được dịch vụ xác thực',
      );
    }
  }
}
