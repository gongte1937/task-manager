import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Complete project documentation' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  title: string;

  @ApiProperty({
    example: 'Write comprehensive documentation for the API',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}
