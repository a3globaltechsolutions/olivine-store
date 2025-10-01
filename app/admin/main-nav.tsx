// 'use client';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { cn } from '@/lib/utils';
// import React from 'react';

// const links = [
//   {
//     title: 'Overview',
//     href: '/admin/overview',
//   },
//   {
//     title: 'Products',
//     href: '/admin/products',
//   },
//   {
//     title: 'Orders',
//     href: '/admin/orders',
//   },
//   {
//     title: 'Users',
//     href: '/admin/users',
//   },
// ];

// const MainNav = ({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLElement>) => {
//   const pathname = usePathname();
//   return (
//     <nav
//       className={cn('flex items-center space-x-4 lg:space-x-6', className)}
//       {...props}
//     >
//       {links.map((item) => (
//         <Link
//           key={item.href}
//           href={item.href}
//           className={cn(
//             'text-sm font-medium transition-colors hover:text-primary',
//             pathname.includes(item.href) ? '' : 'text-muted-foreground'
//           )}
//         >
//           {item.title}
//         </Link>
//       ))}
//     </nav>
//   );
// };

// export default MainNav;

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const links = [
  { title: 'Home', href: '/' },
  { title: 'Overview', href: '/admin/overview' },
  { title: 'Products', href: '/admin/products' },
  { title: 'Orders', href: '/admin/orders' },
  { title: 'Users', href: '/admin/users' },
];

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();

  return (
    <nav className={cn('flex items-center border-b', className)} {...props}>
      {/* Desktop Nav */}
      <div className='hidden md:flex gap-4'>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname.includes(link.href)
                ? 'text-primary'
                : 'text-muted-foreground'
            )}
          >
            {link.title}
          </Link>
        ))}
      </div>

      {/* Mobile Nav */}
      <div className='md:hidden'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon'>
              <Menu className='w-5 h-5' />
              <span className='sr-only'>Open Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='flex flex-col gap-4 p-6'>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname.includes(link.href)
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {link.title}
              </Link>
            ))}
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default MainNav;
