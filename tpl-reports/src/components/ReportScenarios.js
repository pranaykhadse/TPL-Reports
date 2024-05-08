import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import LeftSideBar from "./LeftSideBar";
import RightSideContainer from "./RightSideContainer";
import axios from "axios";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const ReportScenarios = () => {
  const [allOpenTabs, setAllOpenTAbs] = useState([]);
  const [openTabData, setOpenTabData] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [page, setPage] = useState(1);

  const handleRightTab = (type, title) => {
    if (allOpenTabs.filter((e) => e.type === type).length === 0) {
      setAllOpenTAbs([
        ...allOpenTabs,
        {
          required: false,
          type: type,
          className: "form-control",
          label: "",
          placeholder: "",
          custom_column: true,
          table_name: title,
        },
      ]);
    }
  };

  const fetchData = async () => {
    if (allOpenTabs.length > 0) {
      const data = JSON.stringify(allOpenTabs);
      axios
        .post(
          `https://staging.trainingpipeline.com/backend/web/report-generate/generate?per-page=15&page=${page}`,
          { data },
          {
            headers: {
              accept: "application/json",
            },
          }
        )
        .then(
          (res) => {
            setOpenTabData(res.data.payload);
            setResponseData(res.data)
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };
  useEffect(() => {
    fetchData();
  }, [allOpenTabs, page]);

  const handleChangePage = ( event,value) => {
setPage(value);
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        justifyContent: "center",
      }}
    >
      <Box
        height={650}
        display="flex"
        flexDirection="row"
        gap={0}
        mt={4}
        mb={2}
        mx={8}
        sx={{
          justifyContent: "flex-start",
          maxHeight: "fit-content",
        }}
      >
        <LeftSideBar openTab={handleRightTab} allOpenTabs={allOpenTabs} />
        <RightSideContainer
          allOpenTabs={allOpenTabs}
          setAllOpenTAbs={setAllOpenTAbs}
          openTabData={openTabData}
        />
      </Box>
      <Box
      display="flex"
      sx={{
        justifyContent: "center",
      }}>

      <Pagination count={responseData.pages} variant="outlined" shape="rounded"  onChange={handleChangePage}/>
      </Box>
    </Box>
  );
};

export default ReportScenarios;
