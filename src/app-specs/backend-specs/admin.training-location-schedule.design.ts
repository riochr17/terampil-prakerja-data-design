import { Transform, Type } from "class-transformer";
import { BaseEndpoint, EndpointMethod, ExpressTransform } from "../base-design";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { AuthorizedData } from "./authorization.design";
import { TrainingLocation } from "../../entity/TrainingLocation.entity";

export namespace AdminGetTrainingLocation {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training ID cannot be empty' })
    @IsNumber({}, { message: 'Training ID must be a number' })
    training_id!: number;
  }

  export class Header extends AuthorizedData {}

  export type Output = TrainingLocation[];

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/admin/training/detail/location';
  }
}

export namespace AdminDeleteTrainingLocation {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training ID cannot be empty' })
    @IsNumber({}, { message: 'Training ID must be a number' })
    training_id!: number;

    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training ID cannot be empty' })
    @IsNumber({}, { message: 'Training ID must be a number' })
    location_id!: number;
  }

  export class Header extends AuthorizedData {}

  export type Output = boolean;

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'delete';
    public static url: string = '/admin/training/detail/location';
  }
}

export namespace AdminCreateTrainingLocation {
  export class Body {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training ID cannot be empty' })
    @IsNumber({}, { message: 'Training ID must be a number' })
    training_id!: number;

    @IsNotEmpty({ message: 'Location Name cannot be empty' })
    @IsString({ message: 'Location Name must be a string' })
    name!: string;
  }

  export class Header extends AuthorizedData {}

  export type Output = boolean;

  export abstract class Endpoint extends BaseEndpoint<any, Body, any, Output> {
    public static method: EndpointMethod = 'post';
    public static url: string = '/admin/training/detail/location';
  }
}

export namespace AdminUpdateTrainingLocation {
  export class Body {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training ID cannot be empty' })
    @IsNumber({}, { message: 'Training ID must be a number' })
    training_id!: number;

    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training ID cannot be empty' })
    @IsNumber({}, { message: 'Training ID must be a number' })
    location_id!: number;

    @IsNotEmpty({ message: 'Location Name cannot be empty' })
    @IsString({ message: 'Location Name must be a string' })
    name!: string;
  }

  export class Header extends AuthorizedData {}

  export type Output = boolean;

  export abstract class Endpoint extends BaseEndpoint<any, Body, any, Output> {
    public static method: EndpointMethod = 'put';
    public static url: string = '/admin/training/detail/location';
  }
}

export namespace AdminDeleteTrainingLocationSchedule {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training ID cannot be empty' })
    @IsNumber({}, { message: 'Training ID must be a number' })
    training_id!: number;

    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training ID cannot be empty' })
    @IsNumber({}, { message: 'Training ID must be a number' })
    location_id!: number;

    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Schedule ID cannot be empty' })
    @IsNumber({}, { message: 'Schedule ID must be a number' })
    schedule_id!: number;
  }

  export class Header extends AuthorizedData {}

  export type Output = boolean;

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'delete';
    public static url: string = '/admin/training/detail/location/schedule';
  }
}

export namespace AdminCreateTrainingLocationSchedule {
  export class TrainingScheduleSessionBody {
    @Transform(ExpressTransform.date)
    @IsNotEmpty({ message: 'Schedule start time cannot be empty' })
    @IsDate({ message: 'Schedule start time must be a Date' })
    begin!: Date;

    @Transform(ExpressTransform.date)
    @IsNotEmpty({ message: 'Schedule end time cannot be empty' })
    @IsDate({ message: 'Schedule end time must be a Date' })
    end!: Date;
    
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training Session ID cannot be empty' })
    @IsNumber({}, { message: 'Training Session ID must be a number' })
    session_id!: number;
  }

  export class Body {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training ID cannot be empty' })
    @IsNumber({}, { message: 'Training ID must be a number' })
    training_id!: number;

    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training ID cannot be empty' })
    @IsNumber({}, { message: 'Training ID must be a number' })
    location_id!: number;

    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Quota cannot be empty' })
    @IsNumber({}, { message: 'Quota must be a number' })
    quota!: number;

    @IsOptional()
    @IsString({ message: 'LocationSchedule Name must be a string' })
    description?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TrainingScheduleSessionBody)
    list_schedule_session!: TrainingScheduleSessionBody[];
  }

  export class Header extends AuthorizedData {}

  export type Output = boolean;

  export abstract class Endpoint extends BaseEndpoint<any, Body, any, Output> {
    public static method: EndpointMethod = 'post';
    public static url: string = '/admin/training/detail/location/schedule';
  }
}

export namespace AdminUpdateTrainingLocationSchedule {
  export class TrainingScheduleSessionBody {
    @Transform(ExpressTransform.date)
    @IsNotEmpty({ message: 'Schedule start time cannot be empty' })
    @IsDate({ message: 'Schedule start time must be a Date' })
    begin!: Date;

    @Transform(ExpressTransform.date)
    @IsNotEmpty({ message: 'Schedule end time cannot be empty' })
    @IsDate({ message: 'Schedule end time must be a Date' })
    end!: Date;
    
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training Session ID cannot be empty' })
    @IsNumber({}, { message: 'Training Session ID must be a number' })
    session_id!: number;
  }

  export class Body {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training ID cannot be empty' })
    @IsNumber({}, { message: 'Training ID must be a number' })
    training_id!: number;

    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training ID cannot be empty' })
    @IsNumber({}, { message: 'Training ID must be a number' })
    location_id!: number;

    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Schedule ID cannot be empty' })
    @IsNumber({}, { message: 'Schedule ID must be a number' })
    schedule_id!: number;

    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Quota cannot be empty' })
    @IsNumber({}, { message: 'Quota must be a number' })
    quota!: number;

    @IsOptional()
    @IsString({ message: 'LocationSchedule Name must be a string' })
    description?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TrainingScheduleSessionBody)
    list_schedule_session!: TrainingScheduleSessionBody[];
  }

  export class Header extends AuthorizedData {}

  export type Output = boolean;

  export abstract class Endpoint extends BaseEndpoint<any, Body, any, Output> {
    public static method: EndpointMethod = 'put';
    public static url: string = '/admin/training/detail/location/schedule';
  }
}
