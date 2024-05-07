import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import LeftSideBar from "./LeftSideBar";
import RightSideContainer from "./RightSideContainer";
import axios from "axios";

const ReportScenarios = () => {
  const [allOpenTabs, setAllOpenTAbs] = useState([]);
  const [openTabData, setOpenTabData] = useState([]);
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

  console.log(allOpenTabs);
  const fetchData = async () => {
    if (allOpenTabs.length > 0) {
      const data = JSON.stringify(allOpenTabs);
      axios
        .post(
          `https://staging.trainingpipeline.com/backend/web/report-generate/generate`,
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
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };
  useEffect(() => {
    fetchData();
  }, [allOpenTabs]);

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
    </>
  );
};

export default ReportScenarios;
