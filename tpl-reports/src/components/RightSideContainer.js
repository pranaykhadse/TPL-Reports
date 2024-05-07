import React from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import ControlCameraSharpIcon from "@mui/icons-material/ControlCameraSharp";
import { TextField, Typography } from "@mui/material";
import ModeIcon from "@mui/icons-material/Mode";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const RightSideContainer = ({ allOpenTabs, setAllOpenTAbs, openTabData }) => {
  const closeTab = (title, type) => {
    let arr = allOpenTabs;
    arr.splice(
      allOpenTabs.findIndex((a) => a.table_name === title && a.type === type),
      1
    );
    setAllOpenTAbs([...arr]);
  };

  const handleDragEnd = (results) => {
    let tempuser = [...allOpenTabs];
    if (results.destination) {
      let [selectedRow] = tempuser.splice(results.source.index, 1);
      tempuser.splice(results.destination.index, 0, selectedRow);
    }
    setAllOpenTAbs(tempuser);
  };


  return (
    <DragDropContext onDragEnd={(results) => handleDragEnd(results)}>
      <Droppable droppableId="Box-1" direction="horizontal">
        {(provided) => (
          <Box
            display="flex"
            gap={0}
            px={0.5}
            flexDirection="row"
            sx={{ flexGrow: 1, height: "100%", overflowX: "auto", }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {allOpenTabs.map((tab, i) => (
              <Draggable draggableId={tab.type} index={i} key={tab.type}>
                {(provided) => (
                  <Box
                    width="auto"
                    minWidth={220}
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
                          {tab.table_name} : {tab.type}
                        </Typography>

                        <CloseIcon
                          sx={{
                            cursor: "pointer",
                          }}
                          onClick={() => closeTab(tab.table_name, tab.type)}
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
                          NAME
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
                    <Box>
                      <List>
                        {openTabData.map((item, i) => (
                          <ListItem sx={{ width: '100%',bgcolor: i%2 !==0 ?'gray':"" }} key={i}>
                            <ListItemText primary={item[tab.type]} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default RightSideContainer;
