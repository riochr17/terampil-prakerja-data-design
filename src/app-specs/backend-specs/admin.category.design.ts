import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { BaseEndpoint, EndpointMethod, ExpressTransform } from "../base-design";
import { Admin } from "../../entity/Admin.entity";
import { Transform, Type } from "class-transformer";
import { Category } from "../../entity/Category.entity";
import { AuthorizedData } from "./authorization.design";

export namespace AdminGetCategory {
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
    data: Category[]
  }

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/admin/category';
  }
}

export namespace AdminCreateCategory {
  export class Body {
    @IsNotEmpty({ message: 'Label cannot be empty' })
    @IsString({ message: 'Label must be a string' })
    label!: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;
  }

  export class Header extends AuthorizedData {}

  export type Output = Category;

  export abstract class Endpoint extends BaseEndpoint<any, Body, any, Output> {
    public static method: EndpointMethod = 'post';
    public static url: string = '/admin/category';
  }
}

export namespace AdminUpdateCategory {
  export class Body {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Category ID cannot be empty' })
    @IsNumber({}, { message: 'Category ID must be a number' })
    id!: number;

    @IsNotEmpty({ message: 'Label cannot be empty' })
    @IsString({ message: 'Label must be a string' })
    label!: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;
  }

  export class Header extends AuthorizedData {}

  export type Output = boolean;

  export abstract class Endpoint extends BaseEndpoint<any, Body, any, Output> {
    public static method: EndpointMethod = 'put';
    public static url: string = '/admin/category';
  }
}

export namespace AdminDeleteCategory {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Category ID cannot be empty' })
    @IsNumber({}, { message: 'Category ID must be a number' })
    id!: number;
  }

  export class Header extends AuthorizedData {}

  export type Output = boolean;

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'delete';
    public static url: string = '/admin/category';
  }
}

export namespace AdminDetailCategory {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Category ID cannot be empty' })
    @IsNumber({}, { message: 'Category ID must be a number' })
    id!: number;
  }

  export class Header extends AuthorizedData {}

  export type Output = Category;

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/admin/category/detail';
  }
}
