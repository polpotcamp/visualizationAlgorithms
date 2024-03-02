import React from "react";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import styles from "./sorting-page.module.css"
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
type TArr = {
  number: number;
  state: ElementStates;
};
export const SortingPage: React.FC = () => {
  const [isBubble, setIsBubble] = React.useState(false);
  const [arr, setArr] = React.useState<TArr[]>([]);
  function randomArr() {
    let maxLen = 5
    let minLen = 10
    let lenth = Math.round(Math.random() * (maxLen - minLen) + minLen)
    let arr: any = []
    for (let i = 0; i < lenth; i++) {
      let num = { number: Math.round(Math.random() * 100), state: ElementStates.Default }
      arr.push(num)
    }
    setArr(arr)
  }
  const Sort = (direction: string) => {
    if (!isBubble) {
      selectionSort(arr, direction)
    } else {
      bubbleSort(arr, direction)
    }
  }
  const selectionSort = async (arr: TArr[], direction: string): Promise<TArr[]> => {
    for (let i = 0; i < arr.length; i++) {
      let minIndex = i;
      arr[minIndex].state = ElementStates.Changing;
      for (let j = i + 1; j < arr.length; j++) {
        arr[j].state = ElementStates.Changing;
        setArr([...arr]);
        await new Promise<void>(resolve => setTimeout(resolve, 100));
        if (direction === 'asc') {
          if (arr[j].number < arr[minIndex].number) {
            minIndex = j;
          }
        } else if (direction === 'desc') {
          if (arr[j].number > arr[minIndex].number) {
            minIndex = j;
          }
        }
        arr[j].state = ElementStates.Default;
      }
      if (minIndex !== i) {
        arr[minIndex].state = ElementStates.Modified;
        arr[i].state = ElementStates.Default;
        let temp = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = temp;
      } else {
        arr[minIndex].state = ElementStates.Modified;
      }
      setArr([...arr]);
    }
    return arr
  };
  const bubbleSort = async (arr: TArr[], direction: string,): Promise<TArr[]> => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        if (arr[j + 1]) {
          arr[j + 1].state = ElementStates.Changing;
        }
        setArr([...arr]);
        await new Promise<void>(resolve => setTimeout(resolve, 500));
        if (direction === 'asc') {
          if (arr[j].number > arr[j + 1].number) {
            [arr[j].number, arr[j + 1].number] = [
              arr[j + 1].number,
              arr[j].number,
            ]
          }
        } else if (direction === 'desc') {
          if (arr[j].number < arr[j + 1].number) {
            [arr[j].number, arr[j + 1].number] = [
              arr[j + 1].number,
              arr[j].number,
            ];
          }
        }
        arr[j].state = ElementStates.Default;
        arr[arr.length - i - 1].state = ElementStates.Modified;
        setArr([...arr]);
      }
      arr[arr.length - 1].state = ElementStates.Modified;
      arr[0].state = ElementStates.Modified;
      setArr([...arr]);
    }
    return arr;
  };

  React.useEffect(() => {
    randomArr()
  }, [])
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
        <RadioInput checked={!isBubble} label="Выбор" name="type" onChange={() => setIsBubble(!isBubble)} extraClass={`${styles.radio1}`} />
        <RadioInput checked={isBubble} label="Пузырёк" name="type" onChange={() => setIsBubble(!isBubble)} extraClass={`${styles.radio2}`} />
        <Button text="По возростанию" sorting={Direction.Ascending} extraClass={`${styles.button1}`} onClick={() => Sort('asc')}></Button>
        <Button text="По убыванию" sorting={Direction.Descending} extraClass={`${styles.button2}`} onClick={() => Sort('desc')}></Button>
        <Button text="Новый массив" onClick={randomArr}></Button>
      </div>
      <div className={styles.flor}>
        {arr.map((elem, i) => {
          return <Column key={i} index={elem.number} state={elem.state} />;
        })}
      </div>
    </SolutionLayout>
  );
};
