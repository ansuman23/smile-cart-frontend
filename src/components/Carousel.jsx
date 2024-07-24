import { useEffect, useState, useRef } from "react";

import { Left, Right } from "neetoicons";
import { Button } from "neetoui";

import { imageUrls } from "./constants";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalTime = useRef(null);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % imageUrls.length;
    setCurrentIndex(nextIndex);
  };

  const handlePrevious = () => {
    const previousIndex =
      (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    setCurrentIndex(previousIndex);
  };

  useEffect(() => {
    intervalTime.current = setInterval(handleNext, 3000);

    return () => clearInterval(intervalTime.current);
  });

  return (
    <div className="flex items-center">
      <Button
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Left}
        style="text"
        onClick={handlePrevious}
      />
      <img
        className="max-w-56 h-56 max-h-56 w-56"
        src={imageUrls[currentIndex]}
      />
      <Button
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Right}
        style="text"
        onClick={handleNext}
      />
    </div>
  );
};

export default Carousel;
