import React from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css"
import { Circle } from "../ui/circle/circle"; export const FibonacciPage: React.FC = () => {
  const [arr, setArr] = React.useState<Array<string>>([]);
  const [num, setNum] = React.useState<string>('')
  const [isLoader, setIsLoader] = React.useState<boolean>(false)
  const fibonacci = (num: number) => {
    const arr = [1, 1];
    for (let i = 0; i < num - 1; i++) {
      arr.push(arr[i] + arr[i + 1]);
    }
    return arr;
  }
  const printFibonacciArr = async (num: string) => {
    setIsLoader(true);
    setArr([]);
    const fibonacciArr = fibonacci(Number(num));
    for (let i = 0; i < fibonacciArr.length; i++) {
      setArr(prev => [...prev, String(fibonacciArr[i])]);
      await new Promise<void>(resolve => setTimeout(resolve, 500));
    }
    setIsLoader(false);
  };
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={`${styles.container}`}>
        <Input max={19} maxLength={2} type="number" extraClass={`${styles.input}`} isLimitText={true} onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setNum(evt.target.value)}  ></Input>
        <Button text="Рассчитать" extraClass={`${styles.button}`} onClick={() => printFibonacciArr(num)} disabled={(Number(num) < 20) ? false : true} isLoader={isLoader}></Button>
      </div>
      <div className={`${styles.letters}`}>
        {(arr.length > 1) ?
          arr.map((element ,i) => (
            <Circle letter={element} key={i} tail={String(i)} />
          ))
          : null
        }</div>
    </SolutionLayout>
  );
};
