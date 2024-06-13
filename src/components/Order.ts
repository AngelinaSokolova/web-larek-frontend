//В данном файле выполняется импорт зависимостей для создания формы заказа. В конструкторе класса создается форма и устанавливаются обработчики событий для кнопок оплаты и отправки формы. Метод changeClass используется для изменения класса кнопок в зависимости от выбранного варианта оплаты.

import { Form } from './basic/Form';
import { IUser } from '../types';
import { EventEmitter, IEvents } from './base/events';
import { ensureElement, ensureAllElements } from '../utils/utils';

export class Order extends Form<IUser> {
	_btnCollection: HTMLButtonElement[];

	//1) Коллекция полей ввода для обоих форм
	inputCollection: HTMLInputElement[];

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
			
		this._submit = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this._btnCollection = ensureAllElements<HTMLButtonElement>(
			'.button_alt',
			container
		);

		this.inputCollection = ensureAllElements<HTMLInputElement>('.form__input', container);

		if (this._btnCollection) {
			this._btnCollection.forEach((btn) => {
				btn.addEventListener('click', (e) => {
					events.emit('payment:change', {
						field: 'payment',
						value: btn.textContent,
					});
					let button = e.target as HTMLButtonElement;
					this.changeClass(button.name);
				});
			});
		}

		if (this._submit) {
			this._submit.addEventListener('click', (e) => {
				if (e.target == container.querySelector('.order__button')) {
					events.emit('contacts:open');
					this.changeClass();
				}
			});
		}
	}

	changeClass(name?: string) {
		this._btnCollection.forEach((button) => {
			this.toggleClass(button, 'button_alt-active', button.name === name);
		});
	}

	//2) функция проверяет валидность поля ввода и в зависимости от этого устнавливает значение кнопки
	updateButtonState() {
		const isCollectionInput = this.inputCollection.some((input) => input.value.trim() !== '');
		this.buttonDisable(!(isCollectionInput));
}
}