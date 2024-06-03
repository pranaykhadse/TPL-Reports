import {
  Box,
  Button,
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
import React, { useState } from "react";
import { SaveReports } from "../../../../global-constant/SaveReport";
import axios from "axios";
import { useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

const ReportNavBar = ({
  handleSavedReport,
  saveReports,
  getSaveData,
  fetchTableData,
}) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalMessage2, setModalMessage2] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () =>{
setModalOpen(false);
  }

  const handleDelete = (id) => {
    axios
      .post(
        `https://staging.trainingpipeline.com/backend/web/report-generate/delete-report`,
        {
          id,
        },
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then(
        (res) => {
          if (res.data !== undefined) {
            handleClose();
            getSaveData();
            setModalOpen(true);
            setModalMessage(res.data.message);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

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
      <Box
        display="flex"
        flexDirection="row"
        gap={1}
        p="14px"
        sx={{
          overflowX: "auto",
        }}
      >
        {saveReports.map((item, i) => (
          <Box
            key={i}
            pl="8px"
            pr="4px"
            py="4px"
            display="flex"
            flexDirection="row"
            sx={{
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              gap: 1,
              bgcolor: "#ffffff",
              borderRadius: 1,
              color: "gray",
              minWidth: "fit-content",
              cursor: "pointer",
            }}
          >
            <Typography
              onClick={() => handleSavedReport(item)}
              variant="p"
              component="p"
            >
              {item.name}
            </Typography>
            <CancelIcon
              sx={{
                height: "20px",
                cursor: "pointer",
              }}
              onClick={() => {
                handleClickOpen();
              }}
            />
            <Dialog
              fullScreen={fullScreen}
              open={open}
              slotProps={{
                backdrop: {
                  sx: { background: "rgba(255, 255, 255, 0.25)", boxShadow: 1 },
                },
              }}
              onClose={() => handleClose()}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {"Do you want to delete the report?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Report will be permanantly deleted.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={() => handleClose()}>
                  No
                </Button>
                <Button onClick={() => handleDelete(item.id)} autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
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
        <Button variant="contained">Search</Button>
      </Box>
      <Dialog
        fullScreen={fullScreen}
        open={modalOpen}
        slotProps={{
          backdrop: {
            sx: { background: "rgba(255, 255, 255, 0.55)", boxShadow: 1 },
          },
        }}
        onClose={() => handleClose2()}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{modalMessage}</DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={() => handleClose2()}>
            close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReportNavBar;
