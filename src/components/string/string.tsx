import React from "react";
import styles from './string.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
export const StringComponent: React.FC = () => {
  const [text, setText] = React.useState<string>('')
  const [isLoader, setIsLoader] = React.useState<boolean>(false)
  const [count, setCount] = React.useState(0);
  const [arr, setArr] = React.useState<Array<string>>([])
  function CreatedCircles(element: string, i: number) {
    if (i < count || i > arr.length - 1 - count) {
      return <Circle key={i} letter={element} index={i} state={ElementStates.Modified} />
    }
    if (i === count || i === arr.length - 1 - count) {
      return <Circle key={i} letter={element} index={i} state={ElementStates.Changing} />
    }
    return <Circle key={i} letter={element} index={i} state={ElementStates.Default} />
  }
  const reverseString = async (string: string) => {
    setIsLoader(true)
    let arr = string.split('')
    setArr(arr)
    setCount(0)
    await new Promise<void>(resolve => setTimeout(resolve, 1000));
    let one = 0
    let two = arr.length - 1
    while (one <= two) {
      let temp = arr[one];
      arr[one] = arr[two];
      arr[two] = temp;
      one++
      two--
      setCount(prevcount => prevcount + 1)
      setArr(arr)
      await new Promise<void>(resolve => setTimeout(resolve, 1000));
    }
    setIsLoader(false)
  }
  return (
    <SolutionLayout title="Строка">
      <div className={`${styles.container}`}>
        <Input maxLength={11} isLimitText={true} extraClass={`${styles.input}`} onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setText(evt.target.value)} ></Input>
        <Button text="Развернуть" extraClass={`${styles.button}`} onClick={() => reverseString(text)} isLoader={isLoader}></Button>
      </div>
      <div className={`${styles.letters}`}>
        {(arr.length > 0) ?
          arr.map((element: string, i: number) => (
            CreatedCircles(element, i)
          ))
          : null
        }</div>
    </SolutionLayout>
  );
};
