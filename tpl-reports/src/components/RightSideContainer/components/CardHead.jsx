import React from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import ControlCameraSharpIcon from "@mui/icons-material/ControlCameraSharp";
import { TextField, Typography } from "@mui/material";
import ModeIcon from "@mui/icons-material/Mode";

const CardHead = ({tab, closeTab}) => {
  return (
    <Box
      height={145}
      display="flex"
      flexDirection="column"
      px={1.5}
      pt={1}
      sx={{
        width: "auto",
        borderRadius: 1,
        border: "1px solid grey",
      }}
    >
      <Box
        height={30}
        display="flex"
        sx={{
          width: "100%",
          borderRadius: 1,
          justifyContent: "space-between",
        }}
      >
        <ControlCameraSharpIcon />
        <Typography
          variant="p"
          component="p"
          sx={{
            color: "gray",
          }}
        >
          {tab.show_type.name} : {tab.show_type.showType}
        </Typography>

        <CloseIcon
          sx={{
            cursor: "pointer",
          }}
          onClick={() => closeTab(tab.data.table_name, tab.data.type)}
        />
      </Box>
      <Box
        height={30}
        display="flex"
        py={2}
        sx={{
          width: "100%",
          borderRadius: 1,
        }}
      >
        <Typography variant="p" component="p" pr={1}>
          {tab.show_type.showType}
        </Typography>
        <ModeIcon
          sx={{
            height: "20px",
          }}
        />
      </Box>
      <Box>
        <TextField
          id="outlined-basic"
          variant="outlined"
          sx={{
            width: "100%",
            "& .MuiInputBase-input": {
              padding: "5px",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default CardHead;
