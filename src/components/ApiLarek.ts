// апи проекта
import { ApiListResponse, Api } from './base/api';
import { Product, IUser, ICardList, IOrderResult } from '../types/index';

// интерфейс описывает методы запросов
interface ILarekAPI {
	getCardList: () => Promise<Product[]>;
	orderLots: (order: IUser) => Promise<IOrderResult>;
}

export class LarekAPI extends Api implements ILarekAPI {
	readonly cdn: string;
	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getCardList(): Promise<Product[]> {
		return this.get('/product').then((data: ApiListResponse<Product>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	getCardItem(id: string): Promise<Product> {
		return this.get(`/product/${id}`).then((item: Product) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}
	orderLots(order: IUser): Promise<IOrderResult> {
		return this.post('/order', order).then((data: IOrderResult) => data);
	}
}
