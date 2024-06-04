//Данные карточки:

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number | null;
    link:string;
    title: string;
    category: string;
}

//Данные пользователя, используемые для оформления заказа:

export interface IUser {
    paymentType: Pay;
    adress:string;
    email:string;
    phone:string;
    total: number;
    items: string;
    validateUserPayAdress (data:IUser):boolean;
    validateUserContacts (data:IUser):boolean
}

//Тип оплаты, который может быть выбран пользователем при оформлении заказа:

type Pay = 'Онлайн'| 'Наличные'

//Интерфейс определяет структуру данных списка карточек товаров:

export interface ICardList  {
    total:number;
    cards: Product[];
    preview: string | null;
    addBasket(cardId: string, payload: Function | null):void;
}

//Структура корзины пользователя, включая список товаров и общую стоимость:

export interface IBacket extends Product, IUser {
    title: string;
    price: number;
    total: number;
    deleteBasketCard(card: Product, payload: Function | null): void;
    changeTotal(total: number, payload: Function | null):void;
}


//Данные, необходимые для превью на главной странице:

export type PreviewCard = Pick <Product, "category"|"name"| "link"|"price" >

//Тип карточки товара:

export type CardInfo = Pick<Product, 'category' | 'title' | 'link' | 'price'>;

//Тип карточки товара в модалном окне:

export type CardModalInfo = Pick<Product, 'link' | 'category' | 'title' | 'description' | 'price'>;

//Тип данных в модалке корзины:

export type BasketInfo = Pick<IBacket, 'title' | 'price' | 'title'>;

//Тип данных в модальном окне оформления заказа (почта и телефон):

export type ModalOrderData = Pick<IUser, 'email' | 'phone'>;

//Тип данных в модальном окне оформления заказа(способ оплаты и адрес):

export type ModalOrderPayment = Pick<IUser, 'paymentType' | 'adress'>;

//Тип данных в модальном окне после оформления заказа:

export type ModalВecorated = Pick<IUser, 'total'>

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface IApiClient {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}