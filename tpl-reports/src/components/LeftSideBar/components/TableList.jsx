import React, { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import AddIcon from "@mui/icons-material/Add";

import TableData from "../../../global-constant/TableData";
import { useEffect } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

const TableList = ({ openTab, allOpenTabs2, dragStart, tables, setTables }) => {
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);


  const addLine = (event, index) => {
    let tmpFilter = [];
    tmpFilter = [...tables];
    tmpFilter[index]["tbl"] = event.target.value;
    tmpFilter[index + 1] = {
      tbl: "",
      related: [],
      col: ["", ["--"]],
    };
    return tmpFilter;
  };


  const handleTableChange = async (event, index) => {
    let tmpFilter = addLine(event, index);

    await axios
    .get(
      `https://handysolver.myhandydash.dev/backend/web/mii/applicant/columns?table=${event.target.value}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    )
    .then(
      (res) => {
        if (res.data.data !== undefined) {
          let columnData = Object.values(res.data.data);
          tmpFilter[index]["col"][1] = columnData;
          console.log("============",res.data.data );
        }
      },
      (error) => {
        console.log(error);
      }
    );

    setTables(tmpFilter)
  };
  function findTypeByName(array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].name === value) {
        return array[i];
      }
    }
    return null; // Element not found
  }

  const handleColumnChange = (event, index) => {
    let tmpFilter = [...tables];
    let columnSelected = findTypeByName(
      tmpFilter[index]["col"][1],
      event.target.value
    );
    // alert(dataType)
    if (tmpFilter.length <= 1 || columnSelected.type === undefined) {
      // avoid deleting first line
      return;
    }
    tmpFilter[index]["col"][0] = columnSelected;
    setTables(tmpFilter)
  }

  const handleClick = (e) => {
    if (allOpenTabs2.length === 0) {
      if (!selected.includes(e)) {
        setSelected([e]);
      } else {
        setSelected([]);
      }
    }
  };

  useEffect(() => {
    if (allOpenTabs2.length !== 0) {
      setSelected(allOpenTabs2[0].show_type.name);
    }
  }, [allOpenTabs2]);

  const SearchFields = ({item,i}) => {
    return (
     <>
      <Box sx={{ minWidth: "100%", height: "fit-content" }} >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tables</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={item.tbl}
          label="Tables"
          onChange={(value) => handleTableChange(value, i)}
        >
          {item.related.map((table, index) => (
            <MenuItem key={index} value={table}>
              {table}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
    <Box sx={{ minWidth: "100%", height: "fit-content" }} >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Columns</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={item["col"][0].length === 0 ? "":item["col"][0].name}
          label="Columns"
          onChange={(value) => handleColumnChange(value, i)}
        >
          {console.log(item["col"])}
          {item.col[1].length === 0 ? (
                  <MenuItem key="0" value={item["col"][0]}>
                    {item["col"][0]}
                  </MenuItem>
                ) : (
                  item.col[1].map((field, index) => (
                    <MenuItem key={index} value={field.name}>
                      {field.name}
                    </MenuItem>
                  ))
                )}
        </Select>
      </FormControl>
    </Box>
    </>
    )
  }

  return (
    <>
      {tables.map((item, i) => (
      <SearchFields item={item} i={i} key={i}/>
      ))}

      <List
        sx={{
          height: "fit-content",
          width: "100%",
          maxWidth: "100%",
          bgcolor: "background.paper",
          fontWeight: "bold",
          paddingBottom: "10px",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <Box>
          <ListItemButton
            onClick={() => setOpen((prev) => !prev)}
            sx={{
              border: "1px solid grey",
              bgcolor: "#c6f9f1",
              borderRadius: 1,
              "&:hover": {
                bgcolor: "#a8f3d2",
              },
            }}
          >
            <ListItemText
              primary={"Tables"}
              sx={{
                color: "#0d6016",
              }}
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List
              sx={{
                height: "fit-content",
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                fontWeight: "bold",
                paddingBottom: "10px",
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              {TableData.map((table, i) => (
                <Box key={i}>
                  <ListItemButton
                    onClick={() => handleClick(table.title)}
                    sx={{
                      border: "1px solid grey",
                      bgcolor: "#c6f9f1",
                      borderRadius: 1,
                      "&:hover": {
                        bgcolor: "#a8f3d2",
                      },
                    }}
                  >
                    <ListItemText
                      primary={table.title.toUpperCase()}
                      sx={{
                        color: "#0d6016",
                      }}
                    />
                    {selected.includes(table.title) ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </ListItemButton>
                  <Collapse
                    in={selected.includes(table.title)}
                    timeout="auto"
                    unmountOnExit
                  >
                    {table.fields.map((type, i) => (
                      <List
                        draggable
                        onDragStart={() =>
                          dragStart(
                            type[0],
                            table.table_name,
                            type[1],
                            table.title
                          )
                        }
                        key={type[1]}
                        component="div"
                        disablePadding
                        sx={{
                          bgcolor: "background.paper",
                          border: "1px solid grey",
                          borderRadius: 1,
                        }}
                      >
                        <ListItemButton
                          onClick={() =>
                            openTab(
                              type[0],
                              table.table_name,
                              type[1],
                              table.title
                            )
                          }
                        >
                          <ListItemText primary={type[1]} />
                          {allOpenTabs2.filter((e) => e.data.type === type[0])
                            .length > 0 ? (
                            <RemoveIcon
                              sx={{
                                height: "25px",
                              }}
                            />
                          ) : (
                            <AddIcon
                              sx={{
                                height: "25px",
                              }}
                            />
                          )}
                        </ListItemButton>
                      </List>
                    ))}
                  </Collapse>
                </Box>
              ))}
            </List>
          </Collapse>
        </Box>
      </List>
    </>
  );
};

export default TableList;
