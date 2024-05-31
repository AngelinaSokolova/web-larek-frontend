//Интерфейс API-клиента: 

export interface IApiClient {
}

//Интерфейсы модели данных: Эти интерфейсы определяют структуру данных, которые используются в вашем приложении. 

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number | null;
    category: string;
}

//Интерфейсы отображений: Эти интерфейсы описывают, как данные должны быть представлены на экране. Например, интерфейс для представления товара в каталоге может выглядеть так:

export interface ProductView {
    id: number;
    name: string;
    price: number;
    category: string;
    imageUrl: string;
}

//Интерфейсы базовых классов: Эти интерфейсы определяют общие методы и свойства, которые будут использоваться в вашем приложении. Например, интерфейс для управления состоянием корзины может выглядеть так:

export interface CartState {
    items: Product[];
    totalPrice: number;
}

//Перечисление событий и их интерфейсы: Если вы используете брокер событий, вам потребуется определить перечисление событий и интерфейсы для каждого события.

// Перечисление событий
export enum EventType {
    PRODUCT_ADDED_TO_CART = 'cart: add',
    ORDER_PLACED = 'order: place',
    // Другие события
}
  
  // Интерфейс для события добавления товара в корзину
export interface ProductAddedToCartEvent {
    type: EventType.PRODUCT_ADDED_TO_CART;
    product: Product;
}