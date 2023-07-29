import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-between gap-3">
        <Link href="/login">Login</Link>
        <Link href="/signup">Signup</Link>
      </div>
    </main>
  );
}
