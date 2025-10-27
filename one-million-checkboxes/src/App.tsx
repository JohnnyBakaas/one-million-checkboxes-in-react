import { useRef, useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TheGoodStuff from "./pages/theGoodStuff/TheGoodStuff";

function Row({
  index,
  checked,
  onToggle,
}: {
  index: number;
  checked: boolean;
  onToggle: (i: number, v: boolean) => void;
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      setInView(!!entry?.isIntersecting);
    };

    const observer = new IntersectionObserver(callback, {
      root: document.querySelector("#scrollArea"),
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  if (!inView) return <div ref={ref}></div>;

  return (
    <div ref={ref}>
      <p>{index}</p>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onToggle(index, e.currentTarget.checked)}
      />
    </div>
  );
}

function App() {
  return (
    <>
      <div style={{ padding: "100vh" }}></div>
      <TheGoodStuff />
    </>
  );
}

export default App;
