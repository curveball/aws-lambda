import { Response } from '@curveball/kernel';
import { KeyMultiValue } from './types';

export function convertHeaders(response: Response): KeyMultiValue {

  const result: KeyMultiValue = {};
  for (const [key, value] of Object.entries(response.headers.getAll())) {
    const newVal = Array.isArray(value) ? value : [value];
    result[key] = newVal.map( item => typeof item === 'number' ? item.toString() : item );
  }
  return result;

}

export function convertBody(response: Response): [boolean, string] {

  if (response.body === undefined || response.body === null) {
    return [false, ''];
  } else if (typeof response.body === 'string') {
    return [false, response.body];
  } else if (response.body instanceof Buffer) {
    return [true, response.body.toString('base64')];
  } else {
    return [false, JSON.stringify(response.body)];
  }

}
