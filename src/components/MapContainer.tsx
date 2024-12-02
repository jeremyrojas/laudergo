'use client';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./Map'), {
  loading: () => (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
      Loading map...
    </div>
  ),
  ssr: false
});

export default function MapContainer() {
  return <Map />;
} 