import {
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class createBookDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @IsString()
  @MinLength(5)
  @MaxLength(25)
  author: string;

  @IsInt()
  @Min(1500)
  @Max(new Date().getFullYear())
  year: number;
}
