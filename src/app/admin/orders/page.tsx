import { OrdersTable } from './_components/orders-table';

export default function AdminOrdersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Orders</h1>
      <OrdersTable />
    </div>
  );
}
