import crypto from 'crypto';

// Structure: <hashed product name>-<start_index><substring><end_index>

export function generateProductCode(productName: string): string {
  const hash = crypto.createHash('sha256').update(productName).digest('hex').slice(0,7);
  
  const nameLower = productName.toLowerCase().replace(/\s+/g, ''); //remove spaces too

  //finding longest strictly increasing substring 
  let longestSubstrings: [number, string, number][] = []; //[startIdx, substring, endIdx]
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
    } else if (length === maxLength) {
      longestSubstrings.push([tempStart, nameLower.substring(tempStart, i), i - 1]);
    }
    tempStart = i;
  }

  //firstStartIdx+concatedSubStr+lastEndIdx
  const substringPart = `${longestSubstrings[0][0]}${longestSubstrings.map(([_, sub]) => sub).join('')}${longestSubstrings[longestSubstrings.length - 1][2]}`;
  
  return `${hash}-${substringPart}`;
}

