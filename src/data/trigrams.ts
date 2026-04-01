export interface TrigramInfo {
  name: string;
  nameEn: string;
  symbol: string;
  element: string;
  elementEn: string;
  state: string;
}

export interface FourImageInfo {
  name: string;
  nameEn: string;
  flip: boolean;
  t?: string;
}

export const trigramInfo: Record<string, TrigramInfo> = {
  '000': { name: '坤', nameEn: 'Kūn', symbol: '☷', element: '地', elementEn: 'Earth', state: 'Ground' },
  '001': { name: '震', nameEn: 'Zhèn', symbol: '☳', element: '雷', elementEn: 'Thunder', state: 'Init' },
  '010': { name: '坎', nameEn: 'Kǎn', symbol: '☵', element: '水', elementEn: 'Water', state: 'Risk' },
  '011': { name: '兑', nameEn: 'Duì', symbol: '☱', element: '泽', elementEn: 'Lake', state: 'Output' },
  '100': { name: '艮', nameEn: 'Gèn', symbol: '☶', element: '山', elementEn: 'Mountain', state: 'Stop' },
  '101': { name: '离', nameEn: 'Lí', symbol: '☲', element: '火', elementEn: 'Fire', state: 'Display' },
  '110': { name: '巽', nameEn: 'Xùn', symbol: '☴', element: '风', elementEn: 'Wind', state: 'Broadcast' },
  '111': { name: '乾', nameEn: 'Qián', symbol: '☰', element: '天', elementEn: 'Heaven', state: 'Active' },
};

export const fourImages: Record<string, FourImageInfo> = {
  '00': { name: '少阴', nameEn: 'Lesser Yin', flip: false },
  '01': { name: '少阳', nameEn: 'Lesser Yang', flip: false },
  '10': { name: '老阴', nameEn: 'Greater Yin', flip: true, t: '0→1' },
  '11': { name: '老阳', nameEn: 'Greater Yang', flip: true, t: '1→0' },
};
