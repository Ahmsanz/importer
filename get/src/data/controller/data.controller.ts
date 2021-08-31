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
        @Query('country') country?: string,
        @Query('sector') sector?: string,
        @Query('limit') limit?: string,
        @Query('page') page?: string,        
    ): Promise<RowInterface[]> {
        let queryParams: QueryParamsInterface = {}
        if (country) queryParams.country = country;
        if (sector) queryParams.sector = sector;

        let pagination: PaginationInterface = {}
        if (limit) pagination.limit = parseInt(limit);
        if (parseInt(page) > 0) pagination.skip = (parseInt(page) - 1) * parseInt(limit);

        const data = await this.dataService.getData(queryParams, pagination);

        return data;
    }
}
