import axios from 'axios';

export class CrudService<T, C> {

	constructor(
		private baseUrl: string = ''
	) { }

	async find(params?: object) {
		return (await axios.get(this.baseUrl, { params })).data as T[];
	}

	async findById(id: number | string) {
		return (await axios.get(`${this.baseUrl}/${id}`)).data as T;
	}

	async create(model: C) {
		return (await axios.post(this.baseUrl, model)).data as T;
	}

	async replace(id: number | string, model: T) {
		return (await axios.put(`${this.baseUrl}/${id}`, model)).data as T;
	}

	async update(id: number | string, model: Partial<T>) {
		return (await axios.patch(`${this.baseUrl}/${id}`, model)).data as T;
	}

	async 'delete'(id: number | string) {
		await axios.delete(`${this.baseUrl}/${id}`);
	}
}
