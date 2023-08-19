export namespace ExpressTransform {
  export function integer({ value }: any): number | null {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    return parseInt(value);
  }

  export function boolean({ value }: any): boolean | null {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    return value === 'true' || ((typeof value === 'boolean') && value);
  }

  export function decimal({ value }: any): number | null {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    return parseFloat(value);
  }

  export function date({ value }: any): Date | null {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    return new Date(value);
  }
}

export type EndpointMethod = 'get' | 'post' | 'put' | 'delete';

export abstract class BaseEndpoint<QueryType, BodyType, HeaderType, OutputType> {
  public static method: EndpointMethod;
  public static url: string;
  public abstract action(query?: QueryType, body?: BodyType, header?: HeaderType): Promise<OutputType>
}
