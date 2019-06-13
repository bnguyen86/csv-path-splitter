# csv-path-splitter

To use:
1. Clone this repo
2. Run `npm install`
3. Run `node index.js --input INPUT_FILE_PATH --output OUTPUT_FILEPATH --inputNameCol NAME --outputPathCol PATH`
    All parameters are required.
    `--input` Path to the input csv file
    `--output` Path to the output csv file
    `--inputNameCol` Name of the heading for the column that has the string that you want to split
    `--outputPathCol` Name of the heading for the column that you want to put the path in.

    e.g. `node index.js --input input.csv --output out.csv --inputNameCol Name --outputPathCol Path`