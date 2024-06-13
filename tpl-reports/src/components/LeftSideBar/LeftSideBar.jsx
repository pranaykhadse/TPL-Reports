import React from "react";
import Box from "@mui/material/Box";

import TableList from "./components/TableList";
import SearchTableInput from "./components/SearchTableInput";
import { Button } from "@mui/material";

const LeftSideBar = (props) => {
  return (
    <Box
      width={300}
      display="flex"
      alignItems="center"
      flexDirection="column"
      gap={2}
      noValidate
      autoComplete="off"
      minWidth={300}
      sx={{ height: "100%", overflowX: "auto" }}
    >
      {/* <SearchTableInput /> */}
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            props.fetchTableData();
            props.resetreportTitle();
          }}
        >
          Reset
        </Button>
      </Box>
      <TableList
        openTab={props.openTab}
        allOpenTabs2={props.allOpenTabs2}
        dragStart={props.dragStart}
        tables={props.tables}
        setTables={props.setTables}
        handleSelectColumn={props.handleSelectColumn}
        buildQueryJSON={props.buildQueryJSON}
        selectedColumn={props.selectedColumn}
        closeTab={props.closeTab}
        fetchTableData={props.fetchTableData}
        setSelectedColumn={props.setSelectedColumn}
        setReportTitle={props.setReportTitle}
      />
    </Box>
  );
};

export default LeftSideBar;
