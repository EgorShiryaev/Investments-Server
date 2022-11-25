import { Request } from 'express';

export const logRequest = (request: Request) => {
  console.log('===========================');
  console.log(request.method, request.path, new Date().toLocaleTimeString());
  console.log(request.body);
};
