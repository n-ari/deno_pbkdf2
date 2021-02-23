const MAX_ALLOC = Math.pow(2, 30) - 1;

import { HashData, NormalizedAlgorithms } from "./types.ts";
import { Hmac } from "./hmac.ts";
import { sizes } from "./sizes.ts";
export type { NormalizedAlgorithms };

function toBuffer(bufferable: HashData): Uint8Array {
  if (bufferable instanceof Uint8Array) {
    return bufferable as Uint8Array;
  } else if (typeof bufferable === "string") {
    return new TextEncoder().encode(bufferable);
  } else {
    return new Uint8Array(bufferable.buffer);
  }
}

function writeUInt32BE(buffer: Uint8Array, value: number, offset: number) {
  buffer[offset] = (value >> 24) & 255;
  buffer[offset + 1] = (value >> 16) & 255;
  buffer[offset + 2] = (value >> 8) & 255;
  buffer[offset + 3] = (value) & 255;
}

export function pbkdf2Sync(
  password: HashData,
  salt: HashData,
  iterations: number,
  keylen: number,
  digest: NormalizedAlgorithms = "sha1",
): Uint8Array {
  if (typeof iterations !== "number" || iterations < 0) {
    throw new TypeError("Bad iterations");
  }
  if (typeof keylen !== "number" || keylen < 0 || keylen > MAX_ALLOC) {
    throw new TypeError("Bad key length");
  }

  const bufferedPassword = toBuffer(password);
  const bufferedSalt = toBuffer(salt);

  const hmac = new Hmac(digest, bufferedPassword, bufferedSalt.length);

  const DK = new Uint8Array(keylen);
  const block1 = new Uint8Array(bufferedSalt.length + 4);
  block1.set(bufferedSalt, 0);

  let destPos = 0;
  const hLen = sizes[digest];
  const l = Math.ceil(keylen / hLen);

  for (let i = 1; i <= l; i++) {
    writeUInt32BE(block1, i, bufferedSalt.length);
    const T = hmac.run(block1, hmac.ipad1);
    let U = T;
    for (let j = 1; j < iterations; j++) {
      U = hmac.run(U, hmac.ipad2);
      for (let k = 0; k < hLen; k++) {
        T[k] ^= U[k];
      }
    }
    DK.set(T.subarray(0, Math.min(T.length, DK.length - destPos)), destPos);
    destPos += hLen;
  }

  return DK;
}

export function pbkdf2(
  password: HashData,
  salt: HashData,
  iterations: number,
  keylen: number,
  digest: NormalizedAlgorithms = "sha1",
): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const res = pbkdf2Sync(password, salt, iterations, keylen, digest);
        resolve(res);
      } catch (e) {
        reject(e);
      }
    }, 0);
  });
}
