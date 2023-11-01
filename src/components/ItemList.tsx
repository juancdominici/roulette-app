import React from "react";
import { AnimatePresence } from "framer-motion";
import Item from "./Item";
import { COLORS } from "./constants";

type ItemListProps = {
  itemList: any[];
  setItemList: (itemList: any) => void;
};

export const ItemList = ({ itemList, setItemList }: ItemListProps) => {
  const handleDeleteItem = (id: any) => {
    setItemList([...itemList].filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-[73vh] max-h-[73vh] overflow-y-auto pr-5 m-2 mr-[-15px] overflow-x-hidden">
      <AnimatePresence>
        {itemList.map((item, index) => (
          <Item
            key={item.id}
            item={item}
            color={COLORS[index % COLORS.length]}
            deleteItem={() => handleDeleteItem(item.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
