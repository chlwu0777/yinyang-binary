'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Divination from '@/components/Divination';

export default function DivinationPage() {
  const router = useRouter();
  const [show, setShow] = useState(true);

  if (!show) {
    router.push('/hexagrams');
    return null;
  }

  return <Divination onClose={() => setShow(false)} />;
}
