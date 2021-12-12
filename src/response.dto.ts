export type ResponseType = 'success'| 'fail'
export class ResponseDTO {
  message: string;
  data: any;
  status: ResponseType
}