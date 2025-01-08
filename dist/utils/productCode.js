"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProductCode = generateProductCode;
const crypto_1 = __importDefault(require("crypto"));
// Structure: <hashed product name>-<start_index><substring><end_index>
function generateProductCode(productName) {
    const hash = crypto_1.default.createHash('sha256').update(productName).digest('hex');
    const nameLower = productName.toLowerCase();
    //finding longest strictly increasing substring 
    let longestSubstrings = []; //[startIdx, substring, endIdx+1]
    let maxLength = 0;
    let tempStart = 0;
    for (let i = 1; i <= nameLower.length; i++) {
        if (i < nameLower.length && nameLower[i] > nameLower[i - 1]) {
            continue;
        }
        const length = i - tempStart;
        if (length > maxLength) {
            maxLength = length;
            longestSubstrings = [[tempStart, nameLower.substring(tempStart, i), i - 1]];
        }
        else if (length === maxLength) {
            longestSubstrings.push([tempStart, nameLower.substring(tempStart, i), i - 1]);
        }
        tempStart = i;
    }
    //concatenate substrings. firstStartIdx-allJoinedSubStrs-lastEndIdx
    const substringPart = `${longestSubstrings[0][0]}${longestSubstrings.map(([_, sub]) => sub).join('')}${longestSubstrings[longestSubstrings.length - 1][2] - 1}`;
    return `${hash}-${substringPart}`;
}
