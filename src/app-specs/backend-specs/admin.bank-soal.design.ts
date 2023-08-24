import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { BaseEndpoint, EndpointMethod, ExpressTransform } from "../base-design";
import { Transform, Type } from "class-transformer";
import { Quiz } from "../../entity/Quiz.entity";
import { AuthorizedData } from "./authorization.design";

export namespace AdminGetBankSoal {
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
    data: Quiz[]
  }

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/admin/bank-soal';
  }
}

export namespace AdminCreateBankSoal {
  export class QuizQuestionBody {
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
    @IsNotEmpty({ message: 'Label cannot be empty' })
    @IsString({ message: 'Label must be a string' })
    label!: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QuizQuestionBody)
    list_question!: QuizQuestionBody[];
  }

  export class Header extends AuthorizedData {}

  export type Output = Quiz;

  export abstract class Endpoint extends BaseEndpoint<any, Body, any, Output> {
    public static method: EndpointMethod = 'post';
    public static url: string = '/admin/bank-soal';
  }
}

export namespace AdminUpdateBankSoal {
  export class QuizQuestionBody {
    @Transform(ExpressTransform.integer)
    @IsOptional()
    @IsNumber({}, { message: 'Quiz Question ID must be a number' })
    id?: number;

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
    @IsNotEmpty({ message: 'Quiz ID cannot be empty' })
    @IsNumber({}, { message: 'Quiz ID must be a number' })
    id!: number;

    @IsNotEmpty({ message: 'Label cannot be empty' })
    @IsString({ message: 'Label must be a string' })
    label!: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QuizQuestionBody)
    list_question!: QuizQuestionBody[];
  }

  export class Header extends AuthorizedData {}

  export type Output = boolean;

  export abstract class Endpoint extends BaseEndpoint<any, Body, any, Output> {
    public static method: EndpointMethod = 'put';
    public static url: string = '/admin/bank-soal';
  }
}

export namespace AdminDeleteBankSoal {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Quiz ID cannot be empty' })
    @IsNumber({}, { message: 'Quiz ID must be a number' })
    id!: number;
  }

  export class Header extends AuthorizedData {}

  export type Output = boolean;

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'delete';
    public static url: string = '/admin/bank-soal';
  }
}

export namespace AdminDetailBankSoal {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Quiz ID cannot be empty' })
    @IsNumber({}, { message: 'Quiz ID must be a number' })
    id!: number;
  }

  export class Header extends AuthorizedData {}

  export type Output = Quiz;

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/admin/bank-soal/detail';
  }
}
