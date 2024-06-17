'use client';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

export default async function Page() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="space-y-8">
      <div className="space-y-10 text-white">
        <h1>Ruche {router.query.slug}</h1>
      </div>
    </div>
  );
}
