import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { BaseEndpoint, EndpointMethod, ExpressTransform } from "../base-design";
import { Admin } from "../../entity/Admin.entity";
import { Transform, Type } from "class-transformer";
import { Trainer } from "../../entity/Trainer.entity";
import { AuthorizedData } from "./authorization.design";

export namespace AdminGetTrainer {
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
    data: Trainer[]
  }

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/admin/trainer';
  }
}

export namespace AdminCreateTrainer {
  export class Body {
    @IsNotEmpty({ message: 'Name cannot be empty' })
    @IsString({ message: 'Name must be a string' })
    name!: string;

    @IsOptional()
    @IsString({ message: 'Profile Picture URL must be a string' })
    profile_picture_url?: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @IsOptional()
    @IsString({ message: 'Occupation must be a string' })
    occupation?: string;

    @IsNotEmpty({ message: 'Signature Iamge URL cannot be empty' })
    @IsString({ message: 'Signature Iamge URL must be a string' })
    signature_image_url!: string;
  }

  export class Header extends AuthorizedData {}

  export type Output = Trainer;

  export abstract class Endpoint extends BaseEndpoint<any, Body, any, Output> {
    public static method: EndpointMethod = 'post';
    public static url: string = '/admin/trainer';
  }
}

export namespace AdminUpdateTrainer {
  export class TrainerQuestionBody {
    @IsNotEmpty({ message: 'Question cannot be empty' })
    @IsString({ message: 'Question must be a string' })
    question!: string;

    @IsNotEmpty({ message: 'Answer cannot be empty' })
    @IsString({ message: 'Answer must be a string' })
    answer!: string;

    @IsArray({ message: 'List answer must be an array' })
    @IsString({ each: true })
    @ArrayMinSize(2, { message: 'List answer need at least two answers' })
    list_answer!: string[];
  }

  export class Body {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Trainer ID cannot be empty' })
    @IsNumber({}, { message: 'Trainer ID must be a number' })
    id!: number;

    @IsNotEmpty({ message: 'Name cannot be empty' })
    @IsString({ message: 'Name must be a string' })
    name!: string;

    @IsOptional()
    @IsString({ message: 'Profile Picture URL must be a string' })
    profile_picture_url?: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @IsOptional()
    @IsString({ message: 'Occupation must be a string' })
    occupation?: string;

    @IsNotEmpty({ message: 'Signature Iamge URL cannot be empty' })
    @IsString({ message: 'Signature Iamge URL must be a string' })
    signature_image_url!: string;
  }

  export class Header extends AuthorizedData {}

  export type Output = boolean;

  export abstract class Endpoint extends BaseEndpoint<any, Body, any, Output> {
    public static method: EndpointMethod = 'put';
    public static url: string = '/admin/trainer';
  }
}

export namespace AdminDeleteTrainer {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Trainer ID cannot be empty' })
    @IsNumber({}, { message: 'Trainer ID must be a number' })
    id!: number;
  }

  export class Header extends AuthorizedData {}

  export type Output = boolean;

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'delete';
    public static url: string = '/admin/trainer';
  }
}
