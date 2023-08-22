import { IsNotEmpty, IsString } from "class-validator";
import { BaseEndpoint, EndpointMethod } from "../base-design";
import { Admin } from "../../entity/Admin.entity";

export namespace AdminLogin {
  export class Body {
    @IsNotEmpty({ message: 'email cannot be empty' })
    @IsString({ message: 'email must be string' })
    email?: string;
  
    @IsNotEmpty({ message: 'password cannot be empty' })
    @IsString({ message: 'password must be string' })
    password!: string;
  }

  export interface Output {
    token: string
    admin: Admin
  }

  export abstract class Endpoint extends BaseEndpoint<any, Body, any, Output> {
    public static method: EndpointMethod = 'post';
    public static url: string = '/admin/login';
  }
}
