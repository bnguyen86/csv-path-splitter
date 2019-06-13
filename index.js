//https://stackabuse.com/reading-and-writing-csv-files-with-node-js/
//https://flaviocopes.com/node-cli-args/
//node index.js --input '/Users/bnguyen/Workspace/marykay-projectone/dev-utils/core-services/data/Categories to load-06112019.csv' --output out.csv --inputNameCol Name --outputPathCol Path
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

const args = require('minimist')(process.argv.slice(2));

const inputPath = args['input'];
const outputPath = args['output'];
const inputNameCol = args['inputNameCol'];
const outputPathCol = args['outputPathCol'];

if (!inputPath || !outputPath || !inputNameCol || !outputPathCol) {
    throw Error('Make sure you have provided the --input, --output, and --inputNameCol, --outputPathCol parameters');
}

const newData = [];
const headers = [];

fs.createReadStream(inputPath)
    .pipe(csv())
    .on('data', (row) => {

        const name = row[inputNameCol];

        const regex = /[^\\.]+$/g;
        const parsedName = name.match(regex);

        const lastIndex = name.lastIndexOf(parsedName);
        const path = name.substring(0, lastIndex);

        // console.log(`parsedName: ${parsedName}`);
        // console.log(`path: ${path}`);

        row[inputNameCol] = parsedName;
        row[outputPathCol] = path;

        newData.push(row);

        if (headers.length === 0) {
            for (const key in row) {
                headers.push({ id: key, title: key });
            }
        }
    })
    .on('end', () => {
        const csvWriter = createCsvWriter({
            path: outputPath,
            header: headers
        });
        // console.log('CSV file successfully processed');

        return csvWriter.writeRecords(newData).then(()=> console.log('The CSV file was written successfully'));
    });