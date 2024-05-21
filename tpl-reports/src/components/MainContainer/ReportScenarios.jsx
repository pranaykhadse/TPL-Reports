import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import axios from "axios";

import Pagination from "@mui/material/Pagination";

import LeftSideBar from "../LeftSideBar/LeftSideBar";
import RightSideContainer from "../../components/RightSideContainer/RightSideContainer";

import MainHead from "./components/MainHead";
import ReportNavBar from "./components/ReportNavBar/ReportNavBar";
import { SaveReports } from "../../global-constant/SaveReport";

const ReportScenarios = () => {
  const [allOpenTabs, setAllOpenTAbs] = useState([]);
  const [allOpenTabs2, setAllOpenTAbs2] = useState([]);
  const [openTabData, setOpenTabData] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [end_date, setEnd_date] = useState(null);
  const [type, setType] = useState("");
  const [title, settitle] = useState("");
  const [dropStatus, setDropStatus] = useState();
  const [mainType, setMainType] = useState("");
  const [mainTitle, setMainTitle] = useState("");

  const handleSavedReport = (e) => {
    setAllOpenTAbs([]);
    setAllOpenTAbs2([]);
    setAllOpenTAbs2(e.table_data);
    setOpenTabData(e.fields_json);
  };

  const handleDragStart = (type, title, show_type, mainTitle) => {
    setType(type);
    settitle(title);
    setMainType(show_type);
    setMainTitle(mainTitle);
  };

  const handleDropStatus = (e) => {
    setDropStatus(e);
  };

  const handleDrop = (position) => {
    if (position == "end") {
      setTimeout(() => {
        handleRightTab(type, title, mainType, mainTitle);
      }, 500);
    } else {
      setTimeout(() => {
        handleDragDrop(position, type, title, mainType, mainTitle);
      }, 500);
    }
  };
  const handleDragDrop = (position, type, title, mainType, mainTitle) => {
    if (dropStatus) {
      let custom_column;
      if (
        type == "all_course_enrolled" ||
        type == "completed_courses" ||
        type == "registered_courses" ||
        type == "total_courses" ||
        type == "total_users"
      ) {
        custom_column = true;
      } else {
        custom_column = false;
      }
      if (allOpenTabs2.length > 0 && allOpenTabs.length === 0) {
        let arrList = allOpenTabs2;
        let arrList2 = [];
        arrList.map((item, i) => {
          arrList2.push(item.data);
        });
        if (allOpenTabs.filter((e) => e.type === type).length === 0) {
          setAllOpenTAbs(() => {
            const newElement = [...arrList2];
            newElement.splice(position, 0, {
              required: false,
              type: type,
              className: "form-control",
              label: "",
              placeholder: "",
              custom_column: custom_column,
              table_name: title,
            });
            return newElement;
          });
          setAllOpenTAbs2((prev) => {
            const newElement = [...prev];
            newElement.splice(position, 0, {
              data: {
                required: false,
                type: type,
                className: "form-control",
                label: "",
                placeholder: "",
                custom_column: custom_column,
                table_name: title,
              },
              show_type: {
                showType: mainType,
                name: mainTitle,
              },
            });
            return newElement;
          });
        }
      } else {
        if (allOpenTabs.filter((e) => e.type === type).length === 0) {
          let tabArray = allOpenTabs;
          tabArray.splice(position, 0, {
            required: false,
            type: type,
            className: "form-control",
            label: "",
            placeholder: "",
            custom_column: custom_column,
            table_name: title,
          });

          setAllOpenTAbs([...tabArray]);
        }

        let tabArray2 = allOpenTabs2;
        tabArray2.splice(position, 0, {
          data: {
            required: false,
            type: type,
            className: "form-control",
            label: "",
            placeholder: "",
            custom_column: custom_column,
            table_name: title,
          },
          show_type: {
            showType: mainType,
            name: mainTitle,
          },
        });
        setAllOpenTAbs2([...tabArray2]);
      }
    }
  };

  const handleRightTab = (type, title, showType, name) => {
    let custom_column;
    if (
      type == "all_course_enrolled" ||
      type == "completed_courses" ||
      type == "registered_courses" ||
      type == "total_courses" ||
      type == "total_users"
    ) {
      custom_column = true;
    } else {
      custom_column = false;
    }
    if (allOpenTabs2.length > 0 && allOpenTabs.length === 0) {
      let arrList = allOpenTabs2;
      let arrList2 = [];
      arrList.map((item, i) => {
        arrList2.push(item.data);
      });

      if (allOpenTabs.filter((e) => e.type === type).length === 0) {
        setAllOpenTAbs([
          ...arrList2,
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
        setAllOpenTAbs2([
          ...allOpenTabs2,
          {
            data: {
              required: false,
              type: type,
              className: "form-control",
              label: "",
              placeholder: "",
              custom_column: custom_column,
              table_name: title,
            },
            show_type: {
              showType: showType,
              name: name,
            },
          },
        ]);
      }
    } else {
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
        setAllOpenTAbs2([
          ...allOpenTabs2,
          {
            data: {
              required: false,
              type: type,
              className: "form-control",
              label: "",
              placeholder: "",
              custom_column: custom_column,
              table_name: title,
            },
            show_type: {
              showType: showType,
              name: name,
            },
          },
        ]);
      }
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
      my={1}
      sx={{
        justifyContent: "center",
      }}
    >
      <ReportNavBar handleSavedReport={handleSavedReport} />
      <MainHead
        startDate={startDate}
        end_date={end_date}
        allOpenTabs={allOpenTabs}
      />
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
        <LeftSideBar
          openTab={handleRightTab}
          allOpenTabs2={allOpenTabs2}
          dragStart={handleDragStart}
        />
        <RightSideContainer
          allOpenTabs={allOpenTabs}
          setAllOpenTAbs={setAllOpenTAbs}
          allOpenTabs2={allOpenTabs2}
          setAllOpenTAbs2={setAllOpenTAbs2}
          openTabData={openTabData}
          handleDropStatus={handleDropStatus}
          dropStatus={dropStatus}
          onDrop={handleDrop}
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
