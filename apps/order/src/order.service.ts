import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrderService {
  constructor(@Inject('INVENTORY_SERVICE') private client: ClientProxy) {}

  async create(order: any) {
    await this.client.emit('order-created', order);
  }
}
