import React from "react";
import Box from "@mui/material/Box";



import CardHead from "./CardHead";
import ListBody from "./ListBody";

const DraggableCard = ({ provided, tab, openTabData, closeTab }) => {

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
      <CardHead tab={tab} closeTab={closeTab}/>
      <ListBody openTabData={openTabData} tab={tab}/>
    </Box>
  );
};

export default DraggableCard;
