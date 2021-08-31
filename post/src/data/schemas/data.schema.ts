import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export interface Series {
    [key: string]: number;
}

export type RowDocument = Row & Document;

@Schema()
export class Row {
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