/**
 * Created by chenqilong on 2018/9/17.
 */

import RouterConfig from '../config/RouteConfig';

exports.parseLocation = (location) => {
    let path = location.pathname;
    let pathName = path.split('/');
    return pathName;
}

//截取删除0x字符串
function stripHexPrefix(str) {
    return str.startsWith('0x') ? str.slice(2) : str;
}

// Convert byte string to int array.
function bytesToIntArray(byteString) {
    let stripped = stripHexPrefix(byteString);
    return stripped.match(/.{1,64}/g).map(s => parseInt("0x" + s));
}

// Convert byte string to address array
function bytesToAddressArray(byteString) {
    let stripped = stripHexPrefix(byteString);
    return stripped.match(/.{1,40}/g).map(s => "0x" + s);
}

function hexToStr(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) {
        var v = parseInt(hex.substr(i, 2), 16);
        if (v) str += String.fromCharCode(v);
    }
    return str;
}

class StringReader {

    constructor(str) {
        this.str = str;
        this.cursor = 0;
    }

    read(count) {
        let right = this.str.length > (this.cursor + count) ? (this.cursor + count) : this.str.length;
        let res = this.str.substring(this.cursor, right);
        this.cursor = right;
        return res;
    }

    isEnd() {
        return this.cursor == this.str.length;
    }
}

function readOneString(strReader) {
    let metaSize = strReader.read(2);
    let strSize = strReader.read(parseInt("0x" + metaSize) * 2);
    let strBytes = strReader.read(parseInt("0x" + strSize) * 2);
    return hexToStr(strBytes);
}

//byte字符串转string
export function bytesToStringArray(byteString) {
    let stripped = stripHexPrefix(byteString);
    let stringReader = new StringReader(stripped);
    let result = [];

    while (!stringReader.isEnd()) {
        let res = readOneString(stringReader);
        if (res != "" && res != null && res != undefined) {
            result.push(res);
        }
    }

    // console.log(result);
    return result;
}

// export function  Uint8ArrayToString(fileData){
//     var dataString = "";
//     for (var i = 0; i < fileData.length; i++) {
//         dataString += String.fromCharCode(fileData[i]);
//     }
//
//     return dataString
// }
export function Uint8ArrayToString(array) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while (i < len) {
        c = array[i++];
        switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
// 0xxxxxxx
                out += String.fromCharCode(c);
                break;
            case 12:
            case 13:
// 110x xxxx 10xx xxxx
                char2 = array[i++];
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
// 1110 xxxx 10xx xxxx 10xx xxxx
                char2 = array[i++];
                char3 = array[i++];
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
        }
    }

    return out;
}

export function isEmpty(obj) {
    // console.log(obj == null || obj == undefined || obj == "")
    return (obj == null || obj == undefined || obj == "");
}


