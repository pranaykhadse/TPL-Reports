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
import { Chip, OutlinedInput, useTheme } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const TableList = ({
  openTab,
  allOpenTabs2,
  dragStart,
  tables,
  setTables,
  handleSelectColumn,
  buildQueryJSON,
  closeTab,
  selectedColumn,
  fetchTableData,
  setSelectedColumn
}) => {
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);

  const theme = useTheme();

  const addLine = (event, index) => {
    let tmpFilter = [];
    if (index == 0) {
      let relateShowArr = tables[0].relatedShow;
      setSelectedColumn([]);
      tmpFilter = [
        {
          tbl: "",
          related: [],
          relatedShow: relateShowArr,
          col: [[], []],
          sum: [[]],
          count: [[]],
        }
      ];
    }else{
      if(typeof tables[index + 1] === 'undefined') {
        // does not exist
       
        tmpFilter = [...tables];
      }else {
        // does exist
        tmpFilter = [...tables];
        tmpFilter.length = index + 1;
    }
    }

    tmpFilter[index]["tbl"] = event.target.value;
    tmpFilter[index + 1] = {
      tbl: "",
      related: [],
      relatedShow: [],
      col: [[], []],
      sum: [[]],
      count: [[]],
    };
    return tmpFilter;
  };

  const filterAddedArray = (tbl,relTables, resp) => {
    let arr1 = [...relTables];
    let arr2 = [...resp];
    let allArr = arr1.concat(arr2);
    let uniqueFinalArray = allArr.filter(function (item, pos) {
      return allArr.indexOf(item) == pos;
    });

    return uniqueFinalArray.filter((el) => el != tbl);

  };

  const handleTableChange = async (event, index) => {
    // if (index === 0) {
    //   console.log("test");
    //   fetchTableData()
    // }
    let tmpFilter = addLine(event, index);
    await axios
      .get(
        `https://staging.trainingpipeline.com/backend/web/mii/applicant/columns?table=${event.target.value}`,
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.data !== undefined) {
          let columnData = Object.values(res.data.data);
          tmpFilter[index]["col"][1] = columnData;
        }

        return tmpFilter;
      })
      .then(
        (tmpFilter) => {
          axios
            .get(
              `https://staging.trainingpipeline.com/backend/web/mii/applicant/relations?tableName=${event.target.value}`,
              {
                headers: {
                  accept: "application/json",
                },
              }
            )
            .then((resp) => {
              let relatedData1 = [];
              let relatedData2 = [];
              let relatedData3 = [];
              if (
                resp.data !== null &&
                resp.data !== undefined &&
                resp.data.length > 0
              ) {
            
                if (tables.length> 1) {
                  let arr = filterAddedArray(
                    tmpFilter[index].tbl,
                    tmpFilter[index]["related"],
                    resp.data
                  );
                  relatedData3.push(...arr);
                }else{
                  relatedData3.push(...resp.data);
                }
                relatedData1.push(...resp.data);
                relatedData2.push(...resp.data);
              }
              tmpFilter[index]["related"] = Array.from(new Set(relatedData1));
              tmpFilter[index+ 1]["relatedShow"] = Array.from(new Set(relatedData3));
              
              tmpFilter[index + 1]["related"] = Array.from(
                new Set(relatedData2)
              );

              setTables([...tmpFilter]);
            });
        },
        (error) => {
          console.log(error);
        }
      );

  };

  const handleColumnChange = (value, index) => {
    let tmpFilter = [...tables];
    let tempSelectArr = [...tables[index]["col"][0]];
    tempSelectArr.push(value);

    tmpFilter[index]["col"][0] = tempSelectArr;
    setTables(tmpFilter);
    handleSelectColumn();
    buildQueryJSON();
  };

  const handleClick = (e) => {
    if (!selected.includes(e)) {
      setSelected([...selected, e]);
    } else {
      let selectedArr = [...selected];
      const updatedArr = selectedArr.filter((item) => item != e);
      setSelected([...updatedArr]);
    }
    // if (allOpenTabs2.length === 0) {
    //   if (!selected.includes(e)) {
    //     setSelected([e]);
    //   } else {
    //     setSelected([]);
    //   }
    // }
  };

  // useEffect(() => {
  //   if (allOpenTabs2.length !== 0) {
  //     setSelected(allOpenTabs2[0].show_type.name);
  //   }
  // }, [allOpenTabs2]);

  const SearchFields = ({ item, i }) => {
    return (
      item.relatedShow.length != 0 && (
        <>
          <Box sx={{ minWidth: "100%", height: "fit-content" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Tables</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                value={item.tbl}
                label="Tables"
                onChange={(value) => handleTableChange(value, i)}
                // onClick={() => console.log("vbdvjb")}
              >
                {item.relatedShow.map((table, index) => (
                  <MenuItem key={index} value={table}>
                    {table}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {/* <Box sx={{ minWidth: "100%", height: "fit-content" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Columns</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            multiple
            value={item["col"][0]}
            onChange={(value) => handleColumnChange(value, i)}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value, i) => (
                  <Chip key={i} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {item.col[1].map((field, index) => (
              <MenuItem
                key={index}
                value={field.name}
                style={getStyles(field.name, item["col"][1], theme)}
              >
                {field.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box> */}
    
          {item.col[1].length != 0 && (
            <Box key={i} width="100%">
              <ListItemButton
                onClick={() => handleClick(item.tbl)}
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
                  primary="Columns"
                  sx={{
                    color: "#0d6016",
                  }}
                />
                {selected.includes(item.tbl) ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={selected.includes(item.tbl)}
                timeout="auto"
                unmountOnExit
              >
                {item?.col[1].map((col, index) => (
                  <List
                    draggable
                    onDragStart={() => dragStart(item.tbl, col.name, i)}
                    key={col.name + "-" + index}
                    component="div"
                    disablePadding
                    sx={{
                      bgcolor: "background.paper",
                      border: "1px solid grey",
                      borderRadius: 1,
                      "& .MuiButtonBase-root": {
                        paddingY: "1px",
                      },
                    }}
                  >
                    <ListItemButton
                      onClick={() =>
                        item.col[0].filter((e) => e === col.name).length > 0
                          ? closeTab(item.tbl, col.name, i)
                          : handleColumnChange(col.name, i)
                      }
                    >
                      <ListItemText primary={col.name} />
                      {item.col[0].filter((e) => e === col.name).length > 0 ? (
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
          )}

          {/* <Box sx={{ minWidth: "100%", height: "fit-content" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sum</InputLabel>
          <Select
            labelId="demo-simple-select-label-sum"
            id="demo-simple-select-sum"
           multiple
            value={item["sum"][0]}
           
            onChange={(value) => handleSumChange(value, i, item.tbl)}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value,i) => (
                  <Chip key={i} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            { item.sum[1].map((field, index) => (
                <MenuItem key={index} value={field.name} style={getStyles(field.name, item["col"][1], theme)}>
                  {field.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: "100%", height: "fit-content" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Count</InputLabel>
          <Select
            labelId="demo-simple-select-label-count"
            id="demo-simple-select-count"
           multiple
            value={item["count"][0]}
           
            onChange={(value) => handleCountChange(value, i, item.tbl)}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value,i) => (
                  <Chip key={i} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            { item.count[1].map((field, index) => (
                <MenuItem key={index} value={field.name} style={getStyles(field.name, item["col"][1], theme)}>
                  {field.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box> */}
        </>
      )
    );
  };

  return (
    <>
      {tables.map((item, i) => (
        <SearchFields item={item} i={i} key={i} />
      ))}

      {/* <List
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
      </List> */}
    </>
  );
};

export default TableList;
