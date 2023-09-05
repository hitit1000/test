import React from "react";
import { PieChart } from "react-minimal-pie-chart";

type option = { centerValue?: string };
type propsType = { value: number; option?: option };

const PieDonut = ({ value, option }: propsType) => {
  const newValue = value;
  let bg_color = "#334171";
  let color = "#000000";
  if (newValue > 70) {
    color = "#599de1";
  } else if (newValue > 40) {
    color = "#e3ca51";
  } else {
    color = "#ff5555";
  }
  const centerValue = () => {
    let returnValue = `${newValue}%`;
    if (option !== undefined) {
      if (option.centerValue !== undefined) returnValue = option.centerValue;
    }
    return returnValue;
  };
  return (
    <>
      <PieChart
        data={[{ value: newValue, label: centerValue(), color: color, name: "pie" }]}
        reveal={newValue}
        lineWidth={40}
        startAngle={270}
        background={bg_color}
        lengthAngle={360}
        rounded
        animate
        label={({ dataEntry }) => `${dataEntry.label}`}
        labelStyle={{ fontSize: "13px", fill: "#ffffff", fontWeight: "500" }}
        labelPosition={0}
        viewBoxSize={[100, 100]}
      />
    </>
  );
};

export default PieDonut;
