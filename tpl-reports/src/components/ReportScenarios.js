import React, { useState } from "react";
import Box from "@mui/material/Box";
import LeftSideBar from "./LeftSideBar";
import RightSideContainer from "./RightSideContainer";




const ReportScenarios = () => {
  const [allOpenTabs, setAllOpenTAbs] = useState([]);
  const handleRightTab = (el, title) => {
    if (allOpenTabs.filter((e) => e.element === el).length === 0) {
      setAllOpenTAbs([
        ...allOpenTabs,
        {
          title: title,
          element: el,
        },
      ]);
    }
  };

  


  return (
    <>
      <Box
        height={650}
        display="flex"
        flexDirection="row"
        gap={0}
        my={4}
        mx={8}
        sx={{
          justifyContent: "flex-start",
          maxHeight: "100%",
        }}
      >
        <LeftSideBar openTab={handleRightTab} allOpenTabs={allOpenTabs} />
        <RightSideContainer allOpenTabs={allOpenTabs} setAllOpenTAbs={setAllOpenTAbs}/>
      </Box>
    </>
  );
};

export default ReportScenarios;
