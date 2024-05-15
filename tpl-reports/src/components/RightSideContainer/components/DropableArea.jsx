import React, { useState } from "react";
import { Box } from "@mui/material";
import Grow from '@mui/material/Grow';

const DropableArea = ({ onDrop,handleDropStatus,flexGrow }) => {
  const [showDrop, setSHowDrop] = useState(false);

  return (
    <Box
    minWidth={showDrop ? "200px" : "4px"}
    flexDirection="column"
    zIndex={0}
    flexGrow={flexGrow?flexGrow:""}
    {...(showDrop ? { timeout: 5000 } : {})}
    
    sx={{
      borderRadius: 1,
      height: "100%",
      
    }}
    onDragEnter={() =>{ 
      handleDropStatus(true)
      setSHowDrop(true)
    }}
    onDragLeave={() => {
      handleDropStatus(false)
      setSHowDrop(false)
    }}
    onDrop={() => {
      onDrop();
      setSHowDrop(false);
    }}
    onDragOver={(e) => e.preventDefault()}
  >
   
 </Box>
  );
};

export default DropableArea;
