/**
* 工具类
*/
// import Vue from 'vue'
import CryptoJS from 'crypto-js'
// 默认的 KEY 与 IV
const KEY = CryptoJS.enc.Utf8.parse("dufy20170329java");
const IV = CryptoJS.enc.Utf8.parse("dufy20170329java");

export default {//加密
    encrypt(word, keyStr, ivStr) {
        let key = KEY
        let iv = IV

        if (keyStr && ivStr) {
            console.log('----自定义---key,iv')
            key = CryptoJS.enc.Utf8.parse(keyStr);
            iv = CryptoJS.enc.Utf8.parse(ivStr);
        }
        let srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });
        return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
    },

    //解密
    decrypt(word, keyStr, ivStr) {
        let key = KEY
        let iv = IV

        if (keyStr && ivStr) {
            key = CryptoJS.enc.Utf8.parse(keyStr);
            iv = CryptoJS.enc.Utf8.parse(ivStr);
        }
        let base64 = CryptoJS.enc.Base64.parse(word);
        let src = CryptoJS.enc.Base64.stringify(base64);
        var decrypt = CryptoJS.AES.decrypt(src, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        })
        var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    }
}