const { expect } = require('chai');
const createOutputFiles = require('../app');
const fs = require('fs');
const path = require('path');

describe('createOutputFiles()', () => {

  it('creates output files as expected', () => {
    // Create a mock input file
    fs.writeFileSync(path.join(__dirname, 'test_input.csv'), 'ID,Area,Name,Quantity,Brand\nID1,Minneapolis,shoes,2,Air\nID2,Chicago,shoes,1,Air\nID3,Central Department Store,shoes,5,BonPied\nID4,Quail Hollow,forks,3,Pfitzcraft');

    // Call the function
    createOutputFiles('test_input.csv');

    // Read the output files
    let output1 = fs.readFileSync(path.join(__dirname, '0_test_input.csv'), 'utf-8');
    let output2 = fs.readFileSync(path.join(__dirname, '1_test_input.csv'), 'utf-8');

    // Assert that the output files are as expected
    expect(output1).to.equal('shoes,2\nforks,0.75\n');
    expect(output2).to.equal('shoes,Air\nforks,Pfitzcraft\n');
  });
});
