import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'Email пользователя' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Пароль (минимум 6 символов)' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'Имя пользователя', required: false })
  @IsOptional()
  @IsString()
  name?: string;
}
