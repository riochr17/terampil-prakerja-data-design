import { Transform } from "class-transformer";
import { BaseEndpoint, EndpointMethod, ExpressTransform } from "../base-design";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Trainer } from "../../entity/Trainer.entity";
import { Training } from "../../entity/Training.entity";

export namespace GetTraining {
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
    data: Training[]
  }

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/training';
  }
}

export namespace GetTrainingDetail {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training id cannot be empty' })
    @IsNumber({}, { message: 'Training id must be a number' })
    id!: number;
  }

  export type Output = Training;

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/training/detail';
  }
}

export namespace GetTrainer {
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
    data: Trainer[]
  }

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/trainer';
  }
}

export namespace GetTrainerDetail {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training id cannot be empty' })
    @IsNumber({}, { message: 'Training id must be a number' })
    id!: number;
  }

  export type Output = Trainer;

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/trainer/detail';
  }
}

export namespace UpcomingTraining {
  export type Output = Training;

  export abstract class Endpoint extends BaseEndpoint<any, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/training/upcoming';
  }
}
