import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { RowInterface } from "../interfaces/row.interface";

export interface Series {
    [key: string]: number;
}

export type RowDocument = Row & Document;

@Schema({ timestamps: true })
export class Row implements RowInterface {
    @Prop()
    row?: number;
    
    @Prop()
    country?: string;

    @Prop()
    sector?: string;

    @Prop()
    parentSector?: string;

    @Prop({type: Object})
    series?: Series;
}

export const DataSchema = SchemaFactory.createForClass(Row);