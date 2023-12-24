export interface StatusProps {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface DetailsRequestProps {
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
  status_id: number;
  status_name: string;
  status_created_at: string;
  status_updated_at: string;
  status_adminId: string;
  delivery_id: number;
  delivery_name: string;
  delivery_created_at: string;
  delivery_updated_at: string;
  payments_id: number;
  payments_name: string;
  payments_type: string;
  payments_created_at: string;
  payments_updated_at: string;
}
