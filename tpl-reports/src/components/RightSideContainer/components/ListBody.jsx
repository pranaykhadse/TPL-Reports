import React from 'react'
import Box from "@mui/material/Box";


import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const ListBody = ({openTabData, tab}) => {
  return (
    <Box>
        <List>
          {openTabData.map((item, i) => (
            <ListItem
              sx={{ width: "100%", bgcolor: i % 2 !== 0 ? "#cfd1d3" : "" }}
              key={i}
            >
              <ListItemText primary={item[tab.type]} />
            </ListItem>
          ))}
        </List>
      </Box>
  )
}

export default ListBody