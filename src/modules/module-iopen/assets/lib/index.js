const forge = require('node-forge');

function purePEM(pem) {
  return pem
    .replace('-----BEGIN CERTIFICATE REQUEST-----', '')
    .replace('-----END CERTIFICATE REQUEST-----', '')
    .replace(/\r\n/g, '');
}

/**
 * 格式化主题字符串为一个对象
 */
function formatSubject(subjectStr) {
  if(typeof subjectStr !== "string") return [];
  const subjectArr = subjectStr.trim().split(',');
  const subject = [];
  subjectArr.forEach((item) => {
    if (item.indexOf('=') !== -1) {
      const itemArr = item.split('=');
      subject.push({
        shortName: itemArr[0],
        value: itemArr[1],
        valueTagClass: forge.asn1.Type.UTF8,
      });
    }
  });
  return subject;
}

function createPKCS1(keys, hash) {
  hash = forge.util.decode64(hash);
  const md = forge.md.sha256.create();
  md.update(hash);
  const signature = keys.privateKey.sign(md);
  return forge.util.encode64(signature);
}

function createPKCS10(keys, subject, keepRaw) {
  const csr = forge.pki.createCertificationRequest();
  csr.publicKey = keys.publicKey;
  csr.setSubject(subject);
  csr.sign(keys.privateKey, forge.md.sha256.create());
  const pem = forge.pki.certificationRequestToPem(csr);
  return keepRaw ? pem : purePEM(pem);
}

function createKeypair(bits, workers) {
  return new Promise((resolve, reject) => {
    try {
      // forge.pki.rsa.generateKeyPair({
      //   bits,
      //   workers,
      // }, (err, keypair) => {
      //   if (err) {
      //     reject(new Error('keypair 生成失败'));
      //   }
      //   resolve(keypair);
      // });
      const keypair = forge.pki.rsa.generateKeyPair({
        bits,
        workers,
      });
      resolve(keypair);
    } catch (e) {
      reject(new Error('keypair 生成异常'));
    }
  });
}

module.exports = {
  createKeypair,
  formatSubject,
  createPKCS1,
  createPKCS10,
};
