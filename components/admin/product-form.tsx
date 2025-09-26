// 'use client';

// import { useToast } from '@/hooks/use-toast';
// import { productDefaultValues } from '@/lib/constants';
// import { insertProductSchema, updateProductSchema } from '@/lib/validators';
// import { Product } from '@/types';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useRouter } from 'next/navigation';
// import { ControllerRenderProps, SubmitHandler, useForm } from 'react-hook-form';
// import { z } from 'zod';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '../ui/form';
// import slugify from 'slugify';
// import { Input } from '../ui/input';
// import { Button } from '../ui/button';
// import { Textarea } from '../ui/textarea';
// import { createProduct, updateProduct } from '@/lib/actions/product.actions';
// import { UploadButton } from '@/lib/uploadthing';
// import { Card, CardContent } from '../ui/card';
// import Image from 'next/image';
// import { Checkbox } from '../ui/checkbox';

// const ProductForm = ({
//   type,
//   product,
//   productId,
// }: {
//   type: 'Create' | 'Update';
//   product?: Product;
//   productId?: string;
// }) => {
//   const router = useRouter();
//   const { toast } = useToast();

//   // For image uploads
//   const MAX_FILE_SIZE = 500 * 1024;

//   function validateFileSize(file: File) {
//     return file.size <= MAX_FILE_SIZE;
//   }

//   const form = useForm<z.infer<typeof insertProductSchema>>({
//     resolver:
//       type === 'Update'
//         ? zodResolver(updateProductSchema)
//         : zodResolver(insertProductSchema),
//     defaultValues:
//       product && type === 'Update' ? product : productDefaultValues,
//   });

//   const onSubmit: SubmitHandler<z.infer<typeof insertProductSchema>> = async (
//     values
//   ) => {
//     // On Create
//     if (type === 'Create') {
//       const res = await createProduct(values);

//       if (!res.success) {
//         toast({
//           variant: 'destructive',
//           description: res.message,
//         });
//       } else {
//         toast({
//           description: res.message,
//         });
//         router.push('/admin/products');
//       }
//     }

//     // On Update
//     if (type === 'Update') {
//       if (!productId) {
//         router.push('/admin/products');
//         return;
//       }

//       const res = await updateProduct({ ...values, id: productId });

//       if (!res.success) {
//         toast({
//           variant: 'destructive',
//           description: res.message,
//         });
//       } else {
//         toast({
//           description: res.message,
//         });
//         router.push('/admin/products');
//       }
//     }
//   };

//   const handleDeleteImage = async (imageUrl: string) => {
//     try {
//       if (type === 'Update' && productId) {
//         // Update mode: remove from DB + UploadThing
//         await fetch('/admin/products/remove-image', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ productId, imageUrl }),
//         });
//       } else {
//         // Create mode: only remove from UploadThing (since DB record not created yet)
//         await fetch('/api/uploadthing/delete', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url: imageUrl }),
//         });
//       }

//       // Update form state instantly (works for both Create and Update)
//       form.setValue(
//         'images',
//         images.filter((img: string) => img !== imageUrl)
//       );

//       toast({ description: 'Image deleted successfully' });
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//       toast({
//         variant: 'destructive',
//         description: 'Failed to delete image',
//       });
//     }
//   };

//   const images = form.watch('images');
//   const isFeatured = form.watch('isFeatured');
//   const banner = form.watch('banner');

//   return (
//     <Form {...form}>
//       <form
//         method='POST'
//         onSubmit={form.handleSubmit(onSubmit)}
//         className='space-y-8'
//       >
//         <div className='flex flex-col md:flex-row gap-5'>
//           {/* Name */}
//           <FormField
//             control={form.control}
//             name='name'
//             render={({
//               field,
//             }: {
//               field: ControllerRenderProps<
//                 z.infer<typeof insertProductSchema>,
//                 'name'
//               >;
//             }) => (
//               <FormItem className='w-full'>
//                 <FormLabel>Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder='Enter product name' {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           {/* Slug */}
//           <FormField
//             control={form.control}
//             name='slug'
//             render={({
//               field,
//             }: {
//               field: ControllerRenderProps<
//                 z.infer<typeof insertProductSchema>,
//                 'slug'
//               >;
//             }) => (
//               <FormItem className='w-full'>
//                 <FormLabel>Name</FormLabel>
//                 <FormControl>
//                   <div className='relative'>
//                     <Input placeholder='Enter slug' {...field} readOnly />
//                     <Button
//                       type='button'
//                       className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 mt-2'
//                       onClick={() => {
//                         form.setValue(
//                           'slug',
//                           slugify(form.getValues('name'), { lower: true })
//                         );
//                       }}
//                     >
//                       Generate
//                     </Button>
//                   </div>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <div className='flex flex-col md:flex-row gap-5'>
//           {/* Category */}
//           <FormField
//             control={form.control}
//             name='category'
//             render={({
//               field,
//             }: {
//               field: ControllerRenderProps<
//                 z.infer<typeof insertProductSchema>,
//                 'category'
//               >;
//             }) => (
//               <FormItem className='w-full'>
//                 <FormLabel>Category</FormLabel>
//                 <FormControl>
//                   <Input placeholder='Enter category' {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           {/* Brand */}
//           <FormField
//             control={form.control}
//             name='brand'
//             render={({
//               field,
//             }: {
//               field: ControllerRenderProps<
//                 z.infer<typeof insertProductSchema>,
//                 'brand'
//               >;
//             }) => (
//               <FormItem className='w-full'>
//                 <FormLabel>Brand</FormLabel>
//                 <FormControl>
//                   <Input placeholder='Enter brand' {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <div className='flex flex-col md:flex-row gap-5'>
//           {/* Price */}
//           <FormField
//             control={form.control}
//             name='price'
//             render={({
//               field,
//             }: {
//               field: ControllerRenderProps<
//                 z.infer<typeof insertProductSchema>,
//                 'price'
//               >;
//             }) => (
//               <FormItem className='w-full'>
//                 <FormLabel>Price</FormLabel>
//                 <FormControl>
//                   <Input placeholder='Enter product price' {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           {/* Stock */}
//           <FormField
//             control={form.control}
//             name='stock'
//             render={({
//               field,
//             }: {
//               field: ControllerRenderProps<
//                 z.infer<typeof insertProductSchema>,
//                 'stock'
//               >;
//             }) => (
//               <FormItem className='w-full'>
//                 <FormLabel>Stock</FormLabel>
//                 <FormControl>
//                   <Input placeholder='Enter stock' {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <div className='upload-field flex flex-col md:flex-row gap-5'>
//           {/* Images */}
//           <FormField
//             control={form.control}
//             name='images'
//             render={() => (
//               <FormItem className='w-full'>
//                 <FormLabel>Images</FormLabel>
//                 <Card>
//                   <CardContent className='space-y-2 mt-2 min-h-48'>
//                     <div className='flex-start space-x-2'>
//                       {images.map((image: string) => (
//                         <div className='relative inline-block' key={image}>
//                           <Image
//                             key={image}
//                             src={image}
//                             alt='product image'
//                             className='w-20 h-20 object-cover object-center rounded-sm'
//                             width={100}
//                             height={100}
//                           />
//                           <button
//                             type='button'
//                             onClick={() => handleDeleteImage(image)}
//                             className='absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-xs hover:bg-red-700'
//                           >
//                             ✕
//                           </button>
//                         </div>
//                       ))}
//                       <FormControl>
//                         <UploadButton
//                           endpoint='imageUploader'
//                           onClientUploadComplete={(res: { url: string }[]) => {
//                             form.setValue('images', [...images, res[0].url]);
//                           }}
//                           onUploadError={(error: Error) => {
//                             toast({
//                               variant: 'destructive',
//                               description: `ERROR! ${error.message}`,
//                             });
//                           }}
//                         />
//                       </FormControl>
//                     </div>
//                   </CardContent>
//                 </Card>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <div className='upload-field'>
//           {/* isFeatured */}
//           Featured Product
//           <Card>
//             <CardContent className='space-y-2 mt-2'>
//               <FormField
//                 control={form.control}
//                 name='isFeatured'
//                 render={({ field }) => (
//                   <FormItem className='space-x-2 items-center'>
//                     <FormControl>
//                       <Checkbox
//                         checked={field.value}
//                         onCheckedChange={field.onChange}
//                       />
//                     </FormControl>
//                     <FormLabel>Is Featured?</FormLabel>
//                   </FormItem>
//                 )}
//               />
//               {isFeatured && banner && (
//                 <Image
//                   src={banner}
//                   alt='banner image'
//                   className='w-full object-cover object-center rounded-sm'
//                   width={1920}
//                   height={680}
//                 />
//               )}

//               {isFeatured && !banner && (
//                 <UploadButton
//                   endpoint='imageUploader'
//                   onClientUploadComplete={(res: { url: string }[]) => {
//                     form.setValue('banner', res[0].url);
//                   }}
//                   onUploadError={(error: Error) => {
//                     toast({
//                       variant: 'destructive',
//                       description: `ERROR! ${error.message}`,
//                     });
//                   }}
//                 />
//               )}
//             </CardContent>
//           </Card>
//         </div>
//         <div>
//           {/* Description */}
//           <FormField
//             control={form.control}
//             name='description'
//             render={({
//               field,
//             }: {
//               field: ControllerRenderProps<
//                 z.infer<typeof insertProductSchema>,
//                 'description'
//               >;
//             }) => (
//               <FormItem className='w-full'>
//                 <FormLabel>Description</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder='Enter product description'
//                     className='resize-none'
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <div>
//           <Button
//             type='submit'
//             size='lg'
//             disabled={form.formState.isSubmitting}
//             className='button col-span-2 w-full'
//           >
//             {form.formState.isSubmitting ? 'Submitting' : `${type} Product`}
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// };

// export default ProductForm;
'use client';

import { useToast } from '@/hooks/use-toast';
import { productDefaultValues } from '@/lib/constants';
import { insertProductSchema, updateProductSchema } from '@/lib/validators';
import { Product } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { ControllerRenderProps, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import slugify from 'slugify';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { createProduct, updateProduct } from '@/lib/actions/product.actions';
import { UploadButton } from '@/lib/uploadthing';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { Checkbox } from '../ui/checkbox';

const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: 'Create' | 'Update';
  product?: Product;
  productId?: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  function validateFiles(
    files: File[],
    maxSizeKB: number,
    showToast: (msg: string) => void
  ): File[] {
    const maxSizeBytes = maxSizeKB * 1024;

    const validFiles = files.filter((file) => {
      if (file.size > maxSizeBytes) {
        showToast(
          `File "${file.name}" is too large. Max size is ${maxSizeKB}KB.`
        );
        return false;
      }
      return true;
    });

    return validFiles;
  }

  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver:
      type === 'Update'
        ? zodResolver(updateProductSchema)
        : zodResolver(insertProductSchema),
    defaultValues:
      product && type === 'Update' ? product : productDefaultValues,
  });

  const onSubmit: SubmitHandler<z.infer<typeof insertProductSchema>> = async (
    values
  ) => {
    if (type === 'Create') {
      const res = await createProduct(values);
      if (!res.success) {
        toast({ variant: 'destructive', description: res.message });
      } else {
        toast({ description: res.message });
        router.push('/admin/products');
      }
    }

    if (type === 'Update') {
      if (!productId) {
        router.push('/admin/products');
        return;
      }

      const res = await updateProduct({ ...values, id: productId });
      if (!res.success) {
        toast({ variant: 'destructive', description: res.message });
      } else {
        toast({ description: res.message });
        router.push('/admin/products');
      }
    }
  };

  const handleDeleteImage = async (imageUrl: string) => {
    try {
      if (type === 'Update' && productId) {
        await fetch('/admin/products/remove-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId, imageUrl }),
        });
      } else {
        await fetch('/api/uploadthing/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: imageUrl }),
        });
      }

      form.setValue(
        'images',
        images.filter((img: string) => img !== imageUrl)
      );

      toast({ description: 'Image deleted successfully' });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({ variant: 'destructive', description: 'Failed to delete image' });
    }
  };

  const images = form.watch('images');
  const isFeatured = form.watch('isFeatured');
  const banner = form.watch('banner');

  return (
    <Form {...form}>
      <form
        method='POST'
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        <div className='flex flex-col md:flex-row gap-5'>
          {/* Name */}
          <FormField
            control={form.control}
            name='name'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                'name'
              >;
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter product name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Slug */}
          <FormField
            control={form.control}
            name='slug'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                'slug'
              >;
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input placeholder='Enter slug' {...field} readOnly />
                    <Button
                      type='button'
                      className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 mt-2'
                      onClick={() => {
                        form.setValue(
                          'slug',
                          slugify(form.getValues('name'), { lower: true })
                        );
                      }}
                    >
                      Generate
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col md:flex-row gap-5'>
          {/* Category */}
          <FormField
            control={form.control}
            name='category'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                'category'
              >;
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder='Enter category' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Brand */}
          <FormField
            control={form.control}
            name='brand'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                'brand'
              >;
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder='Enter brand' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col md:flex-row gap-5'>
          {/* Price */}
          <FormField
            control={form.control}
            name='price'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                'price'
              >;
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder='Enter product price' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Stock */}
          <FormField
            control={form.control}
            name='stock'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                'stock'
              >;
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input placeholder='Enter stock' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Images */}
        <div className='upload-field flex flex-col md:flex-row gap-5'>
          <FormField
            control={form.control}
            name='images'
            render={() => (
              <FormItem className='w-full'>
                <FormLabel>Images (Max 500KB each)</FormLabel>
                <Card>
                  <CardContent className='space-y-2 mt-2 min-h-48'>
                    <div className='flex-start space-x-2'>
                      {images.map((image: string) => (
                        <div className='relative inline-block' key={image}>
                          <Image
                            src={image}
                            alt='product image'
                            className='w-20 h-20 object-cover object-center rounded-sm'
                            width={100}
                            height={100}
                          />
                          <button
                            type='button'
                            onClick={() => handleDeleteImage(image)}
                            className='absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-xs hover:bg-red-700'
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <FormControl>
                        <UploadButton
                          endpoint='imageUploader'
                          onBeforeUploadBegin={(files) =>
                            validateFiles(files, 500, (msg) =>
                              toast({
                                variant: 'destructive',
                                description: msg,
                              })
                            )
                          }
                          onClientUploadComplete={(res) => {
                            if (!res || res.length === 0) return;
                            form.setValue('images', [...images, res[0].ufsUrl]);
                          }}
                          onUploadError={(error: Error) => {
                            toast({
                              variant: 'destructive',
                              description: error.message,
                            });
                          }}
                        />
                      </FormControl>
                    </div>
                  </CardContent>
                </Card>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Featured / Banner */}
        <div className='upload-field'>
          Featured Product
          <Card>
            <CardContent className='space-y-2 mt-2'>
              <FormField
                control={form.control}
                name='isFeatured'
                render={({ field }) => (
                  <FormItem className='space-x-2 items-center'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Is Featured?</FormLabel>
                  </FormItem>
                )}
              />
              {isFeatured && banner && (
                <Image
                  src={banner}
                  alt='banner image'
                  className='w-full object-cover object-center rounded-sm'
                  width={1920}
                  height={680}
                />
              )}
              {isFeatured && !banner && (
                <UploadButton
                  endpoint='imageUploader'
                  onBeforeUploadBegin={(files) =>
                    validateFiles(files, 500, (msg) =>
                      toast({ variant: 'destructive', description: msg })
                    )
                  }
                  onClientUploadComplete={(res) => {
                    if (!res || res.length === 0) return;
                    form.setValue('banner', res[0].ufsUrl);
                  }}
                  onUploadError={(error: Error) => {
                    toast({
                      variant: 'destructive',
                      description: error.message,
                    });
                  }}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <div>
          <FormField
            control={form.control}
            name='description'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                'description'
              >;
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Enter product description'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <Button
            type='submit'
            size='lg'
            disabled={form.formState.isSubmitting}
            className='button col-span-2 w-full'
          >
            {form.formState.isSubmitting ? 'Submitting' : `${type} Product`}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
