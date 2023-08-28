import { ArrayMinSize, IsArray, IsDefined, IsEnum, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { BaseEndpoint, EndpointMethod, ExpressTransform } from "../base-design";
import { Admin } from "../../entity/Admin.entity";
import { Transform, Type } from "class-transformer";
import { Training } from "../../entity/Training.entity";
import { TrainingType } from "../../entity/TrainingType.enum";
import { MaterialQuizType } from "../../entity/MaterialQuizType.enum";
import { AuthorizedData } from "./authorization.design";
import { SessionMaterialType } from "../../entity/SessionMaterialType.enum";

export namespace AdminGetTraining {
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
    data: Training[]
  }

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/admin/training';
  }
}

export namespace AdminCreateTraining {
  export class TrainignSessionMaterialOfflineClass {
    @IsNotEmpty({ message: 'Location cannot be empty' })
    @IsString({ message: 'Location must be a string' })
    location!: string;
  }

  export class TrainignSessionMaterialOnlineClass {
    @IsNotEmpty({ message: 'Meeting URL cannot be empty' })
    @IsString({ message: 'Meeting URL must be a string' })
    meeting_url!: string;
  }

  export class TrainignSessionMaterialAssignment {
    @IsNotEmpty({ message: 'Deadline cannot be empty' })
    @IsString({ message: 'Deadline must be a string' })
    deadline!: string;
  }

  export class TrainingSessionMaterialQuiz {
    @IsNotEmpty({ message: 'List Quiz ID cannot be empty' })
    @IsNumber({}, { each: true })
    @ArrayMinSize(1, { message: 'List Quiz ID need at least one quiz' })
    list_quiz_id!: number[];
  }

  export class TrainingSessionMaterial {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Duration seconds cannot be empty' })
    @IsNumber({}, { message: 'Duration seconds must be a number' })
    duration_seconds!: number;

    @IsNotEmpty({ message: 'Type cannot be empty' })
    @IsEnum(SessionMaterialType, { message: 'Type must be a string' })
    type!: SessionMaterialType;

    @IsNotEmpty({ message: 'Title cannot be empty' })
    @IsString({ message: 'Title must be a string' })
    title!: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => TrainingSessionMaterialQuiz)
    material_quiz?: TrainingSessionMaterialQuiz;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => TrainignSessionMaterialAssignment)
    material_assignment?: TrainignSessionMaterialAssignment;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => TrainignSessionMaterialOnlineClass)
    material_online_class?: TrainignSessionMaterialOnlineClass;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => TrainignSessionMaterialOfflineClass)
    material_offline_class?: TrainignSessionMaterialOfflineClass;
  }

  export class TrainingSessionBody {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Duration seconds cannot be empty' })
    @IsNumber({}, { message: 'Duration seconds must be a number' })
    duration_seconds!: number;

    @IsNotEmpty({ message: 'Title cannot be empty' })
    @IsString({ message: 'Title must be a string' })
    title!: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TrainingSessionMaterial)
    list_material!: TrainingSessionMaterial[];
  }

  export class Body {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Trainer ID cannot be empty' })
    @IsNumber({}, { message: 'Trainer ID must be a number' })
    trainer_id!: number;

    @IsNotEmpty({ message: 'Banner cannot be empty' })
    @IsString({ message: 'Banner must be a string' })
    banner_url!: string;

    @IsNotEmpty({ message: 'Competency cannot be empty' })
    @IsString({ message: 'Competency must be a string' })
    competency!: string;

    @IsNotEmpty({ message: 'Course Code cannot be empty' })
    @IsString({ message: 'Course Code must be a string' })
    course_code!: string;

    @IsNotEmpty({ message: 'Training Type cannot be empty' })
    @IsEnum(TrainingType, { message: 'Training Type must be an enum' })
    type!: TrainingType;

    @IsNotEmpty({ message: 'Title cannot be empty' })
    @IsString({ message: 'Title must be a string' })
    title!: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TrainingSessionBody)
    list_session!: TrainingSessionBody[];
  }

  export class Header extends AuthorizedData {}

  export type Output = Training;

  export abstract class Endpoint extends BaseEndpoint<any, Body, any, Output> {
    public static method: EndpointMethod = 'post';
    public static url: string = '/admin/training';
  }
}

export namespace AdminUpdateTraining {
  export class TrainignSessionMaterialOfflineClass {
    @Transform(ExpressTransform.integer)
    @IsOptional()
    @IsNumber({}, { message: 'Training ID must be a number' })
    id?: number;

    @IsNotEmpty({ message: 'Location cannot be empty' })
    @IsString({ message: 'Location must be a string' })
    location!: string;
  }

  export class TrainignSessionMaterialOnlineClass {
    @Transform(ExpressTransform.integer)
    @IsOptional()
    @IsNumber({}, { message: 'Training ID must be a number' })
    id?: number;

    @IsNotEmpty({ message: 'Meeting URL cannot be empty' })
    @IsString({ message: 'Meeting URL must be a string' })
    meeting_url!: string;
  }

  export class TrainignSessionMaterialAssignment {
    @Transform(ExpressTransform.integer)
    @IsOptional()
    @IsNumber({}, { message: 'Training ID must be a number' })
    id?: number;

    @IsNotEmpty({ message: 'Deadline cannot be empty' })
    @IsString({ message: 'Deadline must be a string' })
    deadline!: string;
  }

  export class TrainingSessionMaterialQuiz {
    @Transform(ExpressTransform.integer)
    @IsOptional()
    @IsNumber({}, { message: 'Training ID must be a number' })
    id?: number;

    @IsNotEmpty({ message: 'List Quiz ID cannot be empty' })
    @IsNumber({}, { each: true })
    @ArrayMinSize(1, { message: 'List Quiz ID need at least one quiz' })
    list_quiz_id!: number[];
  }

  export class TrainingSessionMaterial {
    @Transform(ExpressTransform.integer)
    @IsOptional()
    @IsNumber({}, { message: 'Training ID must be a number' })
    id?: number;

    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Duration seconds cannot be empty' })
    @IsNumber({}, { message: 'Duration seconds must be a number' })
    duration_seconds!: number;

    @IsNotEmpty({ message: 'Type cannot be empty' })
    @IsEnum(SessionMaterialType, { message: 'Type must be a string' })
    type!: SessionMaterialType;

    @IsNotEmpty({ message: 'Title cannot be empty' })
    @IsString({ message: 'Title must be a string' })
    title!: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => TrainingSessionMaterialQuiz)
    material_quiz?: TrainingSessionMaterialQuiz;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => TrainignSessionMaterialAssignment)
    material_assignment?: TrainignSessionMaterialAssignment;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => TrainignSessionMaterialOnlineClass)
    material_online_class?: TrainignSessionMaterialOnlineClass;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => TrainignSessionMaterialOfflineClass)
    material_offline_class?: TrainignSessionMaterialOfflineClass;
  }

  export class TrainingSessionBody {
    @Transform(ExpressTransform.integer)
    @IsOptional()
    @IsNumber({}, { message: 'Training ID must be a number' })
    id?: number;

    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Duration seconds cannot be empty' })
    @IsNumber({}, { message: 'Duration seconds must be a number' })
    duration_seconds!: number;

    @IsNotEmpty({ message: 'Title cannot be empty' })
    @IsString({ message: 'Title must be a string' })
    title!: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TrainingSessionMaterial)
    list_material!: TrainingSessionMaterial[];
  }

  export class Body {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training ID cannot be empty' })
    @IsNumber({}, { message: 'Training ID must be a number' })
    id!: number;

    @IsNotEmpty({ message: 'Banner cannot be empty' })
    @IsString({ message: 'Banner must be a string' })
    banner_url!: string;

    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Trainer ID cannot be empty' })
    @IsNumber({}, { message: 'Trainer ID must be a number' })
    trainer_id!: number;

    @IsNotEmpty({ message: 'Competency cannot be empty' })
    @IsString({ message: 'Competency must be a string' })
    competency!: string;

    @IsNotEmpty({ message: 'Course Code cannot be empty' })
    @IsString({ message: 'Course Code must be a string' })
    course_code!: string;

    @IsNotEmpty({ message: 'Training Type cannot be empty' })
    @IsEnum(TrainingType, { message: 'Training Type must be an enum' })
    type!: TrainingType;

    @IsNotEmpty({ message: 'Title cannot be empty' })
    @IsString({ message: 'Title must be a string' })
    title!: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TrainingSessionBody)
    list_session!: TrainingSessionBody[];
  }

  export class Header extends AuthorizedData {}

  export type Output = boolean;

  export abstract class Endpoint extends BaseEndpoint<any, Body, any, Output> {
    public static method: EndpointMethod = 'put';
    public static url: string = '/admin/training';
  }
}

export namespace AdminDeleteTraining {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training ID cannot be empty' })
    @IsNumber({}, { message: 'Training ID must be a number' })
    id!: number;
  }

  export class Header extends AuthorizedData {}

  export type Output = boolean;

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'delete';
    public static url: string = '/admin/training';
  }
}

export namespace AdminDetailTraining {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training ID cannot be empty' })
    @IsNumber({}, { message: 'Training ID must be a number' })
    id!: number;
  }

  export class Header extends AuthorizedData {}

  export type Output = Training;

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/admin/training/detail';
  }
}
