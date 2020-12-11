import { key } from "./../constants/cipher";
let crypto = require('crypto');

export function encrypt(text) {
    let cipher = crypto.createCipher('aes192', key);
    let hex = cipher.update(text, 'utf8', 'hex');
    hex += cipher.final('hex');
    
    return hex;
}