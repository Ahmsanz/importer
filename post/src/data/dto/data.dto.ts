import { IsString, IsObject, IsOptional }  from 'class-validator'

export class CreateRowDto {
    @IsString()
    readonly country: string;

    @IsString()
    readonly sector: string;

    @IsString()
    readonly parentSector: string;

    @IsOptional()
    @IsObject()
    readonly series?: object;
  }