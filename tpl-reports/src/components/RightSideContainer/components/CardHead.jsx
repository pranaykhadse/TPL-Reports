import React from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import ControlCameraSharpIcon from "@mui/icons-material/ControlCameraSharp";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import ModeIcon from "@mui/icons-material/Mode";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CardHead = ({ tab, closeTab, handleSumChange, handleCountChange }) => {
  const [value, setValue] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRadioChange= (e) => {
    setValue(e.target.value);
    if (e.target.value == "sum") {
      handleSumChange( tab.index, tab.table, tab.column)
    } else if (e.target.value == "count") {
      handleCountChange( tab.index, tab.table, tab.column)
      
    } 
  }

  return (
    <Box
      height={145}
      display="flex"
      flexDirection="column"
      px={1.5}
      pt={1}
      sx={{
        position: "relative",
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
          {tab.table} : {tab.column}
        </Typography>

        <CloseIcon
          sx={{
            cursor: "pointer",
          }}
          onClick={() => closeTab(tab.table, tab.column, tab.index)}
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
          {tab.column}
        </Typography>
        <ModeIcon
          onClick={open ? handleClose : handleOpen}
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
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal> */}
      {open && (
        <Box
          boxSizing="border-box"
          height="fit-content"
          width="90%"
          display="flex"
          flexDirection="column"
          px={1}
          sx={{
            zIndex: 10,
            position: "absolute",
            top: "60%",
            bgcolor: "#ffffff",
            borderRadius: 1,
            border: "1px solid grey",
          }}
        >
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              value={value}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="sum" control={<Radio />} label="Sum" />
              <FormControlLabel value="count" control={<Radio />} label="Count" />
            </RadioGroup>
          </FormControl>
          {/* <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={tab.sum ? true : false}
                  onChange={(e) =>
                    handleSumChange(e, tab.index, tab.table, tab.column)
                  }
                />
              }
              label="Sum"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={tab.count ? true : false}
                  onChange={(e) =>
                    handleCountChange(e, tab.index, tab.table, tab.column)
                  }
                />
              }
              label="Count"
            />
          </FormGroup> */}
        </Box>
      )}
    </Box>
  );
};

export default CardHead;
