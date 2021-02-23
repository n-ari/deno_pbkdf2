export type NormalizedAlgorithms =
  | "md5"
  | "ripemd160"
  | "sha1"
  | "sha224"
  | "sha256"
  | "sha384"
  | "sha512";

export type HashData = string | ArrayBufferView | Uint8Array;
