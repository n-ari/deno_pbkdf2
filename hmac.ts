import type { NormalizedAlgorithms } from "./types.ts";
import { sizes } from "./sizes.ts";
import { createHash } from "./deps.ts";

export class Hmac {
  hashFunc: (value: Uint8Array) => Uint8Array;
  ipad1: Uint8Array;
  ipad2: Uint8Array;
  opad: Uint8Array;
  blocksize: number;

  constructor(alg: NormalizedAlgorithms, key: Uint8Array, saltlen: number) {
    this.hashFunc = (value: Uint8Array) =>
      new Uint8Array(createHash(alg).update(value).digest());
    this.blocksize = (alg === "sha512" || alg == "sha384") ? 128 : 64;

    if (key.length > this.blocksize) {
      // hash
      key = this.hashFunc(key);
    } else if (key.length < this.blocksize) {
      // fill by zeros
      const extendedKey = new Uint8Array(this.blocksize);
      extendedKey.set(key, 0);
      key = extendedKey;
    }

    this.ipad2 = new Uint8Array(this.blocksize + sizes[alg]);
    this.opad = new Uint8Array(this.blocksize + sizes[alg]);
    for (let i = 0; i < this.blocksize; i++) {
      this.ipad2[i] = key[i] ^ 0x36;
      this.opad[i] = key[i] ^ 0x5C;
    }
    this.ipad1 = new Uint8Array(this.blocksize + saltlen + 4);
    this.ipad1.set(this.ipad2.slice(0, this.blocksize), 0);
  }

  run(data: Uint8Array, ipad: Uint8Array) {
    ipad.set(data, this.blocksize);
    const h = this.hashFunc(ipad);
    this.opad.set(h, this.blocksize);
    return this.hashFunc(this.opad);
  }
}
