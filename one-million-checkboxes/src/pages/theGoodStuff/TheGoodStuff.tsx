import { useEffect, useId, useRef, useState } from "react";
import styles from "./TheGoodStuff.module.scss";

const TheGoodStuff = () => {
  const height = 40;

  const id = useId();

  const [data, setData] = useState<boolean[]>(new Array(1_000).fill(false));

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const callback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      console.log(entries);
      console.log(observer);
      const entry = entries[0];
    };

    const observer = new IntersectionObserver(callback, {
      root: document.getElementById(id),
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles["wrapper"]} id={id}>
      <p style={{ position: "fixed", top: 0 }}>{scrollPosition}</p>
      {data.map((d, index) => (
        <Row
          key={index}
          height={height}
          value={d}
          setData={setData}
          index={index}
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
    <label className={styles["row"]} style={{ height }}>
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
