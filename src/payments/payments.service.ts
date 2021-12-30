import { Injectable } from '@nestjs/common';
import { PaymentsGateway } from 'src/web-socket/payments.gateway';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    private paymentGateway: PaymentsGateway
  ) {}
  create(createPaymentDto: CreatePaymentDto) {
    return this.paymentGateway.alertNewPayment(createPaymentDto.transactionRef, createPaymentDto)
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
