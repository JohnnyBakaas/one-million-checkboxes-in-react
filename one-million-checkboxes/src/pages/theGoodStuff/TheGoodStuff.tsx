import { useEffect, useId, useState } from "react";
import styles from "./TheGoodStuff.module.scss";
import usePositions from "./hooks/usePositions";

// Some may say that this is bad to have in the same file,
// I like to call it GitHub-friendly :)
// Probably wouldn’t do this in prod though...

const serializeData = (data: boolean[]) => {
  // Don’t do this... it’s a bad idea, but it’s good enough for
  // a quick “for fun” project.
  // Storing this in character codes would be way more storage-efficient.
  // Also IndexedDB, a real DB, or literally any form of optimization :)
  let str = "";

  for (let i = 0; i < data.length; i++) {
    str += data[i] ? 1 : 0;
  }

  return str;
};

const deserializeData = (data: string | null) => {
  if (!data) return new Array(1_000_000).fill(false);
  const arr: boolean[] = new Array(data.length);

  for (let i = 0; i < data.length; i++) {
    arr[i] = !!Number(data[i]);
  }

  return arr;
};

const TheGoodStuff = () => {
  const childHeight = 40;
  const elementPadding = 10;

  const id = useId();

  const [data, setData] = useState<boolean[]>(
    deserializeData(localStorage.getItem("milli"))
  );

  useEffect(() => {
    const stringi = serializeData(data);
    localStorage.setItem("milli", stringi);
  }, [data]);

  const totlaHeight = data.length * childHeight;
  const viewportHeight = window.innerHeight;

  const { divRef, scrollPosition } = usePositions();

  const shiftStart = Math.max(
    Math.floor(scrollPosition / childHeight) - elementPadding,
    0
  );
  const shiftEnd =
    Math.floor(viewportHeight / childHeight) + shiftStart + elementPadding * 2;

  return (
    <div
      className={styles["wrapper"]}
      style={{
        height: totlaHeight,
      }}
      id={id}
      ref={divRef}
    >
      <div
        style={{
          height: shiftStart * childHeight,
        }}
      ></div>
      {data.slice(shiftStart, shiftEnd).map((d, index) => (
        <Row
          key={index + shiftStart}
          height={childHeight}
          value={d}
          setData={setData}
          index={index + shiftStart}
        />
      ))}
    </div>
  );
};

export default TheGoodStuff;

// "GitHub-friendly" :)
type RowProps = {
  height: number;
  value: boolean;
  setData: React.Dispatch<React.SetStateAction<boolean[]>>;
  index: number;
};

const Row = ({ height, value, setData, index }: RowProps) => {
  return (
    <label
      className={[styles["row"], index % 2 && styles["odd"]]
        .filter(Boolean)
        .join(" ")}
      style={{ height }}
    >
      <input
        type="checkbox"
        checked={value}
        onChange={() =>
          setData((pre) => pre.map((b, i) => (index === i ? !b : b)))
        }
      />{" "}
      <span>{index + 1}</span>
    </label>
  );
};
