import { useEffect, useState } from "react";
import { ItemList } from "./components/ItemList";
import { AnimatePresence, motion } from "framer-motion";
import Confetti from "react-confetti";
import Buttons from "./components/Buttons";
import Input from "./components/Input";
import SpinningWheel from "./components/SpinningWheel";

function App() {
  const [itemList, setItemList] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);
  const [rotation, setRotation] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [winner, setWinner] = useState<any>(null);

  const handleReset = () => {
    setItemList([]);
    setWinner(null);
  };

  const handleSpinAgain = () => {
    setWinner(null);
  };

  const handleSpinWithoutWinner = () => {
    const filteredItemList = itemList.filter((item) => item.id !== winner.id);
    setItemList([...filteredItemList]);
    setWinner(null);
  };

  const handleWinner = (item: any) => {
    setWinner(item);
  };

  const resetItemList = () => {
    setItemList([]);
  };

  const handleWheelClick = () => {
    // If the wheel is already rotating, do nothing
    if (isRotating) return;
    setIsRotating(true);

    const segmentAngle = 360 / itemList.length;
    const guessItemIndex = Math.floor(Math.random() * itemList.length);
    const winnerAngle = +(
      360 * 5 +
      (itemList.length - 1 - guessItemIndex) * segmentAngle +
      Math.random() * segmentAngle
    );

    setRotation(winnerAngle);

    setTimeout(() => {
      handleWinner(itemList[guessItemIndex]);
      setIsRotating(false);
    }, 6000);
  };

  // If the wheel is not rotating, reset the rotation
  useEffect(() => {
    if (!isRotating) {
      setRotation(0);
    }
  }, [isRotating]);

  return (
    <div
      className="container mx-auto flex justify-center overflow-hidden"
      style={{
        height: winner ? "100vh" : "auto",
        display: winner ? "flex" : "",
        justifyContent: winner ? "center" : "",
        alignItems: winner ? "center" : "",
      }}
    >
      {winner && (
        <Confetti
          width={document.body.scrollWidth}
          height={document.body.scrollHeight}
        />
      )}
      {winner ? (
        <div className="grid gap-4 grid-cols-1 w-full">
          <div className="bg-transparent flex flex-col justify-between">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-4xl font-bold">{winner.name}</h1>
              <h1 className="text-2xl font-bold">is the winner!</h1>
            </div>
            <div className="flex justify-center items-center gap-5 flex-wrap">
              <button
                className="bg-white text-black font-bold px-4 mt-4 neobrutal"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                className="bg-white text-black font-bold px-4 mt-4 neobrutal"
                onClick={handleSpinAgain}
              >
                Spin Again
              </button>
              <button
                className="bg-white text-black font-bold px-4 mt-4 neobrutal"
                onClick={handleSpinWithoutWinner}
              >
                Spin Without Winner
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 w-full">
          <div
            className={
              isRotating
                ? "bg-transparent hidden lg:flex flex-col justify-between"
                : "bg-transparent flex flex-col justify-between"
            }
          >
            <Input itemList={itemList} setItemList={setItemList} />
            <AnimatePresence>
              {itemList.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{
                    ease: "easeInOut",
                  }}
                >
                  <ItemList itemList={itemList} setItemList={setItemList} />
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {itemList.length > 0 && (
                <motion.div
                  initial={{
                    position: "relative",
                    bottom: -100,
                    left: 0,
                    right: 0,
                  }}
                  animate={{
                    position: "relative",
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }}
                  exit={{
                    position: "relative",
                    bottom: -100,
                    left: 0,
                    right: 0,
                  }}
                  transition={{
                    ease: "easeInOut",
                  }}
                >
                  <Buttons
                    resetItemList={resetItemList}
                    handleWheelClick={handleWheelClick}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div
            className={
              isRotating
                ? "bg-transparent flex flex-col justify-between"
                : "bg-transparent hidden lg:flex flex-col justify-between"
            }
          >
            <SpinningWheel
              rotation={rotation}
              itemList={itemList}
              handleWheelClick={handleWheelClick}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
