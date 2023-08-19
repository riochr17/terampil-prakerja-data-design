import { BaseEndpoint, EndpointMethod, ExpressTransform } from "../base-design";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { AuthorizedData } from "./authorization.design";

export namespace UploadAssignment {
  export class Body {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Material Assignment id cannot be empty' })
    @IsNumber({}, { message: 'Material Assignment id must be a number' })
    material_assignment_id!: number;

    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'User Training id cannot be empty' })
    @IsNumber({}, { message: 'User Training id must be a number' })
    user_training_id!: number;

    @IsNotEmpty({ message: 'Assignment data cannot be empty' })
    @IsString({ message: 'Assignment data must be a string' })
    data!: string;
  }

  export class Header extends AuthorizedData {}

  export type Output = boolean;

  export abstract class Endpoint extends BaseEndpoint<any, Header, Body, Output> {
    public static method: EndpointMethod = 'post';
    public static url: string = '/assignment/submit';
  }
}
