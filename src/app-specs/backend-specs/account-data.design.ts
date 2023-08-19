import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { User } from "../../entity/User.entity";
import { BaseEndpoint, EndpointMethod, ExpressTransform } from "../base-design";
import { AuthorizedData } from "./authorization.design";
import { Invoice } from "../../entity/Invoice.entity";
import { Transform } from "class-transformer";
import { Certificate } from "../../entity/Certificate.entity";

export namespace MyProfile {
  export class Query {}

  export class Header extends AuthorizedData {}

  export type Output = User;

  export abstract class Endpoint extends BaseEndpoint<Query, any, Header, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/profile';
  }
}

export namespace MyInvoice {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsOptional()
    @IsNumber({}, { message: 'Limit must be a number' })
    limit?: number;

    @Transform(ExpressTransform.integer)
    @IsOptional()
    @IsNumber({}, { message: 'Offset must be a number' })
    offset?: number;
  }

  export class Header extends AuthorizedData {}

  export interface Output {
    total: number
    data: Invoice[]
  }

  export abstract class Endpoint extends BaseEndpoint<Query, any, Header, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/invoice';
  }
}

export namespace GetInvoiceDetail {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Invoice id cannot be empty' })
    @IsNumber({}, { message: 'Invoice id must be a number' })
    id!: number;
  }

  export class Header extends AuthorizedData {}

  export type Output = Invoice;

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/invoice/detail';
  }
}

export namespace MyCertificate {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsOptional()
    @IsNumber({}, { message: 'Limit must be a number' })
    limit?: number;

    @Transform(ExpressTransform.integer)
    @IsOptional()
    @IsNumber({}, { message: 'Offset must be a number' })
    offset?: number;
  }

  export class Header extends AuthorizedData {}

  export interface Output {
    total: number
    data: Certificate[]
  }

  export abstract class Endpoint extends BaseEndpoint<Query, any, Header, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/certificate';
  }
}

export namespace GetCertificateDetail {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Certificate id cannot be empty' })
    @IsNumber({}, { message: 'Certificate id must be a number' })
    id!: number;
  }

  export class Header extends AuthorizedData {}

  export type Output = Certificate;

  export abstract class Endpoint extends BaseEndpoint<Query, any, Header, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/certificate/detail';
  }
}
