// import Link from 'next/link';
// import Image from 'next/image';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import ProductPrice from './product-price';
// import { Product } from '@/types';
// import Rating from './rating';

// const ProductCard = ({ product }: { product: Product }) => {
//   return (
//     <Card className='w-full transition hover:shadow-lg rounded-lg'>
//       {/* Image Section */}
//       <CardHeader className='p-0'>
//         <Link href={`/product/${product.slug}`}>
//           <div
//             className='
//     relative w-full
//     aspect-[4/5]
//     max-h-[320px]
//     overflow-hidden rounded-t-lg mx-auto
//     bg-gray-100
//   '
//           >
//             <Image
//               src={product.images[0]}
//               alt={product.name}
//               fill
//               className='object-contain p-2'
//               sizes='(max-width: 640px) 90vw,
//            (max-width: 1024px) 45vw,
//            250px'
//               priority
//             />
//           </div>
//         </Link>
//       </CardHeader>

//       {/* Content Section */}
//       <CardContent className='p-4 grid gap-2'>
//         <div className='text-xs text-gray-500'>{product.brand}</div>

//         <Link href={`/product/${product.slug}`}>
//           <h2 className='text-sm font-medium line-clamp-2'>{product.name}</h2>
//         </Link>

//         <div className='flex items-center justify-between gap-2 mt-2'>
//           <Rating value={Number(product.rating)} />

//           {product.stock > 0 ? (
//             <ProductPrice value={Number(product.price)} />
//           ) : (
//             <p className='text-red-500 text-sm font-medium'>Out Of Stock</p>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProductCard;

// import Link from 'next/link';
// import Image from 'next/image';
// import { Card, CardContent } from '@/components/ui/card';
// import ProductPrice from './product-price';
// import { Product } from '@/types';
// import Rating from './rating';

// const ProductCard = ({ product }: { product: Product }) => {
//   return (
//     <Card className='w-full max-w-[200px] cursor-pointer border-none shadow-none'>
//       {/* Image Section */}
//       <CardContent className='p-0'>
//         <Link href={`/product/${product.slug}`}>
//           <div className='group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center'>
//             <Image
//               src={product.images[0]}
//               alt={product.name}
//               width={200}
//               height={200}
//               className='group-hover:scale-105 transition object-cover w-4/5 h-4/5'
//             />
//           </div>
//         </Link>

//         {/* Content Section */}
//         <div className='pt-2 grid gap-0.5'>
//           <Link href={`/product/${product.slug}`}>
//             <h2 className='text-base font-medium w-full truncate'>
//               {product.name}
//             </h2>
//           </Link>

//           <p className='w-full text-xs text-gray-500/70 max-sm:hidden truncate'>
//             {product.description}
//           </p>

//           <div className='flex items-center gap-2'>
//             <p className='text-xs'>{product.rating}</p>
//             <Rating value={Number(product.rating)} />
//           </div>

//           <div className='flex items-end justify-between w-full mt-1'>
//             <ProductPrice
//               value={Number(product.price)}
//               className='text-base font-medium'
//             />
//             <button className='max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition'>
//               Buy now
//             </button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProductCard;

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import Rating from './rating';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className='flex flex-col items-start gap-0.5 w-full cursor-pointer'>
      {/* Image Section */}
      <Link href={`/product/${product.slug}`} className='w-full'>
        <div className='cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center overflow-hidden'>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={800}
            height={800}
            className='object-cover w-full h-full group-hover:scale-105 transition duration-300'
          />
        </div>
      </Link>

      {/* Product Name */}
      <Link href={`/product/${product.slug}`}>
        <p className='md:text-base font-medium pt-2 w-full'>
          {product.name.split(' ').slice(0, 2).join(' ')}
          {product.name.split(' ').length > 2 && '...'}
        </p>
      </Link>

      {/* Product Description - Hidden on mobile */}
      <p className='w-full text-xs text-gray-500/70 max-sm:hidden'>
        {product.description.split(' ').slice(0, 3).join(' ')}
        {product.description.split(' ').length > 3 && '...'}
      </p>

      {/* Rating Section */}
      <div className='flex items-center gap-2'>
        <p className='text-xs'>{Number(product.rating).toFixed(1)}</p>
        <div className='flex items-center text-xs'>
          <Rating value={4.5} />
        </div>
      </div>

      {/* Price and Buy Button */}
      <div className='flex items-end justify-between w-full mt-1'>
        <p className='text-base font-medium'>
          ${Number(product.price).toFixed(2)}
        </p>
        {product.stock > 0 && (
          <Link href={`/product/${product.slug}`}>
            <button className='px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition'>
              Buy now
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
