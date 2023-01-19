# Blackstone_eIT_Exercise_2
This repository contains a solution for the Blackstone eIT exercise 2. The solution reads a CSV file, processes the data, and creates two output files.

### Prerequisites
- Node.js - JavaScript runtime
- npm - Package manager for JavaScript

### Installing
Clone the repository to your local machine
- Run: **git clone https://github.com/TonyNabil/Blackstone_eIT_Exercise_2.git**
- Navigate to the project directory
- Run: **npm install**

### Running the tests
To run the tests, use the following command:
- run: **npm test**
This will create two output files in the /test directory: 0_test_input.csv and 1_test_input.csv

### Usage
To use the solution, run the following command and pass the input file name as an argument
- run: **npm start input.csv** (you can create any other csv file and pass it as an argument, if you don't specify csv file name it will use input.csv by default).

This will create two output files in the same directory as the input file: 0_input.csv and 1_input.csv

### Built With
- Node.js - JavaScript runtime
- npm - Package manager for JavaScript
- csv-parser - A Node.js CSV parsing package
