interface IQueue<T> {
	add: (item: T) => void;
	del: () => void;
	clear: () => void;
	getHead: () => number;
	getTail: () => number;
	getSize: () => number;
	getQueue: () => Array<T | undefined>;
	getLength: () => number;
	isEmpty: () => boolean;
}

export class Queue<T> implements IQueue<T>{
	private container: (T | undefined)[] = [];
	private size: number = 0;
	private length: number = 0;
	private head = 0;
	private tail = 0;
	constructor(size: number) {
		this.size = size;
		this.container = Array(size);
	};
	add = (elem: T) => {
		this.container[this.tail % this.size] = elem;
		this.tail++;
		this.length++;
	};
	del = () => {
		this.container[this.head % this.size] = undefined;
		this.length--;
		this.head++;
	};
	clear = () => {
		this.head = 0;
		this.tail = 0;
		this.length = 0;
		this.container = Array(this.size);
	};
	getHead = () => this.head;
	getTail = () => this.tail;
	getSize = () => this.size;
	getQueue = () => [...this.container];
	getLength = () => this.length;
	isEmpty = () => this.length === 0;
}
export const queue = new Queue<string>(7);