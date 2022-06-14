import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { StockService } from './stock.service';

@Controller()
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @EventPattern('product-created')
  async handleProductCreatedEvent(data: Record<string, unknown>) {
    console.log(data);
  }

  @EventPattern('product-updated')
  async handleProductUpdatedEvent(data: Record<string, unknown>) {
    console.log(data);
  }

  @EventPattern('product-deleted')
  async handleProductDeletedEvent(data: Record<string, unknown>) {
    console.log(data);
  }

  @EventPattern('order-created')
  async handleOrderCreatedEvent(data: Record<string, unknown>) {
    this.stockService.updateStock(data);
  }
}
