import { useRef, useState, useEffect } from "react";

const usePositions = (totlaHeight: number) => {
  const divRef = useRef<HTMLDivElement>(null);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [wrapperPosition, setWrapperPosition] = useState({
    pageTop: 0,
    pageLeft: 0,
  });
  const [inView, setInView] = useState(false);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
    measureWrapper();
  };

  const measureWrapper = () => {
    const el = divRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    setWrapperPosition({
      pageTop: rect.top + window.scrollY,
      pageLeft: rect.left + window.scrollX,
    });

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const partiallyVisible =
      rect.bottom > 0 && rect.right > 0 && rect.top < vh && rect.left < vw;

    setInView(partiallyVisible);
  };

  useEffect(() => {
    measureWrapper(); // initial
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", measureWrapper);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measureWrapper);
    };
  }, []);

  return {
    divRef,
    scrollPosition,
    wrapperPosition,
    inView,
  };
};

export default usePositions;
