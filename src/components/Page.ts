//В данном файле выполняется импорт зависимостей для создания компонента страницы. В конструкторе класса создаются элементы интерфейса страницы, такие как счетчик товаров в корзине, разметка карточки и общий контейнер страницы. Также устанавливаются обработчики событий для элементов корзины и выполняются методы для установки значений счетчика и каталога товаров.
import { Component } from './base/Component';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';

interface IPage {
	counter: number;
	catalog: HTMLElement[];
}

export class Page extends Component<IPage> {
	protected _counter: HTMLElement; // количество товара в корзине
	protected _catalog: HTMLElement; // разметка карточки
	protected _wrapper: HTMLElement; // общий контейнер страницы
	protected _basket: HTMLElement; // элемент корзины

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._counter = ensureElement<HTMLElement>('.header__basket-counter');
		this._catalog = ensureElement<HTMLElement>('.gallery');
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._basket = ensureElement<HTMLElement>('.header__basket');

		this._basket.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	set counter(value: number) {
		this.setText(this._counter, String(value));
	}

	set catalog(items: HTMLElement[]) {
		this._catalog.replaceChildren(...items);
	}

	set locked(value: boolean) {
		if (value) {
			this._wrapper.classList.add('page__wrapper_locked');
		} else {
			this._wrapper.classList.remove('page__wrapper_locked');
		}
	}
}
