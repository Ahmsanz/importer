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
    
    /**
     * This public method retrieves the information from the database with the restrictions expressed by the query parameters
     * 
     * @param queryParams object with the query parameters passed from the front request
     * @param projection object with the projection that will be passed to MongoDB
     * @param pagination object with the skip and limit parameters that will be passed to MongoDB to paginate the result
     * @returns 
     */
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

    /**
     * This method will build the projection object for the Mongo query
     * 
     * @param ini wished start year for the series object
     * @param end wished end year for the series object
     * @returns 
     */
    public getProjectionSeries(ini: number, end: number): object {
        const projection = {};

        for (let i = ini; i < (end + 1); i++) {
            projection[i.toString()] = 1;
        }
        
        return projection;
    }
}
