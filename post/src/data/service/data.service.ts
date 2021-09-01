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
    
    /**
     * This is the method that will handle the reading of the file provided and will save its content to the database.
     * It uses the **fs** node module to read the file that has been saved in a temp folder by the controller; reads the content, uses the **csv-parser** library to parse the csv file and saves every row into the databse.
     * If something goes wrong in the process, the method will throw an error in the catch statement, which will be returned.
     * 
     * @returns void, which will lead in the controller either to a string confirming that the data has been saved to the database, or an error
     */
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

    /**
     * This private method saves every specific row data into the database
     * 
     * @param rowDto the dto build from the table row data
     * @returns a saved Row object
     */
    private async saveRow(rowDto: CreateRowDto): Promise<Row> {
        try {
            const row = await this.rowModel.create(rowDto);
        
            return row.save();
        } catch (err) {
            throw err;
        }        
    } 
}
