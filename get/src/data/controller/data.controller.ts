import { Controller, Get, Query } from '@nestjs/common';
import { PaginationInterface } from '../interfaces/pagination.interface';
import { QueryParamsInterface } from '../interfaces/queryParams.interface';
import { RowInterface } from '../interfaces/row.interface';
import { DataService } from '../service/data.service';

@Controller('data')
export class DataController {
    constructor(
        private dataService: DataService
    ) {}
    
    @Get()    
    async getData(
        //list of accepted query parameters
        @Query('country') country?: string,
        @Query('sector') sector?: string,
        @Query('limit') limit?: string,
        @Query('page') page?: string, 
        @Query('year') year?: string,
        @Query('from') from?: string, 
        @Query('to') to?: string,    
    ): Promise<RowInterface[]> {
        // query params will be pased as first argument to Mongoose model.find()
        let queryParams: QueryParamsInterface = {}
        // date query params will be used to narrow the years series, passed as projection to Mongoose
        let projection = null;
        let ini = from ? parseInt(from) : 1850;
        let end = to ? parseInt(to) : 2014;
        
        if (country) queryParams.country = new RegExp(country, 'i'); //regex allows to query by proximity
        if (sector) queryParams.sector = new RegExp(sector, 'i');
        if (year) {
            projection = {
            country: 1,
            sector: 1, 
            parentSector: 1, 
            series: {
                [year]: 1
                }
            }
        }
        // if 'from' or 'to' parameters are provided, a projection object will be built to narrow the years span provided by the 'series' object
        if (from || to) {
            projection = {
                country: 1, 
                sector: 1,
                parentSector: 1, 
                series: this.dataService.getProjectionSeries(ini, end),
            }
        }
        
        let pagination: PaginationInterface = {}
        if (limit) pagination.limit = parseInt(limit);
        if (parseInt(page) > 0) pagination.skip = (parseInt(page) - 1) * parseInt(limit);

        const data = await this.dataService.getData(queryParams, projection, pagination);

        return data;
    }
}
