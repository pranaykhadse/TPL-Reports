import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";

import MuiTextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import axios from "axios";

const MainHead = ({ allOpenTabs, startDate, endDate, setStartDate, setEndDate }) => {
  const [open, setOpen] = useState(false);
  const [setstoreJson, setSetstoreJson] = useState(null);
  const [reportTitle, setReportTitle] = useState(null);
  const refone = useRef(null);

  const TextFieldDashed = React.forwardRef((props, ref) => (
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

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    let handler = (e) => {
      if (!refone.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleStoreJson = () => {
    setSetstoreJson(allOpenTabs);

    if (!reportTitle) {
      alert("Report Name in missing...!");
      return;
    }
    
    if (allOpenTabs.length === 0 ) {
      alert("Report Data in missing...!");
      return;
    }
    let data = JSON.stringify(allOpenTabs);
    if (startDate && endDate) {
      axios
        .post(
          `https://staging.trainingpipeline.com/backend/web/report-generate/save-report`,
          {
            name: reportTitle,
            fields_json: data,
            from: startDate,
            to: endDate,
          },
          {
            headers: {
              accept: "application/json",
            },
          }
        )
        .then(
          (res) => {
            console.log("fdbd", res);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      axios
        .post(
          `https://staging.trainingpipeline.com/backend/web/report-generate/save-report`,
          {
            name: reportTitle,
            fields_json: data,
            from: "11-05-2024",
            to: "15-05-2024",
          },
          {
            headers: {
              accept: "application/json",
            },
          }
        )
        .then(
          (res) => {
            console.log("fdbd", res);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      height="80px"
      mx={8}
      paddingBottom="6px"
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
          justifyContent: "space-between",
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                slots={{ textField: TextFieldDashed }}
                format="DD-MM-YYYY"
                onChange={(e) =>
                  `${e.$y}`.length == 4 &&
                  setStartDate(dayjs(e.$d).format("DD/MM/YYYY"))
                }
              />
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
              <DatePicker
                slots={{ textField: TextFieldDashed }}
                format="DD-MM-YYYY"
                onChange={(e) =>
                  `${e.$y}`.length == 4 &&
                  setEndDate(dayjs(e.$d).format("DD/MM/YYYY"))
                }
              />
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
          <TextField
            id="outlined-basic"
            label="Report Name"
            variant="outlined"
            size="small"
            onChange={(e) => setReportTitle(e.target.value)}
            sx={{
              width: "auto",
              minWidth: "180px",
              borderRadius: 1,
              bgcolor: "#FFFFFF",
              marginTop: "8px",
            }}
          />
        </Box>
        <Button
          variant="contained"
          onClick={() => handleStoreJson()}
          sx={{
            marginTop: "8px",
          }}
        >
          Save
        </Button>
      </Box>
      <Box minWidth="fit-content">
        <List
          sx={{
            width: "100%",
            position: "relative",
            top: 1 / 2,
            right: "10%",
            zIndex: "tooltip",
            marginTop: "8px",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton
            onClick={handleClick}
            ref={refone}
            sx={{
              height: "40px",
              boxShadow: 3,
              color: "#ffffff",
              bgcolor: "#197DC2",
              borderRadius: 1,
              "&:hover": {
                bgcolor: "#1964C2",
                boxShadow: 5,
              },
            }}
          >
            <ListItemText primary="Export Option" />
          </ListItemButton>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            sx={{
              color: "#ffffff",
              width: "100%",
              border: "1px solid grey",
              bgcolor: "#1976d2",
              borderRadius: 1,
              position: "absolute",
              Button: -1,
              zIndex: "tooltip",
            }}
          >
            <List
              component="div"
              disablePadding
              sx={{
                bgcolor: "#2D9CE9",
                "&:hover": {
                  bgcolor: "#2D75D7",
                },
              }}
            >
              <ListItemButton>
                <ListItemText primary="Export" />
              </ListItemButton>
            </List>
            <List
              component="div"
              disablePadding
              sx={{
                bgcolor: "#2D9CE9",
                "&:hover": {
                  bgcolor: "#2D75D7",
                },
              }}
            >
              <ListItemButton>
                <ListItemText primary="Export All" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Box>
    </Box>
  );
};

export default MainHead;
