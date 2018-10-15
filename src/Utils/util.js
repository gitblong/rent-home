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
        console.log(this.cursor);
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

    console.log(result);
    return result;
}

