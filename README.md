# deno_pbkdf2

std/node/_crypto/pbkdf2.ts compatible, not using std/node

## Exported items

- type `NormalizedAlgorithms`
- function `pbkdf2Sync`
- promise function `pbkdf2`

## Usage

```ts
import { pbkdf2Sync } from "https://raw.githubusercontent.com/n-ari/deno_pbkdf2/master/mod.ts";
```

## How it works

Just use `Uint8Array` instead of `Buffer` of node.

## Other cryptographic utils in deno, without std/node

- Hash algorithms (MD5, SHA2, etc) are available in [std/hash](https://deno.land/std@0.88.0/hash).
- Elliptic Curves (ECDSA, EDDSA) are available in [x/secp256k1](https://deno.land/x/secp256k1@1.0.5) and [x/ed25519](https://deno.land/x/ed25519@1.0.1).
- Encrypt algorithms (AES, RSA) and HMAC are available in [x/god_crypto](https://deno.land/x/god_crypto@v1.4.9).
  - Note that this package [doesn't seem to consider timing attacks](https://github.com/invisal/god_crypto/blob/master/src/math.ts).
- There is an open issue about [implementing webcrypto APIs in deno](https://github.com/denoland/deno/issues/1891).

## License

MIT
https://github.com/n-ari/deno_pbkdf2/blob/master/LICENSE

## Original Implementation

Original Implementation:
- https://github.com/denoland/deno_std/tree/0.88.0/node/_crypto/pbkdf2.ts
- https://github.com/denoland/deno_std/tree/0.88.0/node/_crypto/pbkdf2_test.ts

Copyright (c) 2018-2021 the Deno authors.
Released under the MIT License
https://github.com/denoland/deno_std/blob/0.88.0/LICENSE

