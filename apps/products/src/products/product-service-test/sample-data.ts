
export const productDto = {
    product_name: 'iphone13',
    product_category: 'Fashion-2',
    product_type: 'PHYSICAL',
    description: 'this is very nice product',
    images: ['image'],
    options: [
      { name: 'color', value: 'red' },
      { name: 'color', value: 'blue' },
    ],
    variants: [
      {
        options: [0, 0],
        currency: 'IDR',
        price: 10000,
        stock: 1,
        sku: 'SKU123',
        weight: 1,
      },
      {
        options: [0, 1],
        currency: 'IDR',
        price: 10000,
        stock: 2,
        sku: 'SKU456',
        weight: 1,
      },
    ],
  };