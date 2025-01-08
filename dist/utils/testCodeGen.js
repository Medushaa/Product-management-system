"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productCode_1 = require("./productCode");
//Testing on a example string
const productName = "Alpha Sorter";
const productCode = (0, productCode_1.generateProductCode)(productName);
console.log(`Product Name: ${productName}`);
console.log(`Generated Product Code: ${productCode}`); //p48asd4-0alport8
//run it with: npx ts-node testCodeGen.ts
