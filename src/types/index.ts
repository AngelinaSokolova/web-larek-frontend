//Данные карточки:

export interface Product {
    id: string;
    description: string;
    price: number | null;
    image: string;
    title: string;
    category: string;
}

//Данные пользователя, используемые для оформления заказа:

export interface IUser {
    payment: string;
    address: string;
    email: string;
    phone: string;
    total: number;
    items: string[];
}

export interface IOrderForm {
    payment?: string;
    email: string;
    phone: string;
    address: string
}

//Интерфейс определяет структуру данных списка карточек товаров:

export interface ICardList  {
    total:number;
    cards: Product[];
    preview: string | null;
}

export type FormErrors = Partial<Record<keyof IOrderForm, string>>;

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IForm {
    valid: boolean;
    errors: string[];
}

export interface IAppState {
    catalog: Product[];
    basket: string[];
    preview: string | null;
    order: IUser;
    loading: boolean;
}

export interface IOrderResult {
    id: string;
    total: number
}