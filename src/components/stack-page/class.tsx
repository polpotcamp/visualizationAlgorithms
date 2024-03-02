interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    clear: () => void;
    getSize: () => number;
    getStack: () => void;
    getTopIndex: () => void
  }
export class Stack<T>  implements IStack<T>{
    private container: T[] = [];
    push = (item: T) => this.container.push(item);
    pop = () => this.container.pop();
    clear = () => this.container = [];
    getSize = () => this.container.length;
    getStack = () => this.container;
    getTopIndex = () => this.container.length - 1;
}
export const stack = new Stack<string>();