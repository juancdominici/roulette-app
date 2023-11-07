import { useTranslation } from "react-i18next";
import ShareButton from "./ShareButton";

interface ButtonsProps {
  resetItemList: () => void;
  handleWheelClick: (e: any) => void;
}

const Buttons = ({ resetItemList, handleWheelClick }: ButtonsProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row items-center justify-between w-full my-3">
      <button
        className="font-bold py-2 px-2 pl-6 w-[30%] neobrutal"
        onClick={resetItemList}
      >
        {t("buttons.clear")}
      </button>
      <button
        className="font-bold py-2 px-2 pl-6 w-[30%] neobrutal"
        onClick={handleWheelClick}
      >
        {t("buttons.start")}
      </button>
      <ShareButton winnerSettled={false} />
    </div>
  );
};

export default Buttons;
