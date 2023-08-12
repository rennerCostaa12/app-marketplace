export interface CategoryProps{
    id: number;
    name: string;
}
export interface ProductsProps{
    id: string | number;
    title: string;
    price: number;
    category: CategoryProps,
    available_quantity: number;
    url_img: string;
}