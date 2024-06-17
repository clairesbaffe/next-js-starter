'use client';

import { usePathname } from 'next/navigation';

export default async function Page() {
  const pathname = usePathname();

  return (
    <div className="space-y-8">
      <div className="space-y-10 text-white">
        <h1>Ruche {pathname}</h1>
      </div>
    </div>
  );
}
