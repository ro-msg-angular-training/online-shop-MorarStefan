import OrderItem from './OrderItem';

export default interface Order {
  createdAt: string;
  customerId: string;
  deliveryAddressId: string;
  products: Array<OrderItem>;
}
