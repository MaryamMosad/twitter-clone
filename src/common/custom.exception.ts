import {HttpException } from '@nestjs/common'
export class CustomException extends HttpException {
    constructor() {
      super('This is a Custom Exception',600);
    }
  }