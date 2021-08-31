import { Series } from "../schemas/data.schema";

export class CreateRowDto {
    readonly country: string;
    readonly sector: string;
    readonly parentSector: string;
    readonly series?: object;
  }