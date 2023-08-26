import { Transform } from "class-transformer";
import { BaseEndpoint, EndpointMethod, ExpressTransform } from "../base-design";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { AuthorizedData } from "./authorization.design";
import { UserTrainingSchedule } from "../../entity/UserTrainingSchedule.entity";

export namespace GetMyTrainingEnrollStatus {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training id cannot be empty' })
    @IsNumber({}, { message: 'Training id must be a number' })
    id!: number;
  }

  export class Header extends AuthorizedData {}

  export type Output = UserTrainingSchedule | null;

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/my-training/enroll-status';
  }
}

export namespace EnrollTraining {
  export class Body {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training id cannot be empty' })
    @IsNumber({}, { message: 'Training id must be a number' })
    id!: number;

    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Location id cannot be empty' })
    @IsNumber({}, { message: 'Location id must be a number' })
    training_location_id!: number;

    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Schedule id cannot be empty' })
    @IsNumber({}, { message: 'Schedule id must be a number' })
    training_schedule_id!: number;

    @IsNotEmpty({ message: 'Voucher Code cannot be empty' })
    @IsString({ message: 'Voucher Code must be a string' })
    voucher_code!: string;
  }

  export class Header extends AuthorizedData {}

  export type Output = UserTrainingSchedule;

  export abstract class Endpoint extends BaseEndpoint<any, Body, any, Output> {
    public static method: EndpointMethod = 'post';
    public static url: string = '/training/enroll';
  }
}

export namespace GetMyTraining {
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

  export type Output = UserTrainingSchedule[];

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/my-training';
  }
}

export namespace GetMyTrainingProgress {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training id cannot be empty' })
    @IsNumber({}, { message: 'Training id must be a number' })
    id!: number;
  }

  export class Header extends AuthorizedData {}

  export type Output = number;

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/my-training/progress';
  }
}
