/* eslint-disable */
/**
 * 加密文件
 * 前后端数据传输加密
 */
const CryptoJS = require('crypto-js');
const NodeRSA = require('node-rsa');

// rsa-key
// eslint-disable-next-line max-len
const RSA_PUBLICK_KEY = '90465235755250781920835159872844406574607408042856534745167215147673176217811607707737121194107775859946618786768589106181391857537473672915083732241934054397396316239359616173231113622379804304766069256161264538096335751109462851413613607256908099902367774982569372495307972374606554853125914779034305269049';

// AES-generateKeyWithIV
export function generateKeyWithIV() {
  const aes = CryptoJS.lib.WordArray.random(16).toString();
  const aes_key = aes.substr(0, 16);
  const aes_iv = aes.substr(16);

  return {
    aes,
    aes_key,
    aes_iv
  }
}

// rsa-encrypt
export function rsaEncrypt(params) {
  const { aes, aes_key, aes_iv } = generateKeyWithIV();

  const aes_key_utf = CryptoJS.enc.Utf8.parse(aes_key);
  const aes_iv_utf = CryptoJS.enc.Utf8.parse(aes_iv);
  const srcs = CryptoJS.enc.Utf8.parse(params);

  // rsa-key加密
  const rsa = new NodeRSA();
  rsa.setOptions({
    encryptionScheme: 'pkcs1'
  });
  rsa.importKey({
    n: RSA_PUBLICK_KEY,
    e: 65537
  });

  const rsa_encrypt = rsa.encrypt(aes, 'base64');

  // aes加密
  const ciphertext = CryptoJS.AES.encrypt(srcs, aes_key_utf, { iv: aes_iv_utf, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  const aes_encrypt = ciphertext.toString();

  return {
    key: rsa_encrypt,
    pwd: aes_encrypt
  }
}