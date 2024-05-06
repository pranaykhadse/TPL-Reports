import React from 'react'
import Box from "@mui/material/Box";



import TextField from "@mui/material/TextField";
import TableList from './TableList';

const LeftSideBar = (props) => {

  return (
    <Box
          height={230}
          width={260}
          display="flex"
          alignItems="center"
          flexDirection="column"
          gap={2}
          noValidate
          autoComplete="off"
          minWidth={260}
        >
          <TextField
              id="outlined-basic"
              placeholder="Search Tables/Column"
              variant="outlined"
              sx={{ width: "100%" }}
            />

          <TableList openTab={props.openTab} allOpenTabs={props.allOpenTabs}/>
        </Box>
  )
}

export default LeftSideBar