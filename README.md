# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Данные и типы данных, используемых в приложении. 

Данные карточки:
```
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number | null;
    link:string;
    title: string;
    category: string;
}
```
Данные пользователя, используемые для оформления заказа:
```
export interface IUser {
    paymentType: Pay;
    adress:string;
    email:string;
    phone:string;
    total: number;
    items: string;
}
```
Тип оплаты, который может быть выбран пользователем при оформлении заказа:
```
type Pay = 'Онлайн'| 'Наличные'
```
Интерфейс определяющий структуру данных списка карточек товаров:
```
export interface ICardList  {
    total:number;
    cards: Product[];
    preview: string | null;
    addBasket(cardId: string, payload: Function | null):void;
}
```
Структура корзины пользователя, включая список товаров и общую стоимость:
```
export interface IBacket extends Product, IUser {
    title: string;
    price: number;
    total: number;
    deleteBasketCard(card: Product, payload: Function | null): void;
    changeTotal(total: number, payload: Function | null):void;
}
```
Данные, необходимые для превью на главной странице:
```
export type PreviewCard = Pick <Product, "category"|"name"| "link"|"price" >;
```
Тип карточки товара:
```
export type CardInfo = Pick<Product, 'category' | 'title' | 'link' | 'price'>;
```
Тип карточки товара в модалном окне:
```
export type CardModalInfo = Pick<Product, 'link' | 'category' | 'title' | 'description' | 'price'>;
```
Тип данных в модалке корзины:
```
export type BasketInfo = Pick<IBacket, 'title' | 'price' | 'title'>;
```
Тип данных в модальном окне оформления заказа (почта и телефон):
```
export type ModalOrderData = Pick<IUser, 'email' | 'phone'>;
```
Тип данных в модальном окне оформления заказа(способ оплаты и адрес):
```
export type ModalOrderPayment = Pick<IUser, 'paymentType' | 'adress'>;
```
Тип данных в модальном окне после оформления заказа:
```
export type ModalВecorated = Pick<IUser, 'total'>
```

## Архитектура приложения
Приложение написано на базе архитектуры MVP. MVP разделяет приложение на три основных компонента:
1. Модель (Model): Модель представляет собой бизнес-логику приложения и данные. Она ответственна за выполнение операций, таких как чтение и запись данных, обработка бизнес-логики и взаимодействие с базой данных или внешними источниками данных.
2. Представление (View): Представление отображает данные пользователю и обрабатывает пользовательский ввод. Оно представляет собой интерфейс пользователя, через который пользователь взаимодействует с приложением.
3. Презентер (Presenter): Презентер является посредником между моделью и представлением. Он содержит бизнес-логику приложения и управляет взаимодействием между моделью и представлением. Презентер получает данные от модели, форматирует их и передает представлению для отображения. Он также обрабатывает пользовательский ввод, передавая соответствующие команды модели для обновления данных.

## Базовый код

### Класс EventEmitter
Класс EventEmitter отвечает за управление событиями в приложении. Он предоставляет методы для подписки на события, отписки от них, а также для генерации событий и уведомления подписчиков.
Класс имеет методы:
* `on` - подписка
*  `off` - отписка
*  `emit`  —  уведомления подписчиков о наступлении события соответственно.Инициализация событий
Дополнительно реализованы методы  onAll и  offAll  — для подписки на все события и сброса всех подписчиков.

### Класс API
Класс API отвечает за взаимодействие с сервером и выполнение HTTP-запросов. Он содержит базовую логику отправки запросов и может быть расширен для поддержки различных методов запросов и форматов данных.
Поля:
- baseUrl: string - ссылка для запроса
- options: RequestInit - опции, передаваемые в параметры запроса.
Методы: 
- `get` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер
- `post` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.

## Слой данных

### Класс CardData
Класс CardData хранит данные одной карточки товара и предоставляет методы для работы с этими данными. Он также содержит экземпляр класса EventEmitterUserData` для инициации событий, связанных с изменением данных карточки.

В полях класса хранятся следующие данные:
- cards: Product[]; - массив объектов карточек
- preview: string | null - id карточки, выбранной для просмотра в модальной окне

Класс так же содержит методы:
- addBasket(cardId: string, payload: Function | null):void - позволяет отправить выбранный товар в корзину

 ### Класс UserData
 Класс UserData хранит данные пользователя, необходимые для оформления заказа. Он также содержит экземпляр класса EventEmitter и предоставляет методы для валидации данных пользователя.

 В полях класса хранятся следующие данные: 
- paymentType: Pay - тип оплаты
- adress: string - адрес
- email: string - адрес электронной почты
- phone: string  - номер телефона получателя
- events: IEvents - экземпляр класса `EventEmitter` для инициации событий

Класс имеет следующий набор методов:

*  validateUserPayAdress (data:IUser):boolean  - валидация данных поля с адресом
*  validateUserContacts (data:IUser):boolean - валидация данных полей с контактными данными (телефон, почта).

### Класс BasketData
Класс BasketData отвечает за хранение данных корзины пользователя и предоставляет методы для работы с этими данными. Он содержит экземпляр класса EventEmitter для инициации событий, связанных с изменением данных корзины. Методы addItem, removeItem, updateQuantity, getTotalPrice и clearBasket позволяют управлять содержимым корзины и получать информацию о ней.
В полях класса хранятся следующие данные:

- title: string; - Заголовок товара
- price: number; - Цена товара
- total: number; - Общая сумма всего заказа
- events: EventEmitter - экземпляр класса `EventEmitter` для инициации событий при изменении данных.

Методы класса:

- deleteBasketCard(card: ICard, payload: Function | null): void - удаляет товар из корзины
- changeTotal(total: number, payload: Function | null):void; - метод который пересчитывает общую сумму заказа

## Классы представления
Все классы представления отвечают за отображение внутри контейнера (DOM-элемент) передаваемых в них данных.

### Класс Modal
Реализует модальное окно. Так же предоставляет методы open и close для управления отображением модального окна. Устанавливает слушатели на клавиатуру, для закрытия модального окна по Esc, на клик в оверлей и кнопку-крестик для закрытия попапа.

- constructor(selector: string, events: IEvents) - Конструктор принимает селектор, по которому в разметке страницы будет идентифицировано модальное окно и экземпляр класса EventEmitter для возможности инициации событий.
Поля класса:

- modal: HTMLElement - элемент модального окна
- closeModal - кнопка закрытия модалки
- events: IEvents - брокер событий

### Класс ModalBasket
Расширяет класс Modal. Предназначен для реализации модального окна корзины. При открытии модального окна предоставляет данные выбранных товаров, возможность удаление выбранного товара и счетчик общей суммы заказа. Если в корзине есть хоть какие-то данные дает возможность оформить заказ
Поля класса:

- submitOrder: HTMLButtonElement - Кнопка оформления заказа
- itemCard: HTMLElement - Элемент товара помещенный в корзину
- deleteButtonItem: HTMLButtonElement - Кнопка удаление элемента в корзине

Методы:

- setValid(isValid: boolean):void  - изменяет активность кнопки офрмления заказа (если в корзине есть какой то элемент)
- get form: HTMLElement - геттер для получения элемента формы.

### Класс ModalOrderPayment
Расширяет класс Modal. Предназначен для реализации модального окна оформления заказа(форма оплаты, адресс). В модальном окне реализиван функционал позволяющий пользователю указать способ оплаты и адресс доставки.
Поля класса:

- onlineButton - кнопка способ оплаты онлайн
- receivingButton - кнопка способ оплаты при получении
- _form - элемент формы
- submitThen: HTMLButtonElement - Кнопка далее в фомре


Методы:

- setValid(isValid: boolean):void  - изменяет активность кнопки далее (если все данные заполнены)
- setError(data: { field: string, value: string, validInformation: string }): void - принимает объект с данными для отображения или сокрытия текстов ошибок под полями ввода
- showInputError (field: string, errorMessage: string): void - отображает полученный текст ошибки под указанным полем ввода
- hideInputError (field: string): void - очищает текст ошибки под указанным полем ввода

### Класс ModalOrderData
Расширяет класс Modal. Предназначен для реализации модального окна с формой содержащей поля ввода. При изменении данных в полях ввода инициирует событие изменения данных. Предоставляет методы для отображения ошибок и управления активностью кнопки оплаты
Поля класса:

- inputEmail - поле ввода почты
- inputPhone - поле ввода телефона
- submitPayment: HTMLButtonElement - Кнопка оплата в фомре

Методы:

- setValid(isValid: boolean):void  - изменяет активность кнопки далее (если все данные заполнены)
- setError(data: { field: string, value: string, validInformation: string }): void - принимает объект с данными для отображения или сокрытия текстов ошибок под полями ввода
- showInputError (field: string, errorMessage: string): void - отображает полученный текст ошибки под указанным полем ввода
- hideInputError (field: string): void - очищает текст ошибки под указанным полем ввода

### Класс ModalDecorated
Расширяет класс Modal. Предназначен для реализации модального окна с данными общей суммы покупки пользователя. Класс дает возможность очистить корзину 
Поля класса:

- totalPrice - данные общей суммы покупками
- submitButton - кнопка которая закрывает модальное окно и очищает корзину

Методы:

- close (): void - расширяет родительский метод дополнительно при закрытии очищая поля формы

### Класс CardsContainer
Отвечает за отображение блока с карточками на главной странице. Предоставляет метод addCard(cardElement: HTMLElement) для добавления карточек на страницу и сеттер container для полного обновления содержимого. В конструктор принимает контейнер, в котором размещаются карточки.

## Слой коммуникации
### Класс IApiClient
Принимает в конструктор экземпляр класса Api и предоставляет методы реализующие взаимодействие с бэкендом сервиса.

## Взаимодействие компонентов

Код, описывающий взаимодействие представления и данных между собой находится в файле index.ts, выполняющем роль презентера. Взаимодействие осуществляется за счет событий генерируемых с помощью брокера событий и обработчиков этих событий, описанных в index.ts В index.ts сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.

События, возникающие при взаимодействии пользователя с интерфейсом (генерируются классами, отвечающими за представление)

Backet:open - открытие модального окна корзины
CardElement:open - открытие модального окна карточки
choice: button - выбор кнопки способа оплаты
adress: input - введение данных адреса доставки
email: input - введение данных почты
phone: input - введение данных телефона
choice: validation - событие, сообщающее о необходимости валидации формы способа оплаты
adress: validation - событие, сообщающее о необходимости валидации формы адреса доставки
email: validation - событие, сообщающее о необходимости валидации формы email
phone: validation - событие, сообщающее о необходимости валидации формы phone