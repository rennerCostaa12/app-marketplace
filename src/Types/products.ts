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

export interface ItemProps {
    id: string | number;
    urlImg: string;
    nameItem: string;
    priceItem: number;
    typeItem: string;
}