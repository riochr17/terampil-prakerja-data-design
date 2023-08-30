import { BaseEndpoint, EndpointMethod, ExpressTransform } from "../base-design";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { AuthorizedData } from "./authorization.design";
import { TrainingRating } from "../../entity/TrainingRating.entity";

export namespace SubmitTrainingReview {
  export class Body {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training id cannot be empty' })
    @IsNumber({}, { message: 'Training id must be a number' })
    training_id!: number;

    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Rating id cannot be empty' })
    @IsNumber({}, { message: 'Rating id must be a number' })
    rating!: number;

    @IsOptional()
    @IsString({ message: 'Notes must be a string' })
    notes?: string;
  }

  export class Header extends AuthorizedData {}

  export type Output = boolean;

  export abstract class Endpoint extends BaseEndpoint<any, Body, Header, Output> {
    public static method: EndpointMethod = 'post';
    public static url: string = '/training-review/submit';
  }
}

export namespace GetTrainingReview {
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

  export interface Output {
    total: number
    data: TrainingRating[]
  }

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/training-review';
  }
}

export namespace MyTrainingReview {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training ID cannot be empty' })
    @IsNumber({}, { message: 'Training ID must be a number' })
    training_id!: number;
  }

  export type Output = TrainingRating;

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/training-review/my-review';
  }
}
