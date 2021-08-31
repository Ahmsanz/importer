import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { Model } from 'mongoose';
import { CreateRowDto } from '../dto/data.dto';
import { Row, RowDocument } from '../schemas/data.schema';
@Injectable()
export class DataService {
    constructor(
        @InjectModel('row') private readonly rowModel: Model<RowDocument>,
    ) {}

    public async handleFile(): Promise<void> {
        try {
            const files = fs.readdirSync('./files');
            fs.createReadStream(`./files/${files[0]}`)
            .pipe(csv())
            .on('data', async (data) => {
                const series = {};
                for ( const keys in data) {
                    if (!isNaN(parseInt(keys))) series[keys] = data[keys];
                }
                this.saveRow({
                    country: data.Country,
                    sector: data.Sector,
                    parentSector: data['Parent sector'],
                    series
                });
            })
            .on('end', () => console.log('parsing ended'))
            .on('finish', () => {
                fs.rmdirSync('./files', { recursive: true });
                console.log(`temporary file has been deleted!`);
            }) 
            
            return;
        } catch (err) {
            throw err;
        }        
    }

    private async saveRow(rowDto: CreateRowDto): Promise<Row> {
        try {
            const row = await this.rowModel.create(rowDto);
        
            return row.save();
        } catch (err) {
            throw err;
        }        
    } 
}
