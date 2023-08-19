import { BaseEndpoint, EndpointMethod, ExpressTransform } from "../base-design";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { Transform } from "class-transformer";
import { UserOfflineCheckType } from "../../entity/UserOfflineCheckType.enum";
import { AuthorizedData } from "./authorization.design";

export namespace CheckInOutMaterialOfflineClass {
  export class Body {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Material Offline Class id cannot be empty' })
    @IsNumber({}, { message: 'Material Offline Class id must be a number' })
    material_offline_class_id!: number;

    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'User Training id cannot be empty' })
    @IsNumber({}, { message: 'User Training id must be a number' })
    user_training_id!: number;

    @IsNotEmpty({ message: 'Material Offline Class check type cannot be empty' })
    @IsEnum(UserOfflineCheckType, { message: 'Material Offline Class check type must be a number' })
    type!: UserOfflineCheckType;
  }

  export class Header extends AuthorizedData {}

  export type Output = boolean;

  export abstract class Endpoint extends BaseEndpoint<any, Body, Header, Output> {
    public static method: EndpointMethod = 'post';
    public static url: string = '/checkin/offline';
  }
}
