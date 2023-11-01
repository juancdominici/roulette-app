import React from "react";
import { motion } from "framer-motion";

type ItemProps = {
  item: any;
  color: string;
  deleteItem: () => void;
};

export const Item = ({ item, color, deleteItem }: ItemProps) => {
  const animations = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 },
    transition: {
      ease: "easeInOut",
    },
  };

  return (
    <motion.div
      {...animations}
      layout
      className="flex flex-row items-center justify-between w-full"
    >
      <div
        className="flex flex-row items-center justify-between w-full neobrutal my-2"
        style={{
          backgroundColor: color,
        }}
      >
        <div className="border-black border-r-4 px-5 py-3 text-xl font-bold w-full">
          <h2
            title={item.name}
            className="w-48 overflow-ellipsis overflow-hidden whitespace-nowrap pl-2"
          >
            {item.name}
          </h2>
        </div>
        <button
          className="font-bold py-2 px-2 pl-6 w-[72px]"
          onClick={deleteItem}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10"
            style={{
              transform: "rotate(45deg)",
            }}
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default Item;
