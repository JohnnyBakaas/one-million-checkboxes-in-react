import { useEffect, useId, useRef, useState } from "react";
import styles from "./TheGoodStuff.module.scss";
import usePositions from "./hooks/usePositions";

const TheGoodStuff = () => {
  const childHeight = 30;

  const id = useId();

  const [data, setData] = useState<boolean[]>(new Array(1_000_000).fill(false));

  const totlaHeight = data.length * childHeight;
  const viewportHeight = window.innerHeight;

  const { divRef, scrollPosition, wrapperPosition, inView } =
    usePositions(totlaHeight);

  const shiftStart = Math.floor(scrollPosition / childHeight);
  const shiftEnd = Math.floor(viewportHeight / childHeight) + shiftStart + 10;

  return (
    <div
      className={styles["wrapper"]}
      style={{
        height: totlaHeight,
      }}
      id={id}
      ref={divRef}
    >
      <p style={{ position: "fixed", top: 0 }}>
        {scrollPosition}
        <br />
        <span>wrapperPos.pageTop: {Math.round(wrapperPosition.pageTop)}</span>
        <br />
        <span>wrapperPos.pageLeft: {wrapperPosition.pageLeft}</span>
      </p>

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
