import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class createBookDTO {
  @ApiProperty({ example: 'The Great Gatsby' })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @ApiProperty({ example: 'F. Scott Fitzgerald' })
  @IsString()
  @MinLength(5)
  @MaxLength(25)
  author: string;

  @ApiProperty({ example: 1925 })
  @IsInt()
  @Min(1500)
  @Max(new Date().getFullYear())
  year: number;
}
