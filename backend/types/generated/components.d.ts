import type { Schema, Attribute } from '@strapi/strapi';

export interface ProductOrderDetails extends Schema.Component {
  collectionName: 'components_product_order_details';
  info: {
    displayName: 'OrderDetails';
  };
  attributes: {
    product: Attribute.Relation<
      'product.order-details',
      'oneToOne',
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
