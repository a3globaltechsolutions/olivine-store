'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Product } from '@/types';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import Image from 'next/image';

const ProductCarousel = ({ data }: { data: Product[] }) => {
  return (
    <Carousel
      className='w-full mb-12'
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 10000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent>
        {data.map((product: Product) => (
          <CarouselItem key={product.id}>
            <Link href={`/product/${product.slug}`}>
              <div
                className='
                  relative w-full 
                  h-[220px] sm:h-[280px] md:h-[350px] lg:h-[450px] 
                  mx-auto
                '
              >
                {product.banner ? (
                  <Image
                    src={product.banner}
                    alt={product.name}
                    fill
                    className='object-cover rounded-lg'
                    sizes='(max-width: 640px) 100vw,
                           (max-width: 1024px) 75vw,
                           50vw'
                    priority
                  />
                ) : (
                  <div className='w-full h-full bg-gray-200 flex items-center justify-center rounded-lg'>
                    <span className='text-gray-500 text-sm sm:text-base'>
                      No Image
                    </span>
                  </div>
                )}

                <div className='absolute inset-0 flex items-end justify-center'>
                  <h2
                    className='
                      bg-gray-900/60 
                      text-base sm:text-lg md:text-xl lg:text-2xl 
                      font-bold px-2 sm:px-3 py-1 text-white rounded
                      max-w-[90%] text-center truncate
                    '
                  >
                    {product.name}
                  </h2>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='hidden sm:flex' />
      <CarouselNext className='hidden sm:flex' />
    </Carousel>
  );
};

export default ProductCarousel;
