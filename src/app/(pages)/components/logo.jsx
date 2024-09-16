import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Logo({ className='' }) {
  return (
    <Link href={'/'} className={className}>
      <span className="sr-only">Home</span>
      <Image src="/logo.gif" alt="logo" width={100} height={100} className='!w-full' />
    </Link>
  );
};
