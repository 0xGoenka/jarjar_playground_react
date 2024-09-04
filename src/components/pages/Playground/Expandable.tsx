import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const ExpandableText = ({ text = "", maxLength = 40 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded ? text : text.slice(0, maxLength) + "...";

  return (
    <div className="">
      <p className="text-gray-700">{displayText}</p>
      {text.length > maxLength && (
        <button
          onClick={toggleExpand}
          className="mt-2 flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200"
        >
          {isExpanded ? (
            <>
              <span>Show less</span>
              <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              <span>Read more</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ExpandableText;
