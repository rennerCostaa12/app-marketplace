export interface ProductsRequestsProps {
  sales_id: string;
  sales_change_money: number | null;
  sales_installments: number | null;
  sales_list_products: string;
  sales_total: number;
  sales_created_at: string;
  sales_updated_at: string;
  sales_clientId: string;
  sales_statusId: number;
  sales_paymentsId: number;
  sales_deliveryId: number;
}
