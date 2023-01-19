
require('dotenv').config();
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

const filePath = process.env.NODE_ENV === 'test' ? `${__dirname}/test/` : `${__dirname}`

let inputFileName = process.argv[2] || process.env.INPUT_FILE;

let outputFile1 = "0_" + inputFileName;
let outputFile2 = "1_" + inputFileName;

createOutputFiles(inputFileName);

function createOutputFiles(inputFileName) {
    console.log("=== STARTED ===");
    let avgQuantity = {};
    let mostPopularBrand = {};
    let totalOrders = 0
    let fullFilePath = path.join(filePath, inputFileName)
    fs.createReadStream(fullFilePath)
        .pipe(csv())
        .on("data", (row) => {
            let product = row.Name;
            let quantity = parseFloat(row.Quantity);
            let brand = row.Brand;

            if (!avgQuantity[product]) {
                avgQuantity[product] = {
                    total: quantity
                };
                mostPopularBrand[product] = {};
            } else {
                avgQuantity[product]["total"] += quantity;
            }

            mostPopularBrand[product][brand] = mostPopularBrand[product][brand] + 1 || 1

            totalOrders++
        })
        .on("end", () => {
            /*
            avgQuantity map:
            =============
            { shoes: { total: 8 }, forks: { total: 3 } }
            =============

            mostPopularBrand map:
            *******************
            { shoes: { Air: 2, BonPied: 1 }, forks: { Pfitzcraft: 1 } }
            *******************
             */
            let output1 = "";
            let output2 = "";
            for (let product in avgQuantity) {
                // calculate average
                let avg = avgQuantity[product]["total"] / totalOrders;
                output1 += product + "," + avg + "\n";

                // calculate most popular brand 
                let maxBrand = "";
                let maxCount = -1;
                for (let brand in mostPopularBrand[product]) {
                    if (mostPopularBrand[product][brand] > maxCount) {
                        maxCount = mostPopularBrand[product][brand];
                        maxBrand = brand;
                    }
                }
                output2 += product + "," + maxBrand + "\n";
            }
            fs.writeFileSync(path.join(filePath, outputFile1), output1);
            fs.writeFileSync(path.join(filePath, outputFile2), output2);
        });

        console.log("=== FINISHED ===");
}

module.exports = createOutputFiles