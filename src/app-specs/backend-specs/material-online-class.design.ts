import { BaseEndpoint, EndpointMethod, ExpressTransform } from "../base-design";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { Transform } from "class-transformer";
import { UserOnlineCheckType } from "../../entity/UserOnlineCheckType.enum";
import { AuthorizedData } from "./authorization.design";

export namespace CheckInOutMaterialOnlineClass {
  export class Body {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Material Online Class id cannot be empty' })
    @IsNumber({}, { message: 'Material Online Class id must be a number' })
    material_online_class_id!: number;

    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'User Training id cannot be empty' })
    @IsNumber({}, { message: 'User Training id must be a number' })
    user_training_id!: number;

    @IsNotEmpty({ message: 'Material Online Class check type cannot be empty' })
    @IsEnum(UserOnlineCheckType, { message: 'Material Online Class check type must be a number' })
    type!: UserOnlineCheckType;
  }

  export class Header extends AuthorizedData {}

  export type Output = boolean;

  export abstract class Endpoint extends BaseEndpoint<any, Body, Header, Output> {
    public static method: EndpointMethod = 'post';
    public static url: string = '/checkin/online';
  }
}
