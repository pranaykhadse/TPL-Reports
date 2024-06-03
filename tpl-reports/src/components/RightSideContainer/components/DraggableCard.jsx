import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import CardHead from "./CardHead";
import ListBody from "./ListBody";

const DraggableCard = ({
  provided,
  tab,
  openTabData,
  closeTab,
  tables,
  setTables,
  handleSelectColumn,
  respSelectedColumn,
}) => {
  const [sum, setSum] = useState(false);
  const [count, setCount] = useState(false);



  


  const handleSumChange = (index, table, column) => {


    setSum(true);
    setCount(false);
   
    if (tables[index]["sum"][0].length > 0) {
      let tmpFilter = [...tables];
      let tempSelectArr = [...tables[index]["sum"][0]];

      if (
        tempSelectArr.filter(
          (item) =>
            item.split(":::")[0] == table && item.split(":::")[1] == column
        ).length > 0
      ) {
        let indexOfEl = tempSelectArr.indexOf(table + ":::" + column);
        tempSelectArr.splice(indexOfEl, 1);
      } else {
        tempSelectArr.push(table + ":::" + column);
      }
      tmpFilter[index]["sum"][0] = tempSelectArr;
      setTables(tmpFilter);
      handleSelectColumn();
      // buildQueryJSON();
    } else {
      let tmpFilter = [...tables];
      let tempSelectArr = [...tables[index]["sum"][0]];
      tempSelectArr.push(table + ":::" + column);

      tmpFilter[index]["sum"][0] = tempSelectArr;
      setTables(tmpFilter);
      handleSelectColumn();
      // buildQueryJSON();
    }
  };

  const handleCountChange = (index, table, column) => {
    setCount(true);
    setSum(false)
    if (tables[index]["count"][0].length > 0) {
      let tmpFilter = [...tables];
      let tempSelectArr = [...tables[index]["count"][0]];

      if (
        tempSelectArr.filter(
          (item) =>
            item.split(":::")[0] == table && item.split(":::")[1] == column
        ).length > 0
      ) {
        let indexOfEl = tempSelectArr.indexOf(table + ":::" + column);
        tempSelectArr.splice(indexOfEl, 1);
      } else {
        tempSelectArr.push(table + ":::" + column);
      }
      tmpFilter[index]["count"][0] = tempSelectArr;
      setTables(tmpFilter);
      handleSelectColumn();
      // buildQueryJSON();
    } else {
      let tmpFilter = [...tables];
      let tempSelectArr = [...tables[index]["count"][0]];
      tempSelectArr.push(table + ":::" + column);

      tmpFilter[index]["count"][0] = tempSelectArr;
      setTables(tmpFilter);
      handleSelectColumn();
      // buildQueryJSON();
    }
  };

  return (
    <Box
      width="auto"
      minWidth="fit-content"
      display="flex"
      flexDirection="column"
      sx={{
        borderRadius: 1,
        border: "1px solid grey",
        height: "fit-content",
      }}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <CardHead
        tab={tab}
        closeTab={closeTab}
        handleSumChange={handleSumChange}
        handleCountChange={handleCountChange}
      />
      <ListBody openTabData={openTabData} tab={tab} respSelectedColumn={respSelectedColumn} sum={sum} count={count}/>
    </Box>
  );
};

export default DraggableCard;
