import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

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
import { Padding } from "@mui/icons-material";

const MainHead = ({
  allOpenTabs,
  startDate,
  endDate,
  setReportTitle,
  reportTitle,
  setStartDate,
  setEndDate,
  queryjsonData,
  getSaveData,
  pageNum,
  responseData,
}) => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalMessage2, setModalMessage2] = useState("");

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const refone = useRef(null);
  const reftwo = useRef(null);

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
  const handleClose = () => {
    setModalOpen(false);
  };
  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    let handler = (e) => {
      if (
        !reftwo.current.contains(e.target) &&
        !refone.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const handleStoreJson = () => {


    if (!reportTitle) {
      setModalOpen(true);
      setModalMessage("Report name required.");
      setModalMessage2("Report Name in missing. Please enter report name.");
      return;
    }

    if (!queryjsonData) {
      setModalOpen(true);
      setModalMessage("Report required.");
      setModalMessage2("Report Data in missing. Please select report.");
      return;
    }
    if (queryjsonData.length === 0) {
      setModalOpen(true);
      setModalMessage("Report required.");
      setModalMessage2("Report Data in missing. Please select report.");
      return;
    }
    let data = JSON.stringify(queryjsonData);
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
            getSaveData();
            setReportTitle(null);
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
            // from: "11-05-2024",
            // to: "15-05-2024",
          },
          {
            headers: {
              accept: "application/json",
            },
          }
        )
        .then(
          (res) => {
            getSaveData();
            setModalOpen(true);
            setModalMessage(res.data.message);
            if (res.data.status == "error") {
              setModalMessage2(
                "Report name already exist. Select different report name. "
              );
              
            }else if (res.data.status == "success") {
              setModalMessage2(
                "Report has been saved successfully...! "
              );
            setReportTitle(null);

            }else{
              setModalMessage2(
                "Something went wrong ..!"
              );
            }
            
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  const handleExport = () => {
    let queryjson = JSON.stringify(queryjsonData);
    let per_page = 15;
    let page = pageNum;

    axios
      .post(
        `https://staging.trainingpipeline.com/backend/web/report-generate/export-excel`,
        {
          queryjson,
          per_page,
          page,
        },
        {
          headers: {
            accept: "application/json",
          },
          responseType: "blob", // Ensure the response is a blob
        }
      )
      .then(
        (res) => {
          // Create a URL for the blob and download the file
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "ReportData2.xls"); // Set the filename
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleExportAll = () => {
    let queryjson = JSON.stringify(queryjsonData);
    let per_page = 15 * responseData.pages;
    let page = responseData.pages;
    axios
      .post(
        `https://staging.trainingpipeline.com/backend/web/report-generate/export-excel`,
        {
          queryjson,
          per_page,
          page,
        },
        {
          headers: {
            accept: "application/json",
          },
          responseType: "blob", // Ensure the response is a blob
        }
      )
      .then(
        (res) => {
          // Create a URL for the blob and download the file
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "ReportData2.xls"); // Set the filename
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  //   $.ajax({
  //     url: '/download-excel',
  //     method: 'GET',
  //     xhrFields: {
  //         responseType: 'blob'
  //     },
  //     success: function(data) {
  //         const url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.ms-excel' }));
  //         const a = document.createElement('a');
  //         a.href = url;
  //         a.download = 'example.xls'; // Filename of the downloaded file
  //         document.body.appendChild(a);
  //         a.click();
  //         window.URL.revokeObjectURL(url);
  //     },
  //     error: function(xhr, status, error) {
  //         console.error('Error downloading file:', status, error);
  //     }
  // });

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
        {/* <Box
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
        </Box> */}
        <Box
          display="flex"
          flexDirection="row"
          sx={{
            alignItems: "center",
          }}
        >
          <TextField
            id="outlined-basic"
            label={reportTitle || "Report Name"}
            variant="outlined"
            size="small"
            value={reportTitle || ""}
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
            ref={reftwo}
            timeout="auto"
            sx={{
              color: "#ffffff",
              width: "100%",
              border: "1px solid grey",
              bgcolor: "#1976d2",
              borderRadius: 1,
              position: "absolute",
              Button: -1,
              zIndex: 20,
            }}
          >
            <List
              component="div"
              disablePadding
              sx={{
                zIndex: 30,
                bgcolor: "#2D9CE9",
                "&:hover": {
                  bgcolor: "#2D75D7",
                },
              }}
            >
              <ListItemButton onClick={() => handleExport()}>
                <ListItemText primary="Export" />
              </ListItemButton>
            </List>
            <List
              component="div"
              disablePadding
              sx={{
                zIndex: 30,
                bgcolor: "#2D9CE9",
                "&:hover": {
                  bgcolor: "#2D75D7",
                },
              }}
            >
              <ListItemButton onClick={() => handleExportAll()}>
                <ListItemText primary="Export All" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Box>
      <Dialog
        fullScreen={fullScreen}
        open={modalOpen}
        slotProps={{
          backdrop: {
            sx: { background: "rgba(255, 255, 255, 0.55)", boxShadow: 1 },
          },
        }}
        onClose={() => handleClose()}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{modalMessage}</DialogTitle>
        <DialogContent>
          <DialogContentText>{modalMessage2}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleClose()}>
            close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MainHead;
