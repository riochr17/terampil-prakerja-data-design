import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { BaseEndpoint, EndpointMethod, ExpressTransform } from "../base-design";
import { Transform } from "class-transformer";
import { Voucher } from "../../entity/Voucher.entity";
import { AuthorizedData } from "./authorization.design";

export namespace AdminGetVoucher {
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
    data: Voucher[]
  }

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/admin/voucher';
  }
}

export namespace AdminCreateVoucher {
  export class Body {
    @IsNotEmpty({ message: 'Name cannot be empty' })
    @IsString({ message: 'Name must be a string' })
    code!: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @Transform(ExpressTransform.integer)
    @IsOptional()
    @IsNumber({}, { message: 'Quota must be a number' })
    quota!: string;
  }

  export class Header extends AuthorizedData {}

  export type Output = Voucher;

  export abstract class Endpoint extends BaseEndpoint<any, Body, any, Output> {
    public static method: EndpointMethod = 'post';
    public static url: string = '/admin/voucher';
  }
}

export namespace AdminUpdateVoucher {
  export class Body {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Voucher ID cannot be empty' })
    @IsNumber({}, { message: 'Voucher ID must be a number' })
    id!: number;

    @IsNotEmpty({ message: 'Name cannot be empty' })
    @IsString({ message: 'Name must be a string' })
    code!: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @Transform(ExpressTransform.integer)
    @IsOptional()
    @IsNumber({}, { message: 'Quota must be a number' })
    quota!: string;
  }

  export class Header extends AuthorizedData {}

  export type Output = boolean;

  export abstract class Endpoint extends BaseEndpoint<any, Body, any, Output> {
    public static method: EndpointMethod = 'put';
    public static url: string = '/admin/voucher';
  }
}

export namespace AdminDeleteVoucher {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Voucher ID cannot be empty' })
    @IsNumber({}, { message: 'Voucher ID must be a number' })
    id!: number;
  }

  export class Header extends AuthorizedData {}

  export type Output = boolean;

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'delete';
    public static url: string = '/admin/voucher';
  }
}

export namespace AdminDetailVoucher {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Voucher ID cannot be empty' })
    @IsNumber({}, { message: 'Voucher ID must be a number' })
    id!: number;
  }

  export class Header extends AuthorizedData {}

  export type Output = Voucher;

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/admin/voucher/detail';
  }
}
