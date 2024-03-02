import React from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css"
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { stack } from "./class";
export const StackPage: React.FC = () => {
  const [text, setText] = React.useState('');
  const [arr, setArr] = React.useState<string[]>([]);
  const [count, setCount] = React.useState(0);
  const [isDisabledAdd, setDisabledAdd] = React.useState(false)
  const [isDisabledDel, setDisabledDel] = React.useState(false)
  const add = async (value: string) => {
    setText('');
    setDisabledAdd(true);
    stack.push(value);
    setArr(stack.getStack());
    await new Promise<void>(resolve => setTimeout(resolve, 500));
    setCount(count + 1);
    setDisabledAdd(false);
  };

  const del = async () => {
    setDisabledDel(true);
    setCount(count -1);
    await new Promise<void>(resolve => setTimeout(resolve, 500));
    stack.pop();
    setArr([...stack.getStack()]);
    setDisabledDel(false);
  };

  const clear = async () => {
    stack.clear();
    await new Promise<void>(resolve => setTimeout(resolve, 500));
    setArr(stack.getStack());
    setCount(0);
  };
  return (
    <SolutionLayout title="Стек">
      <div className={`${styles.container}`}>
        <Input extraClass={`${styles.input}`} maxLength={4} isLimitText={true} value={text} onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setText(evt.target.value)} />
        <Button text="Добавить" extraClass={`${styles.button1}`} onClick={() => add(text)} isLoader={isDisabledAdd} disabled={!text} />
        <Button text="Удалить" extraClass={`${styles.button2}`} onClick={del} isLoader={isDisabledDel} disabled={stack.getSize() < 1 || isDisabledAdd} />
        <Button text="Очистить" onClick={clear} disabled={stack.getSize() < 1 || isDisabledAdd || isDisabledAdd} />
      </div>
      <div className={`${styles.flor}`}>
        {arr.map((elem, i) => {
          return (
            <Circle key={i} letter={elem} index={i} state={i === count ? ElementStates.Changing : ElementStates.Default}
             head={stack.getTopIndex() === i ? 'top' : ''}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
