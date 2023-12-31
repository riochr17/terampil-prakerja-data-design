import { Transform } from "class-transformer";
import { BaseEndpoint, EndpointMethod, ExpressTransform } from "../base-design";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
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
    @IsString({ message: 'answer must be a string' })
    answer!: string;

    @Transform(ExpressTransform.boolean)
    @IsNotEmpty({ message: 'last question indicator cannot be empty' })
    @IsBoolean({ message: 'last question indicator must be a boolean' })
    last_question!: boolean;
  }

  export class Header extends AuthorizedData {}

  export type Output = boolean;

  export abstract class Endpoint extends BaseEndpoint<any, Body, Header, Output> {
    public static method: EndpointMethod = 'post';
    public static url: string = '/submit-quiz';
  }
}
