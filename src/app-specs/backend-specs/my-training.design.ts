import { Transform } from "class-transformer";
import { BaseEndpoint, EndpointMethod, ExpressTransform } from "../base-design";
import { IsNotEmpty, IsNumber } from "class-validator";
import { AuthorizedData } from "./authorization.design";
import { UserTrainingSchedule } from "../../entity/UserTrainingSchedule.entity";

export namespace GetTrainingDetail {
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
