import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { AnimatePresence, motion } from "framer-motion";
import "./SpinningWheel.css";
import { COLORS } from "./constants";

const SpinningWheel = ({ rotation, itemList, handleWheelClick }: any) => {
  const wheelRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const wheelElement = d3.select(wheelRef.current);

    // Create the pie layout based on the section data
    const pie = d3.pie().value(1);

    // Create an arc generator for the itemList
    const arc = d3.arc().innerRadius(0).outerRadius(150);

    // Add the itemList to the wheel
    wheelElement
      .selectAll("path")
      .data(pie(itemList as any))
      .join("path")
      .attr("d", arc as any)
      .attr("stroke", "black")
      .attr("stroke-width", 4)
      .attr("cursor", "pointer")
      .attr("fill", (_, i) => COLORS[i % COLORS.length]);

    // Add the text to the wheel elements
    wheelElement
      .selectAll("text")
      .data(pie(itemList as any))
      .join("text")
      .attr(
        "transform",
        (d: any) =>
          `translate(${arc.centroid(d)}) rotate(${
            ((d.startAngle + d.endAngle) * 90) / Math.PI - 90
          }) translate(25, 5)`
      )
      .attr("text-anchor", "middle")
      .attr("font-size", "0.8em")
      .attr("font-weight", "bold")
      .attr("cursor", "pointer")
      .attr("pointer-events", "none")
      .text((d: any) => d.data.name);
  }, [itemList]);

  return (
    <AnimatePresence>
      {itemList.length > 0 && (
        <motion.div
          className="wheel-container"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{
            ease: "easeInOut",
          }}
        >
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: rotation }}
            transition={{
              ease: "easeInOut",
            }}
            onClick={handleWheelClick}
            className="wheel"
            viewBox="-200 -200 400 400"
            ref={wheelRef}
            style={{
              width: "100%",
              height: "100%",
              pointerEvents: rotation ? "none" : "all",
              transform: `rotate(${rotation}deg)`,
              transition: "transform 4s",
            }}
          ></motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpinningWheel;
