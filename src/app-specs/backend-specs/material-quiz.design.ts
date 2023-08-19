import { Transform } from "class-transformer";
import { BaseEndpoint, EndpointMethod, ExpressTransform } from "../base-design";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { AuthorizedData } from "./authorization.design";

export namespace SubmitQuizAnswer {
  export class Body {
    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'Quiz Question id cannot be empty' })
    @IsNumber({}, { message: 'Quiz Question id must be a number' })
    quiz_question_id!: number;

    @Transform(ExpressTransform.integer)
    @IsNotEmpty({ message: 'User Training id cannot be empty' })
    @IsNumber({}, { message: 'User Training id must be a number' })
    user_training_id!: number;

    @IsNotEmpty({ message: 'answer cannot be empty' })
    @IsString({ message: 'answer must be string' })
    answer!: string;
  }

  export class Header extends AuthorizedData {}

  export type Output = boolean;

  export abstract class Endpoint extends BaseEndpoint<any, Body, Header, Output> {
    public static method: EndpointMethod = 'post';
    public static url: string = '/submit-quiz';
  }
}
