import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ className='', width=100, height=100 }) {
  return (
    <Link href={'/'} className={`text-primary ${className}`}>
      <span className="sr-only">Home</span>
      <Image src="/logo.gif" alt="logo" width={width} height={height} className='!w-full' />
    </Link>
  );
};
