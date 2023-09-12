import fs from 'node:fs';
import csvtojson from 'csvtojson';

import { pipeline } from 'node:stream'

const csvFilePath = './csvdirectory/csvfile.csv';
const txtFilePath = './csvdirectory/output.txt';

const csvToJsonStream = csvtojson({ headers: ['book', 'author', 'amount', 'price'], ignoreColumns: /Amount/ig });

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(txtFilePath);

pipeline(
    readStream,
    csvToJsonStream,
    writeStream,
    (err) => {
        if (err) {
            console.log(`Pipeline failed: ${err}`)
        }
    }
)

readStream.on('error', (err) => {
    console.error('Error while reading the CSV file:', err);
});

writeStream.on('error', (err) => {
    console.error('Error while writing to the TXT file:', err);
});

writeStream.on('finish', () => {
    console.log('Data has been written to the TXT file successfully.');
});

console.log('Program started.');