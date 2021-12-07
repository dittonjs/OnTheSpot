import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nonce } from 'server/entities/nonce.entity';

@Injectable()
export class NonceService {
  constructor(
    @InjectRepository(Nonce)
    private nonceRepository: Repository<Nonce>,
  ) {}

  async validate(nonce: string): Promise<boolean> {
    try {
      await this.nonceRepository.save(this.nonceRepository.create({ nonce }));
    } catch (e) {
      return false;
    }
    return true;
  }
}
