export class CreatePaymentDto {
  paymentAmount: number;
  message: string;
  Status: string;
  transactionRef: string;
  sourceRef: string;
  paymentRef: string;
  paymentChannel: string;
  paymentTimestamp: string
}
