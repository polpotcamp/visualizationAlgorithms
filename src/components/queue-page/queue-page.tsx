import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { queue } from "./class";
import { Circle } from "../ui/circle/circle";
import styles from "./queue-page.module.css";
import { ElementStates } from "../../types/element-states";

export const QueuePage: React.FC = () => {
	const [text, setText] = React.useState('');
	const [arr, setArr] = React.useState(queue.getQueue());
	const [tail, setTail] = React.useState(queue.getTail());
	const [head, setHead] = React.useState(queue.getHead());
	const [currIndex, setCurrIndex] = React.useState(-1);
	const [isDisabledAdd, setDisabledAdd] = React.useState(false)
	const [isDisabledDel, setDisabledDel] = React.useState(false)
	const add = async (elem: string) => {
		setDisabledAdd(true);
		queue.add(elem);
		setText('');
		setCurrIndex(tail % queue.getSize());
		await new Promise<void>(resolve => setTimeout(resolve, 1000));
		setTail(queue.getTail());
		setArr([...queue.getQueue()]);
		setCurrIndex(-1);
		setDisabledAdd(false);
	};

	const del = async () => {
		setDisabledDel(true);
		queue.del();
		setCurrIndex(queue.getHead() % queue.getSize() - 1);
		await new Promise<void>(resolve => setTimeout(resolve, 500));
		setArr([...queue.getQueue()]);
		setHead(queue.getHead());
		setCurrIndex(-1);
		setDisabledDel(false);
	};

	const clear = async () => {
		await new Promise<void>(resolve => setTimeout(resolve, 500));
		queue.clear();
		setArr([...queue.getQueue()]);
		setHead(queue.getHead());
		setTail(queue.getTail());
	};
	return (
		<SolutionLayout title="Очередь">
			<div className={styles.container}>
				<Input placeholder="Введите значение" extraClass={`${styles.input}`} maxLength={4} isLimitText={true} value={text} onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setText(evt.target.value)} />
				<Button text="Добавить" extraClass={`${styles.button1}`} onClick={() => add(text)} isLoader={isDisabledAdd} disabled={!text || tail === 7} />
				<Button text="Удалить" extraClass={`${styles.button2}`} onClick={del} isLoader={isDisabledDel} disabled={(!queue.getLength()) || head === 7} />
				<Button text="Очистить" onClick={() => clear()} disabled={head === 0 && tail === 0} />
			</div>
			<div className={`${styles.flor}`}>
				{arr.map((element, index) => {
					return (
						<Circle
							key={index} index={index} letter={element} state={index === currIndex ? ElementStates.Changing : ElementStates.Default}
							head={index === head && queue.isEmpty() === false ? 'head' : ''} tail={index === tail - 1 && queue.isEmpty() === false ? 'tail' : ''}
						/>
					);
				})}
			</div>
		</SolutionLayout>
	);
};
