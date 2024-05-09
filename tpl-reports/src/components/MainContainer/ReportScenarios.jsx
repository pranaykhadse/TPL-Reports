import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import axios from "axios";

import Pagination from "@mui/material/Pagination";

import LeftSideBar from "../LeftSideBar/LeftSideBar";
import RightSideContainer from "../RightSideContainer/RightSideContainer";

import MainHead from "./components/MainHead";

const ReportScenarios = () => {
  const [allOpenTabs, setAllOpenTAbs] = useState([]);
  const [openTabData, setOpenTabData] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [end_date, setEnd_date] = useState(null);

  
  const handleRightTab = (type, title) => {
    let custom_column;
    if (type == "all_course_enrolled" || type == "completed_courses" || type=="registered_courses" || type=="total_courses"|| type=="total_users") {
      custom_column = true;
    }else{
      custom_column = false;
    }

    if (allOpenTabs.filter((e) => e.type === type).length === 0) {
      setAllOpenTAbs([
        ...allOpenTabs,
        {
          required: false,
          type: type,
          className: "form-control",
          label: "",
          placeholder: "",
          custom_column: custom_column,
          table_name: title,
        },
      ]);
    }
  };
  const fetchData = async () => {
    if (allOpenTabs.length > 0) {
      if (startDate && end_date) {
        let data = JSON.stringify(allOpenTabs);
        let datefilter = JSON.stringify([
          {
            start_date: startDate,
            end_date: end_date,
          },
        ]);

        axios
          .post(
            `https://staging.trainingpipeline.com/backend/web/report-generate/generate?per-page=15&page=${page}`,
            { data, datefilter },
            {
              headers: {
                accept: "application/json",
              },
            }
          )
          .then(
            (res) => {
              setOpenTabData(res.data.payload);
              setResponseData(res.data);
            },
            (error) => {
              console.log(error);
            }
          );
      } else {
        let data = JSON.stringify(allOpenTabs);
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
              setResponseData(res.data);
            },
            (error) => {
              console.log(error);
            }
          );
      }
    }
  };


  useEffect(() => {
    fetchData();
  }, [allOpenTabs, page, end_date]);


  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      my={4}
      sx={{
        justifyContent: "center",
      }}
    >
      <MainHead setStartDate={setStartDate} setEnd_date={setEnd_date} />
      <Box
        height={500}
        display="flex"
        flexDirection="row"
        gap={0}
        mt={2}
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
        }}
      >
        <Pagination
          count={responseData.pages}
          variant="outlined"
          shape="rounded"
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  );
};

export default ReportScenarios;
