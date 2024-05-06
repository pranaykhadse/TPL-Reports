import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import AddIcon from '@mui/icons-material/Add';

const TableList = ({openTab, allOpenTabs}) => {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);

  const handleClick = (e) => {
    if (!selected.includes(e)) {
      setSelected([
        ...selected,
        e,
      ]);
    } else {
      let arr = selected;
      arr.splice(selected.indexOf(e) , 1);
      setSelected([...arr]);
    }
  };
  
  const data = [
    {
      title: "User",
      fields: [
        "username",
        "email",
        "status",
        "lms_status",
        "course_status",
        "is_deleted",
        "primary_group",
      ],
    },
    {
      title: "Groups",
      fields: ["Name", "is_group"],
    },
    {
      title: "Courses",
      fields: ["name", "amount"],
    },
  ];

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        fontWeight: "bold",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {data.map((table, i) => (
        <Box key={i}>
          <ListItemButton
            onClick={() => handleClick(table.title)}
            sx={ {
                    border: "1px solid grey",
                    bgcolor: "#a8f3d2",
                    borderRadius: 1,
                    '&:hover': {
                        bgcolor: "#a8f3d2",
                      },
                  }
            }
          >
            <ListItemText
              primary={table.title.toUpperCase()}
              sx={{
                color: "#0d6016",
              }}
            />
            {selected.includes(table.title) ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={selected.includes(table.title)} timeout="auto" unmountOnExit>
            {table.fields.map((el,i) => (
                <List
                key={el}
                component="div"
                disablePadding
                sx={{
                  bgcolor: "background.paper",
                  border: "1px solid grey",
                  borderRadius: 1,
                }}
              >
                <ListItemButton  onClick={() => openTab(el, table.title)}>
                  <ListItemText primary={el} />
                  {allOpenTabs.filter(e => e.element === el).length > 0 ? <RemoveIcon
                    sx={{
                      height: "25px",
                    }}
                  />: <AddIcon
                  sx={{
                    height: "25px",
                  }}
                />}
                  
                </ListItemButton>
              </List>
            ))}
            
          </Collapse>
        </Box>
      ))}
    </List>
  );
};

export default TableList;
