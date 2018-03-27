// import { aesjs } from 'aes-js';
var aesjs = require('aes-js');
var key_128 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var KEY = ['Z', 'N', 'D', '2', '0', '1', '7', '1', '0', '3', '0', 'A', 'P', 'I', 'M', 'M']
// var textBytes = aesjs.utils.utf8.toBytes(text);
// var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
// var encryptedBytes = aesCtr.encrypt(textBytes);
// var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

// var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
// var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
// var decryptedBytes = aesCtr.decrypt(encryptedBytes);
// var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);


function strEnc(text, key) {
    var textBytes = aesjs.utils.utf8.toBytes(text);
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex
}

function strDec(text, key) {
    var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var decryptedBytes = aesCtr.decrypt(encryptedBytes);
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText
}