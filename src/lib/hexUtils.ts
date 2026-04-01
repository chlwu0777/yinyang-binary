import { hexagramsData, type HexagramData } from '@/data/hexagrams';

export const getBit = (state: number, position: number): number =>
  (state >> position) & 1;

export const toBinary = (state: number, bits: number = 6): string =>
  state.toString(2).padStart(bits, '0');

export const hammingDist = (a: number, b: number): number => {
  let x = a ^ b;
  let count = 0;
  while (x) {
    count += x & 1;
    x >>= 1;
  }
  return count;
};

export const getHexInfo = (binary: string | number): HexagramData | undefined => {
  const bin = typeof binary === 'number' ? toBinary(binary) : binary;
  return hexagramsData.find((h) => h.binary === bin);
};
