import { useServices } from "@/domain/core/services";
import { useObservable } from "micro-observables";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ScrollToElement = ({
  children,
}: {
  children: React.ReactElement<any>;
}) => {
  const { scrollTo } = useParams<{ scrollTo: string }>();
  const { voteService } = useServices();
  const collections = useObservable(voteService.collections);
  const [hadScrolled, setHadScrolled] = useState(false);
  console.log({ scrollTo });

  useEffect(() => {
    const elementId = scrollTo;
    if (elementId && !hadScrolled) {
      const element = window.document.getElementById(elementId);
      console.log("element", element);
      if (!element) return;

      element.scrollIntoView({ behavior: "smooth" });

      // Add animation class
      element.classList.add("highlight-animation");
      setTimeout(() => {
        element.classList.remove("highlight-animation");
      }, 2000); // Adjust time based on your animation duration
      setHadScrolled(true);
    }
  }, [scrollTo, collections]);

  if (!collections) return null;

  return (
    <>
      <style>{`
        @keyframes highlight {
          0% { background-color: transparent; }
          50% { background-color: #8e8e8e; }
          100% { background-color: transparent; }
        }
        .highlight-animation {
          animation: highlight 2s ease-in-out;
        }
      `}</style>
      {children}
    </>
  );
};

export default ScrollToElement;
