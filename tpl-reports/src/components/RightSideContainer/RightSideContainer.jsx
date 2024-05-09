import React from "react";
import Box from "@mui/material/Box";


import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";


import DraggableCard from "./components/DraggableCard";



const RightSideContainer = ({ allOpenTabs, setAllOpenTAbs, openTabData }) => {
  const closeTab = (title, type) => {
    let arr = allOpenTabs;
    arr.splice(
      allOpenTabs.findIndex((a) => a.table_name === title && a.type === type),
      1
    );
    setAllOpenTAbs([...arr]);
  };

  const handleDragEnd = (results) => {
    let tempuser = [...allOpenTabs];
    if (results.destination) {
      let [selectedRow] = tempuser.splice(results.source.index, 1);
      tempuser.splice(results.destination.index, 0, selectedRow);
    }
    setAllOpenTAbs(tempuser);
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
            sx={{ flexGrow: 1, height: "100%", overflowX: "auto", }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {allOpenTabs.map((tab, i) => (
              <Draggable draggableId={tab.type} index={i} key={tab.type}>
                {(provided) => (
                  <DraggableCard provided={provided} tab={tab} openTabData={openTabData} closeTab={closeTab}/>
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
