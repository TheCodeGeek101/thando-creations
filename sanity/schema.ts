import { type SchemaTypeDefinition } from 'sanity'
import product from './product';
import user from './user';
import order from './order';
import orderItem from './orderItem';
import paymentResult from './paymentResult';
import shippingAddress from './shippingAddress';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
      /* Your types here! */
    product,
    user,
    order,
    orderItem,
    paymentResult,
    shippingAddress,
  ],
}
