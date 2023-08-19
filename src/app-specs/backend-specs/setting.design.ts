import { BaseEndpoint, EndpointMethod } from "../base-design";
import { Setting } from "../../entity/Setting.entity";
import { IsNotEmpty, IsString } from "class-validator";
import { AuthorizedData } from "./authorization.design";

export namespace SettingData {
  export class Query {}

  export class Header extends AuthorizedData {}

  export type Output = Setting[];

  export abstract class Endpoint extends BaseEndpoint<Query, any, Header, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/setting';
  }
}

export namespace SettingDetail {
  export class Query {
    @IsNotEmpty({ message: 'key cannot be empty' })
    @IsString({ message: 'key must be string' })
    key!: string;
  }

  export class Header extends AuthorizedData {}

  export type Output = string;

  export abstract class Endpoint extends BaseEndpoint<Query, any, Header, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/setting/detail';
  }
}
