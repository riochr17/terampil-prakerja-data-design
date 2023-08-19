import { IsNotEmpty, IsString } from "class-validator";
import { User } from "../../entity/User.entity";

export class AuthorizedData {
  @IsNotEmpty({ message: 'Authorization header cannot be empty' })
  @IsString({ message: 'Authorization header must be a string' })
  authorization!: string;
}
