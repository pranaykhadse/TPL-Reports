import React from "react";
import Box from "@mui/material/Box";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import DraggableCard from "./components/DraggableCard";

const RightSideContainer = ({ allOpenTabs2, setAllOpenTAbs2, openTabData,allOpenTabs,setAllOpenTAbs }) => {
  const closeTab = (title, type) => {
    let arr = allOpenTabs;
    arr.splice(
      allOpenTabs.findIndex((a) => a.table_name === title && a.type === type),
      1
    );
    setAllOpenTAbs([...arr]);

    let arr2 = allOpenTabs2;
    arr2.splice(
      allOpenTabs2.findIndex((a) => a.data.table_name === title && a.data.type === type),
      1
    );
    setAllOpenTAbs2([...arr2]);
  };

  const handleDragEnd = (results) => {
    let tempuser = [...allOpenTabs2];
    if (results.destination) {
      let [selectedRow] = tempuser.splice(results.source.index, 1);
      tempuser.splice(results.destination.index, 0, selectedRow);
    }
    setAllOpenTAbs2(tempuser);
  };


  return (
    <DragDropContext onDragEnd={(results) => handleDragEnd(results)}>
      <Droppable droppableId="Box-1" direction="horizontal">
        {(provided) => (
          <Box
            display="flex"
            gap={0}
            px={0.5}
            flexDirection="row"
            sx={{ flexGrow: 1, height: "100%", overflowX: "auto" }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {allOpenTabs2.map((tab, i) => (
              <Draggable
                draggableId={tab.data.type}
                index={i}
                key={tab.data.type}
              >
               
                {(provided) => (
                  <DraggableCard
                    provided={provided}
                    tab={tab}
                    openTabData={openTabData}
                    closeTab={closeTab}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default RightSideContainer;
