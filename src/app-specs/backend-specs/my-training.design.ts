import { Transform } from "class-transformer";
import { BaseEndpoint, EndpointMethod, ExpressTransform } from "../base-design";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { AuthorizedData } from "./authorization.design";
import { UserTrainingSchedule } from "../../entity/UserTrainingSchedule.entity";
import { Quiz } from "../../entity/Quiz.entity";
import { UserOnlineCheck } from "../../entity/UserOnlineCheck.entity";
import { UserOfflineCheck } from "../../entity/UserOfflineCheck.entity";
import { UserAssignment } from "../../entity/UserAssignment.entity";
import { Certificate } from "../../entity/Certificate.entity";

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
  export enum Filter {
    ALL = 'ALL',
    ON_PROGRESS = 'ON_PROGRESS',
    DONE = 'DONE'
  }

  export class Query {
    @Transform(ExpressTransform.integer)
    @IsOptional()
    @IsNumber({}, { message: 'Limit must be a number' })
    limit?: number;

    @Transform(ExpressTransform.integer)
    @IsOptional()
    @IsNumber({}, { message: 'Offset must be a number' })
    offset?: number;

    @IsOptional()
    @IsEnum(Filter, { message: 'Filter must be an enum' })
    filter?: Filter;
  }

  export class Header extends AuthorizedData {}

  export interface Output {
    total: number
    data: UserTrainingSchedule[]
  }

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

  export interface Output {
    percentage: number
    list_completed_session_material_id: number[]
  }

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/my-training/progress';
  }
}

export namespace GetMyTrainingQuizData {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training id cannot be empty' })
    @IsNumber({}, { message: 'Training id must be a number' })
    id!: number;

    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Material Quiz id cannot be empty' })
    @IsNumber({}, { message: 'Material Quiz id must be a number' })
    material_quiz_id!: number;
  }

  export class Header extends AuthorizedData {}

  export type Output = Quiz;

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/my-training/quiz-data';
  }
}

export namespace GetMyTrainingQuizResult {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training id cannot be empty' })
    @IsNumber({}, { message: 'Training id must be a number' })
    id!: number;

    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Material Quiz id cannot be empty' })
    @IsNumber({}, { message: 'Material Quiz id must be a number' })
    material_quiz_id!: number;
  }

  export class Header extends AuthorizedData {}

  export type Output = number;

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/my-training/quiz-result';
  }
}

export namespace GetMyTrainingOnlineClassData {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training id cannot be empty' })
    @IsNumber({}, { message: 'Training id must be a number' })
    id!: number;

    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Material Online Class id cannot be empty' })
    @IsNumber({}, { message: 'Material Online Class id must be a number' })
    material_online_class_id!: number;
  }

  export class Header extends AuthorizedData {}

  export type Output = UserOnlineCheck[];

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/my-training/online-class-data';
  }
}

export namespace GetMyTrainingOfflineClassData {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training id cannot be empty' })
    @IsNumber({}, { message: 'Training id must be a number' })
    id!: number;

    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Material Offline Class id cannot be empty' })
    @IsNumber({}, { message: 'Material Offline Class id must be a number' })
    material_onffine_class_id!: number;
  }

  export class Header extends AuthorizedData {}

  export type Output = UserOfflineCheck[];

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/my-training/offline-class-data';
  }
}

export namespace GetMyTrainingAssignmentData {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training id cannot be empty' })
    @IsNumber({}, { message: 'Training id must be a number' })
    id!: number;

    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Material Assignment id cannot be empty' })
    @IsNumber({}, { message: 'Material Assignment id must be a number' })
    material_assignment_id!: number;
  }

  export class Header extends AuthorizedData {}

  export type Output = UserAssignment | null;

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/my-training/assignment-data';
  }
}

export namespace GetMyCertificateDetailByTraining {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Training id cannot be empty' })
    @IsNumber({}, { message: 'Training id must be a number' })
    training_id!: number;
  }

  export class Header extends AuthorizedData {}

  export type Output = Certificate;

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/my-certificate/detail/by-training';
  }
}

export namespace GetMyCertificate {
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
    data: Certificate[]
  }

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/my-certificate';
  }
}

export namespace GetMyCertificateDetail {
  export class Query {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Certificate id cannot be empty' })
    @IsNumber({}, { message: 'Certificate id must be a number' })
    id!: number;
  }

  export class Header extends AuthorizedData {}

  export type Output = Certificate;

  export abstract class Endpoint extends BaseEndpoint<Query, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/my-certificate/detail';
  }
}
