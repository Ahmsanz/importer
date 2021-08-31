export interface RowInterface {
    country?: string;
    sector?: string;
    parentSector?: string;
    series?: {
        [key: string]: number;
    }
    createdAt?: Date;
    updatedAt?: Date;
}