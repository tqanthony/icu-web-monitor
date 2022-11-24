export class Util {
    static hex_2_rgb(hex_val) {
        if (hex_val.length != 6) {
            throw 'Only six-digit hex colors are allowed.';
        }
        var aRgbHex = hex_val.match(/.{1,2}/g);
        var aRgb = [
            parseInt(aRgbHex[0], 16),
            parseInt(aRgbHex[1], 16),
            parseInt(aRgbHex[2], 16)
        ];
        return aRgb;
    }
}