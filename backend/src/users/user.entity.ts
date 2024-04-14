import { Matches, IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class User {
  @IsNotEmpty({ message: 'Enter Name' })
  @IsString({
    message: 'Enter Name',
  })
  username: string;
  @IsEmail(
    {},
    {
      message: 'Enter valid email',
    }
  )
  email: string;
  @Matches(
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[A-Za-z0-9!@#$%^&*()]{8,}$/,
    {
      message:
        'Password must contain at least 1 letter, 1 number, and 1 special character, with a minimum length of 8 characters',
    }
  )
  password: string;
}
