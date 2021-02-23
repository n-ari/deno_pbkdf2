import type { NormalizedAlgorithms } from "./types.ts";

export const sizes: Record<NormalizedAlgorithms, number> = {
  md5: 16,
  sha1: 20,
  sha224: 28,
  sha256: 32,
  sha384: 48,
  sha512: 64,
  ripemd160: 20,
};
