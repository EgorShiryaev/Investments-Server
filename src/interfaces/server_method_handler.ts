import { Request, Response } from 'express';

type ServerMethodHandler = (request: Request, response: Response) => void

export default ServerMethodHandler;
