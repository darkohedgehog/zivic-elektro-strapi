import type { Schema, Attribute } from '@strapi/strapi';

export interface ProductOrderDetails extends Schema.Component {
  collectionName: 'components_product_order_details';
  info: {
    displayName: 'OrderDetails';
    description: '';
  };
  attributes: {
    products: Attribute.Relation<
      'product.order-details',
      'oneToMany',
      'api::product.product'
    >;
    quantity: Attribute.Integer;
    price: Attribute.Decimal;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'product.order-details': ProductOrderDetails;
    }
  }
}
