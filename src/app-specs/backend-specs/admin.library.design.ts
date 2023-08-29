import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { BaseEndpoint, EndpointMethod, ExpressTransform } from "../base-design";
import { Admin } from "../../entity/Admin.entity";
import { Transform, Type } from "class-transformer";
import { Library } from "../../entity/Library.entity";
import { AuthorizedData } from "./authorization.design";
import { LibraryType } from "../../entity/LibraryType.enum";

export namespace AdminGetLibrary {
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
    data: Library[]
  }

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/admin/library';
  }
}

export namespace AdminCreateLibrary {
  export class Body {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training ID cannot be empty' })
    @IsNumber({}, { message: 'Training ID must be a number' })
    training_id!: number;

    @IsNotEmpty({ message: 'Name cannot be empty' })
    @IsString({ message: 'Name must be a string' })
    title!: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @IsNotEmpty({ message: 'Type cannot be empty' })
    @IsEnum(LibraryType, { message: 'Type must be a string' })
    type!: LibraryType;

    @IsNotEmpty({ message: 'Content URL cannot be empty' })
    @IsString({ message: 'Content URL must be a string' })
    content_url!: string;
  }

  export class Header extends AuthorizedData {}

  export type Output = Library;

  export abstract class Endpoint extends BaseEndpoint<any, Body, any, Output> {
    public static method: EndpointMethod = 'post';
    public static url: string = '/admin/library';
  }
}

export namespace AdminUpdateLibrary {
  export class Body {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Library ID cannot be empty' })
    @IsNumber({}, { message: 'Library ID must be a number' })
    id!: number;

    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training ID cannot be empty' })
    @IsNumber({}, { message: 'Training ID must be a number' })
    training_id!: number;

    @IsNotEmpty({ message: 'Name cannot be empty' })
    @IsString({ message: 'Name must be a string' })
    title!: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @IsNotEmpty({ message: 'Type cannot be empty' })
    @IsEnum(LibraryType, { message: 'Type must be a string' })
    type!: LibraryType;

    @IsNotEmpty({ message: 'Content URL cannot be empty' })
    @IsString({ message: 'Content URL must be a string' })
    content_url!: string;
  }

  export class Header extends AuthorizedData {}

  export type Output = boolean;

  export abstract class Endpoint extends BaseEndpoint<any, Body, any, Output> {
    public static method: EndpointMethod = 'put';
    public static url: string = '/admin/library';
  }
}

export namespace AdminDeleteLibrary {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Library ID cannot be empty' })
    @IsNumber({}, { message: 'Library ID must be a number' })
    id!: number;
  }

  export class Header extends AuthorizedData {}

  export type Output = boolean;

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'delete';
    public static url: string = '/admin/library';
  }
}

export namespace AdminDetailLibrary {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Library ID cannot be empty' })
    @IsNumber({}, { message: 'Library ID must be a number' })
    id!: number;
  }

  export class Header extends AuthorizedData {}

  export type Output = Library;

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/admin/library/detail';
  }
}
