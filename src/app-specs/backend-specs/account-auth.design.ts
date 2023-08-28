import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { User } from "../../entity/User.entity";
import { BaseEndpoint, EndpointMethod } from "../base-design";
import { UserGender } from "../../entity/UserGender.enum";

export namespace Register {
  export class Body {
    @IsOptional()
    @IsString({ message: 'email must be string' })
    email?: string;
  
    @IsOptional()
    @IsString({ message: 'phone_number must be string' })
    phone_number?: string;
  
    @IsNotEmpty({ message: 'password cannot be empty' })
    @IsString({ message: 'password must be string' })
    password!: string;

    @IsNotEmpty({ message: 'fullname cannot be empty' })
    @IsString({ message: 'fullname must be string' })
    fullname!: string;
  
    @IsNotEmpty({ message: 'gender cannot be empty' })
    @IsEnum(UserGender, { message: 'gender must be either MALE or FEMALE' })
    gender!: UserGender;
  }

  export interface Output {
    token: string
    user: User
  }

  export abstract class Endpoint extends BaseEndpoint<any, Body, any, Output> {
    public static method: EndpointMethod = 'post';
    public static url: string = '/register';
  }
}

export namespace Login {
  export class Body {
    @IsOptional()
    @IsString({ message: 'email must be string' })
    email?: string;
  
    @IsOptional()
    @IsString({ message: 'phone_number must be string' })
    phone_number?: string;
  
    @IsNotEmpty({ message: 'password cannot be empty' })
    @IsString({ message: 'password must be string' })
    password!: string;
  }

  export interface Output {
    token: string
    user: User
  }

  export abstract class Endpoint extends BaseEndpoint<any, Body, any, Output> {
    public static method: EndpointMethod = 'post';
    public static url: string = '/login';
  }
}
