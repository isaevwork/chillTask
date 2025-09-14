import { IsString, IsOptional, IsDateString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTimeEntryDto {
  @ApiProperty({ description: 'Описание задачи' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Время начала', example: '2024-01-01T09:00:00Z' })
  @IsDateString()
  startTime: string;

  @ApiProperty({ description: 'Время окончания', example: '2024-01-01T17:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  endTime?: string;

  @ApiProperty({ description: 'Категория', required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ description: 'Теги', type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
