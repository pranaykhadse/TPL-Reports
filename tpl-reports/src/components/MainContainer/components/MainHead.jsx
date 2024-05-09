import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

import MuiTextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";


const MainHead = ({setStartDate,setEnd_date}) => { 



  const TextField = React.forwardRef((props, ref) => (
    <MuiTextField
      {...props}
      ref={ref}
      size="small"
      placeholder="------"
      sx={{
        width: "auto",
        borderRadius: 1,
        bgcolor: "#FFFFFF",
      }}
    />
  ));

  return (
    <Box
      display="flex"
      flexDirection="row"
      mb={2}
      mx={8}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "#cfd1d3",
      }}
    >
      <Box
        mx={4}
        display="flex"
        flexDirection="row"
        gap={3}
        sx={{
          alignItems: "center",
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          sx={{
            alignItems: "center",
          }}
        >
          <Typography variant="p" component="p" pr={1}>
            From
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DemoContainer components={["DatePicker"]} >
              <DatePicker slots={{ textField: TextField }}   format="DD-MM-YYYY" onChange={(e) => `${e.$y}`.length == 4 && setStartDate(dayjs(e.$d).format('DD/MM/YYYY'))}/>
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          sx={{
            alignItems: "center",
          }}
        >
          <Typography variant="p" component="p" pr={1}>
            To
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker slots={{ textField: TextField }} format="DD-MM-YYYY" onChange={(e) => `${e.$y}`.length == 4 && setEnd_date(dayjs(e.$d).format('DD/MM/YYYY'))}/>
            </DemoContainer>
          </LocalizationProvider>
        </Box>
      </Box>
      <Box mx={4} my={4}>
        <Button variant="contained">Export</Button>
      </Box>
    </Box>
  );
};

export default MainHead;
