'use client';

import { demos } from '#/lib/demos';
import { routes } from '#/lib/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default async function Page() {
  const pathname = usePathname();

  const fetchData: any = async () => {
    const response = await fetch(
      'https://next-js-starter-lyart.vercel.app/api/get-pets',
    );
    const data = await response.json();

    console.log(data.rows);
  };

  fetchData();

  return (
    <div className="space-y-8">
      <div className="space-y-10 text-white">
        <h1>Ruche {pathname}</h1>

        {/* <div>
          {
            data.rows.map((section) => {
              return ()
            }
        }
        </div> */}
      </div>
    </div>
  );
}
