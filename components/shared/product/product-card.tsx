import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ProductPrice from './product-price';
import { Product } from '@/types';
import Rating from './rating';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className='w-full transition hover:shadow-lg rounded-lg'>
      {/* Image Section */}
      <CardHeader className='p-0'>
        <Link href={`/product/${product.slug}`}>
          <div
            className='
    relative w-full 
    aspect-[4/5] 
    max-h-[320px] 
    overflow-hidden rounded-t-lg mx-auto
    bg-gray-100
  '
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className='object-contain p-2'
              sizes='(max-width: 640px) 90vw,
           (max-width: 1024px) 45vw,
           250px'
              priority
            />
          </div>
        </Link>
      </CardHeader>

      {/* Content Section */}
      <CardContent className='p-4 grid gap-2'>
        <div className='text-xs text-gray-500'>{product.brand}</div>

        <Link href={`/product/${product.slug}`}>
          <h2 className='text-sm font-medium line-clamp-2'>{product.name}</h2>
        </Link>

        <div className='flex items-center justify-between gap-2 mt-2'>
          <Rating value={Number(product.rating)} />

          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className='text-red-500 text-sm font-medium'>Out Of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
