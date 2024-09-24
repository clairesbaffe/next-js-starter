import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function Page() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <SignIn />
      <Link
        href="/forgot-password"
        passHref
        style={{ marginTop: '10px', color: '#0070f3' }}
      >
        {/* <a > */}
        Mot de passe oublié ?{/* </a> */}
      </Link>
    </div>
  );
}
