export interface RowInterface {
    row?: number;
    country?: string;
    sector?: string;
    parentSector?: string;
    series?: {
        [key: string]: number;
    }
    createdAt?: Date;
    updatedAt?: Date;
}