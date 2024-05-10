import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

import MuiTextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

const MainHead = ({ setStartDate, setEnd_date }) => {
  const [open, setOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
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
  const refone = useRef(null);
  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    let handler = (e) => {
      if (!refone.current.contains(e.target)) {
        setOpen(false);
      }
      
    }
    document.addEventListener('mousedown',handler)

    
    return () => {
      document.removeEventListener('mousedown',handler)
    }
  })

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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                slots={{ textField: TextField }}
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
                slots={{ textField: TextField }}
                format="DD-MM-YYYY"
                onChange={(e) =>
                  `${e.$y}`.length == 4 &&
                  setEnd_date(dayjs(e.$d).format("DD/MM/YYYY"))
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
      </Box>
      <Box mx={4} my={4}>
        <List
          sx={{
            width: "100%",
            position: "relative",
            top: 1 / 2,
            right: "10%",
            zIndex: "tooltip",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton
            onClick={handleClick}
            ref={refone}
            sx={{
              color: "#ffffff",
              border: "1px solid grey",
              bgcolor: "#2D9CE9",
              borderRadius: 1,
              "&:focus": {
                bgcolor: "#2D75D7",
              },
              "&:hover": {
                bgcolor: "#2D9CE9",
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
              bgcolor: "#c6f9f1",
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
