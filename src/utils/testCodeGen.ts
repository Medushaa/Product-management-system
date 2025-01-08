import { generateProductCode } from './productCode';

const productName = "Alpha Sorter";
const productCode = generateProductCode(productName);

console.log(`Product Name: ${productName}`);
console.log(`Generated Product Code: ${productCode}`); //p48asd4-0alport8

//run it with: npx ts-node testCodeGen.ts
