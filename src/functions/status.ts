import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { StatusController } from '../controllers/StatusController';
import { parseEvent } from '../utils/parseEvent';
import { parseResponse } from '../utils/parseResponse';

export async function handler() {
  const response = await StatusController.handle();
  return parseResponse(response);
}