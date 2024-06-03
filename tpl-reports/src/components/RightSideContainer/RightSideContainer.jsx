import React from "react";
import Box from "@mui/material/Box";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import DraggableCard from "./components/DraggableCard";
import DropableArea from "./components/DropableArea";

const RightSideContainer = ({
  allOpenTabs2,
  setAllOpenTAbs2,
  openTabData,
  allOpenTabs,
  setAllOpenTAbs,
  handleDropStatus,
  onDrop,
  selectedColumn,
  closeTab,
  tables,
  setTables,
  handleSelectColumn,
  respSelectedColumn,
}) => {

 

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
            <DropableArea onDrop={() => onDrop(0)} handleDropStatus={handleDropStatus}/> 
            {selectedColumn.map((tab, i) => (
              <Draggable
                draggableId={tab.column}
                index={i}
                key={tab.column+"-"+i}
              >
                {(provided) => (
                  <React.Fragment>
                  <DraggableCard
                    provided={provided}
                    tab={tab}
                    openTabData={openTabData}
                    closeTab={closeTab}
                    tables={tables}
                    setTables={setTables}
                    handleSelectColumn={handleSelectColumn}
                    respSelectedColumn={respSelectedColumn}
                  />
                   <DropableArea onDrop={() => onDrop(i + 1)} handleDropStatus={handleDropStatus} /> 
                  </React.Fragment>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <DropableArea onDrop={() => onDrop("end")} handleDropStatus={handleDropStatus} flexGrow={1}/> 
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default RightSideContainer;
