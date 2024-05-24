import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { SaveReports } from "../../../../global-constant/SaveReport";

const ReportNavBar = ({handleSavedReport}) => {

  return (
    <Box
      display="flex"
      flexDirection="row"
      mb={1}
      mx={8}
      
      gap={1}
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "#cfd1d3",
      }}
    >
     <Box  display="flex"
      flexDirection="row"
      gap={1}
      p="14px"
      sx={{
        overflowX: "auto",
        
      }}
      
      >
     {SaveReports.map((item, i) => (
        <Box
          key={i}
          px="8px"
          py="4px"
          onClick={() => handleSavedReport(item)}
          sx={{
            alignItems: "center",
            bgcolor: "#ffffff",
            borderRadius: 1,
            color: "gray",
            minWidth: "fit-content",
            cursor: "pointer",
          }}
        >
          <Typography variant="p" component="p">
            {item.name}
          </Typography>
        </Box>
      ))}
     </Box>
       <Box
          display="flex"
          flexDirection="row"
          gap={1}
          pr={1}
          sx={{
            alignItems: "center",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Search Report Name"
            variant="outlined"
            size="small"
            sx={{
              width: "auto",
              minWidth: "180px",
              borderRadius: 1,
              bgcolor: "#FFFFFF",
            }}
          />
           <Button
          variant="contained"
        >
          Search
        </Button>
        </Box>
    </Box>
  );
};

export default ReportNavBar;
