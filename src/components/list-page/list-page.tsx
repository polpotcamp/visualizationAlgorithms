import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { LinkedList } from './class';
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import styles from './list-page.module.css'
import { list } from "./class";
interface ISmallCircle {
	value: string;
	type: 'top' | 'bottom';
}

interface IListArrItem {
	value: string;
	smallCircle: ISmallCircle | undefined;
	state: ElementStates;
	head: boolean;
	tail: boolean;

}

interface IStateLoader {
	addHead: boolean;
	addTail: boolean;
	delHead: boolean;
	delTail: boolean;
	addByIndex: boolean;
	delByIndex: boolean;
}

export const ListPage: React.FC = () => {
	const [text, setText] = React.useState('');
	const [index, setIndex] = React.useState(-1);
	const [arr, setArr] = React.useState(createList(list));
	const [disabled, setDisabled] = React.useState(false);
	const [isLoader, setIsLoader] = React.useState<IStateLoader>({
		addHead: false,
		addTail: false,
		delHead: false,
		delTail: false,
		addByIndex: false,
		delByIndex: false,
	});
	function createList(list: LinkedList<string>): IListArrItem[] {
		let arr = list.getArr().map(elem => ({ value: elem, state: ElementStates.Default, smallCircle: undefined, tail: false, head: false }));
		arr[0].head = true;
		arr[arr.length - 1].tail = true
		return arr
	}
	const addHead = async () => {
		setText('');
		setIsLoader({ ...isLoader, addHead: true });
		setDisabled(true);
		arr[0].head = false
		list.addToHead(text);
		arr[0].smallCircle = { value: text, type: 'top' };
		await new Promise<void>(resolve => setTimeout(resolve, 500));
		arr[0].smallCircle = undefined;
		arr.unshift({ ...arr[0], value: text, state: ElementStates.Modified });
		setArr([...arr]);
		await new Promise<void>(resolve => setTimeout(resolve, 500));
		arr[0].state = ElementStates.Default;
		arr[0].head = true
		setIsLoader({ ...isLoader, addHead: false });
		setDisabled(false);
	};

	const addTail = async () => {
		setText('');
		setIsLoader({ ...isLoader, addTail: true });
		setDisabled(true);
		list.addToTail(text);
		arr[arr.length - 1].tail = false
		arr[arr.length - 1] = { ...arr[arr.length - 1], smallCircle: { value: text, type: 'top' } };
		await new Promise<void>(resolve => setTimeout(resolve, 500));
		arr[arr.length - 1] = { ...arr[arr.length - 1], smallCircle: undefined };
		arr.push({ value: text, state: ElementStates.Modified, smallCircle: undefined, head: false, tail: true });
		setArr([...arr]);
		await new Promise<void>(resolve => setTimeout(resolve, 500));
		arr[arr.length - 1].state = ElementStates.Default;
		setIsLoader({ ...isLoader, addTail: false });
		setDisabled(false);
	};

	const delHead = async () => {
		setIsLoader({ ...isLoader, delHead: true });
		setDisabled(true);
		arr[0].head = false;
		arr[0] = { ...arr[0], value: '', smallCircle: { value: arr[0].value, type: 'bottom' } };
		list.deleteHead();
		await new Promise<void>(resolve => setTimeout(resolve, 500));
		arr.shift();
		arr[0].head = true;
		setArr([...arr]);
		setIsLoader({ ...isLoader, delHead: false });
		setDisabled(false);
	};

	const delTail = async () => {
		setIsLoader({ ...isLoader, delTail: true });
		setDisabled(true);
		arr[arr.length - 1].tail = false
		arr[arr.length - 1] = { ...arr[arr.length - 1], value: '', smallCircle: { value: arr[arr.length - 1].value, type: 'bottom' } };
		list.deleteTail();
		await new Promise<void>(resolve => setTimeout(resolve, 500));
		arr.pop();
		arr[arr.length - 1].tail = true
		setArr([...arr]);
		setIsLoader({ ...isLoader, delTail: false });
		setDisabled(false);
	};

	const addIndex = async () => {
		setIsLoader({ ...isLoader, addByIndex: true });
		setDisabled(true);
		const pointer = index;
		if (pointer === list.getSize()) {
			setIndex(-1);
			addTail();
			return;
		}
		list.addIndex(text, pointer);
		for (let i = 0; i <= pointer; i++) {
			await new Promise<void>(resolve => setTimeout(resolve, 500));
			if (i > 0) {
				arr[i - 1] = { ...arr[i - 1], smallCircle: undefined };
			}
			arr[i] = { ...arr[i], state: ElementStates.Changing, smallCircle: { value: text, type: 'top' }, head: false };
			setArr([...arr]);
		}
		await new Promise<void>(resolve => setTimeout(resolve, 500));
		arr[pointer] = { ...arr[pointer], state: ElementStates.Default, smallCircle: undefined };
		arr.splice(pointer, 0, { value: text, state: ElementStates.Modified, smallCircle: undefined, tail: false, head: false });
		setArr([...arr]);
		arr[pointer].state = ElementStates.Default;
		arr.forEach(elem => {
			elem.state = ElementStates.Default;
		});
		await new Promise<void>(resolve => setTimeout(resolve, 500));
		arr[0].head = true;
		setArr([...arr]);
		setText('');
		setIndex(-1);
		setIsLoader({ ...isLoader, addByIndex: false });
		setDisabled(false);
	};

	const deleteIndex = async () => {
		setIsLoader({ ...isLoader, delByIndex: true });
		setDisabled(true);
		const pointer = index;
		list.deleteIndex(pointer);
		for (let i = 0; i <= pointer; i++) {
			arr[i] = { ...arr[i], state: ElementStates.Changing, tail: false };
			await new Promise<void>(resolve => setTimeout(resolve, 500));
			setArr([...arr]);
		}
		arr[pointer] = { ...arr[pointer], value: '', smallCircle: { value: arr[pointer].value, type: 'bottom' } };
		await new Promise<void>(resolve => setTimeout(resolve, 500));
		setArr([...arr]);
		arr.splice(pointer, 1);
		if (arr[pointer - 1] !== undefined) {
			arr[pointer - 1] = { ...arr[pointer - 1], value: arr[pointer - 1].value, state: ElementStates.Modified, smallCircle: undefined };
			await new Promise<void>(resolve => setTimeout(resolve, 500));
		}
		arr[arr.length - 1].tail = true
		setArr([...arr]);
		arr.forEach(elem => {
			elem.state = ElementStates.Default;
		});
		await new Promise<void>(resolve => setTimeout(resolve, 500));
		setIndex(-1);
		setIsLoader({ ...isLoader, delByIndex: false });
		setDisabled(false);
	};
	return (
		<SolutionLayout title="Связный список">
			<div className={styles.container}>
				<Input extraClass={styles.input} maxLength={4} value={text} onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setText(evt.target.value)} placeholder='Введите текст' isLimitText={true} disabled={disabled}></Input>
				<Button text='Добавить в head' extraClass={styles.buttonTop} onClick={addHead} disabled={!text || disabled || list.getSize() >= 8} isLoader={isLoader.addHead} ></Button>
				<Button text='Добавить в tail' extraClass={styles.buttonTop} onClick={addTail} disabled={!text || disabled || list.getSize() >= 8} isLoader={isLoader.addTail}></Button>
				<Button text='Удалить из head' extraClass={styles.buttonTop} onClick={delHead} disabled={list.getSize() <= 1 || disabled} isLoader={isLoader.delHead}></Button>
				<Button text='Удалить из tail' onClick={delTail} disabled={list.getSize() <= 1 || disabled} isLoader={isLoader.delTail}></Button>
			</div>
			<div className={styles.containerBot}>
				<Input placeholder='Введите индекс' type="number" extraClass={styles.input} value={index >= 0 ? index : ''} onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setIndex(parseInt(evt.target.value))}
					disabled={disabled} maxLength={1} max={8}></Input>
				<Button text='Добавить по индексу' extraClass={styles.buttonBot} onClick={addIndex}
					disabled={index < 0 || index > list.getSize() || text.length === 0 || disabled || Number.isNaN(index)}
					isLoader={isLoader.addByIndex}></Button>
				<Button text='Удалить по индексу' extraClass={styles.buttonBot} onClick={deleteIndex}
					disabled={index < 0 || list.isEmpty() || index >= list.getSize() || Number.isNaN(index) || disabled}
					isLoader={isLoader.delByIndex}> </Button>
			</div>
			<div className={styles.flor}>
				{arr.map((element, i) => {
					return (
						<div key={i} className={styles.circles}>
							<Circle letter={element.value} index={i} head={element?.head ? 'head' : ''/*i === 0 ? 'head' : ''*/}
								tail={element?.tail ? 'tail' : ''/*i === list.getSize() - 1 ? 'tail' : ''*/} state={element.state} />
							{i < arr.length - 1 && <ArrowIcon fill={'#0032FF'} />}
							{element.smallCircle && (
								<div className={element.smallCircle.type === 'top' ? styles.smallTopCircle : styles.smallBottomCircle}>
									<Circle letter={element.smallCircle.value} isSmall={true} state={ElementStates.Changing} />
								</div>
							)}
						</div>
					);
				})}
			</div>
		</SolutionLayout>
	);
};
