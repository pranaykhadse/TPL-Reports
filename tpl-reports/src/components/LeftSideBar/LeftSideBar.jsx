import React from 'react'
import Box from "@mui/material/Box";


import TableList from './components/TableList';
import SearchTableInput from './components/SearchTableInput';

const LeftSideBar = (props) => {

  return (
    <Box
          width={260}
          display="flex"
          alignItems="center"
          flexDirection="column"
          gap={2}
          noValidate
          autoComplete="off"
          minWidth={260}
          sx={{ height: "100%",overflowX: "auto", }}
        >
          
          <SearchTableInput />
          <TableList openTab={props.openTab} allOpenTabs2={props.allOpenTabs2} dragStart={props.dragStart}/>
          
        </Box>
  )
}

export default LeftSideBar