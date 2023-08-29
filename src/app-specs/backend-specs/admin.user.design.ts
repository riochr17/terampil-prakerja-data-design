import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { BaseEndpoint, EndpointMethod, ExpressTransform } from "../base-design";
import { Admin } from "../../entity/Admin.entity";
import { Transform, Type } from "class-transformer";
import { User } from "../../entity/User.entity";
import { AuthorizedData } from "./authorization.design";

export namespace AdminGetUser {
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
    data: User[]
  }

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/admin/user';
  }
}

export namespace AdminDetailUser {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'User ID cannot be empty' })
    @IsNumber({}, { message: 'User ID must be a number' })
    id!: number;
  }

  export class Header extends AuthorizedData {}

  export type Output = User;

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/admin/user/detail';
  }
}
