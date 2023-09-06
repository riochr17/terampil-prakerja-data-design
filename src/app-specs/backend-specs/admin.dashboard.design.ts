import { BaseEndpoint, EndpointMethod } from "../base-design";
import { Training } from "../../entity/Training.entity";
import { AuthorizedData } from "./authorization.design";

export namespace AdminDashboardUpcomingThisMonth {
  export class Header extends AuthorizedData {}

  export type Output = Training[];

  export abstract class Endpoint extends BaseEndpoint<any, any, any, Output> {
    public static method: EndpointMethod = 'get';
    public static url: string = '/admin/training-upcoming-this-month';
  }
}
