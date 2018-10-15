pragma solidity ^0.4.23;
contract StringArrayStorage {

    uint8 constant max8 = 2**8 - 1;
    uint16 constant max16 = 2**16 - 1;
    uint32 constant max32 = 2**32 - 1;
    uint64 constant max64 = 2**64 - 1;
    uint128 constant max128 = 2**128 - 1;
    uint256 constant  max256 = 2**256 - 1;
    string public s = "QmdEJwJG1T9rzHvBD8i69HHuJaRgXRKEQCP7Bh1BVttZbU";
    string[] public  arr;

    constructor() public {
        arr.push("QmdEJwJG1T9rzHvBD8i69HHuJaRgXRKEQCP7Bh1BVttZbU");
        arr.push("QmdEJwJG1T9rzHvBD8i69HHuJaRgXRKEQCP7Bh1BVttZbU");
        arr.push("QmdEJwJG1T9rzHvBD8i69HHuJaRgXRKEQCP7Bh1BVttZbU");
        arr.push("QmdEJwJG1T9rzHvBD8i69HHuJaRgXRKEQCP7Bh1BVttZbU");

    }

    function getArrLength() view public
    returns (uint256)
    {
        return arr.length;
    }

    function setStrArr(string _value) public
    {
        arr.push(_value);
    }


    // Convenient function for out of evm world.
    function getAsBytes(uint256 _from, uint256 _to)
    public
    constant
    returns (bytes)
    {
        require(_from >= 0 && _to >= _from && arr.length >= _to);


        uint256 bytesSize = 0;
        bytes memory elem;
        uint8 len;
        // calculate required length of bytes.
        for (uint256 a = _from; a < _to + 1; a++) {
            elem = bytes(arr[a]);
            len = lengthBytes(elem.length);
            require(len != 255);
            bytesSize += 1 + len + elem.length;
        }

        uint256 counter = 0;
        bytes memory b = new bytes(bytesSize);
        for (uint256 x = _from; x < _to + 1; x++) {
            elem = bytes(arr[x]);
            len = lengthBytes(elem.length);

            // length of next integer specifying string content size.
            b[counter] = byte(len);
            counter++;

            // bytes of integer to specify string bytes size
            // string content it self.
            for (uint y = 0; y < len; y++) {
                b[counter] = byte(uint8(elem.length / (2 ** (8 * (len - 1 - y)))));
                counter++;
            }

            // string content it self.
            for (uint z = 0; z < elem.length ; z++) {
                b[counter] = elem[z];
                counter++;
            }
        }
        return b;
    }

    function lengthBytes(uint256 length) pure
    internal
    returns
    (uint8)
    {
        // can't handle too long string in this way.
        require(length <= max256);

        // 8bit
        if (length >=0 && length <= max8) {
            return 1;
        }

        // 16bit
        if (length > max8 && length <= max16) {
            return 2;
        }

        //32 bit
        if (length >= max16 && length < max32) {
            return 4;
        }

        //64bit
        if (length >= max32 && length < max64) {
            return 8;
        }

        //128bit
        if (length >= max64 && length < max128) {
            return 16;
        }

        //256 bit
        return 32;
    }
}