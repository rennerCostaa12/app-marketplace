export interface CategoryProps {
  id: number;
  name: string;
  created_at: Date | string;
  update_at: Date | string;
}
export interface ProductsProps {
  id: string;
  name: string;
  price: number;
  stock: number;
  img_product: string;
  unavailable: boolean;
  created_at: Date | string;
  updated_at: Date | string;
  categories: CategoryProps;
}

export interface ItemProps {
  id: string | number;
  urlImg: string;
  nameItem: string;
  priceItem: number;
  typeItem: string;
}

export interface ItemsSalesProps {
  id: string | number;
  urlImg: string;
  nameItem: string;
  priceItem: number;
  typeItem: string;
  quantity: number;
}
export interface CachesUserProps {
  user: DatasUserProps;
  itemsFavorites: ItemProps[] | null;
  itemsSales: ItemsSalesProps[] | null;
}