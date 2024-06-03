import React from 'react'
import Box from "@mui/material/Box";


import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const ListBody = ({openTabData, tab, respSelectedColumn, sum, count}) => {
  return (
    respSelectedColumn?.length > 0 &&  <Box>
        <List>
          {respSelectedColumn.map((item, i) => (
            <ListItem
              sx={{ width: "100%", bgcolor: i % 2 !== 0 ? "#cfd1d3" : "" }}
              key={tab.table+"."+tab.column+i}
            >
              <ListItemText primary={sum ? item["Total_"+tab.table+"."+tab.column] || "-" : count ? item["COUNT_"+tab.table+"."+tab.column] || "-": item[tab.table+"."+tab.column] || "- " } />
            </ListItem>
          ))}
        </List>
      </Box>
   
  )
}

export default ListBody