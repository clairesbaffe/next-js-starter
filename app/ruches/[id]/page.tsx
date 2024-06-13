import { demos } from '#/lib/demos';
import { routes } from '#/lib/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation'


export default function Page() {


    const pathname = usePathname()

  return (
    <div className="space-y-8">

      <div className="space-y-10 text-white">

        <h1>Ruche {pathname} .</h1>

        {
        /* {routes[1].items.map((item) => {
          return (
            <Link
              href={`/${item.slug}`}
              key={`Ruche ${item.slug}`}
              className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
            >
              <div className="font-medium text-gray-200 group-hover:text-gray-50">
                {`Ruche ${item.slug}`}
              </div>

              {item.description ? (
                <div className="line-clamp-3 text-sm text-gray-400 group-hover:text-gray-300">
                  {item.description}
                </div>
              ) : null}
            </Link>
          );
        })} */}
      </div>
    </div>
  );
}
