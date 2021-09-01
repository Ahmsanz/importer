import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationInterface } from '../interfaces/pagination.interface';
import { QueryParamsInterface } from '../interfaces/queryParams.interface';
import { RowInterface } from '../interfaces/row.interface';
import { RowDocument } from '../schemas/data.schema';
@Injectable()
export class DataService {
    constructor(
        @InjectModel('row') private readonly rowModel: Model<RowDocument>,
    ) {}

    public async getData(queryParams: QueryParamsInterface, projection?: object, pagination?: PaginationInterface): Promise<RowInterface[]> {
        try {
            const data: RowInterface[] = await this.rowModel
                .find(queryParams, projection)
                .skip(pagination.skip)
                .limit(pagination.limit)
                .exec()
            
            return data;
        } catch (err) {
            console.log(err)
            throw new Error('Something went wrong retrieving the data.')
        }
        
    }

    public getProjectionSeries(ini: number, end: number): object {
        const projection = {};

        for (let i = ini; i < (end + 1); i++) {
            projection[i.toString()] = 1;
        }
        
        return projection;
    }
}
