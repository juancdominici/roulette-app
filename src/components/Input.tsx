import { useState } from "react";
import { useTranslation } from "react-i18next";

interface InputProps {
  itemList: any[];
  setItemList: (itemList: any) => void;
}

const Input = ({ itemList, setItemList }: InputProps) => {
  const { t } = useTranslation();
  const [newItemName, setNewItemName] = useState("");

  return (
    <div className="flex flex-row items-center justify-center w-full neobrutal my-5">
      <input
        className="indent-2 border-black border-r-4 bg-white h-14 px-5 text-xl focus:outline-none w-full"
        type="text"
        placeholder={t("common.inputPlaceholder")}
        value={newItemName}
        maxLength={25}
        onChange={(e) => setNewItemName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (!newItemName) return;
            setItemList([
              ...itemList,
              {
                id: crypto.randomUUID(),
                name: newItemName,
              },
            ]);
            setNewItemName("");
          }
        }}
      />
      <button
        className="font-bold py-2 px-2 pl-6 max-w-1/12"
        onClick={() => {
          if (!newItemName) return;
          setItemList([
            ...itemList,
            {
              id: crypto.randomUUID(),
              name: newItemName,
            },
          ]);
          setNewItemName("");
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
        </svg>
      </button>
    </div>
  );
};

export default Input;
