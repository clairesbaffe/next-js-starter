import { demos } from '#/lib/demos';
import { routes } from '#/lib/routes';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { currentUser } from '@clerk/nextjs/server';
import { SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs';

export default async function Page() {
  const user = await currentUser();
  console.log('user : ', user);

  return (
    <div className="space-y-8">
      <SignedIn>
        <p>{user?.emailAddresses[0].emailAddress}</p>
        <SignOutButton></SignOutButton>
      </SignedIn>
      <h1 className="text-xl font-medium text-gray-300">Examples</h1>

      <div className="space-y-10 text-white">
        <Link
          href={`/tracker`}
          className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
        >
          <div className="font-medium text-gray-200 group-hover:text-gray-50">
            Tracker
          </div>
        </Link>
        <SignedOut>
          <Link
            href={`/sign-in`}
            className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
          >
            <div className="font-medium text-gray-200 group-hover:text-gray-50">
              Sign-in
            </div>
          </Link>
          <Link
            href={`/sign-up`}
            className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
          >
            <div className="font-medium text-gray-200 group-hover:text-gray-50">
              Sign-up
            </div>
          </Link>
        </SignedOut>

        {demos.map((section) => {
          return (
            <div key={section.name} className="space-y-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                {section.name}
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {section.items.map((item) => {
                  return (
                    <Link
                      href={`/${item.slug}`}
                      key={item.name}
                      className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
                    >
                      <div className="font-medium text-gray-200 group-hover:text-gray-50">
                        {item.name}
                      </div>

                      {item.description ? (
                        <div className="line-clamp-3 text-sm text-gray-400 group-hover:text-gray-300">
                          {item.description}
                        </div>
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
