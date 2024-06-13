import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import axios from "axios";

import Pagination from "@mui/material/Pagination";

import LeftSideBar from "../LeftSideBar/LeftSideBar";
import RightSideContainer from "../../components/RightSideContainer/RightSideContainer";

import MainHead from "./components/MainHead";
import ReportNavBar from "./components/ReportNavBar/ReportNavBar";
import TableData from "../../global-constant/TableData";
import { useNavigate } from "react-router-dom";

const ReportMainContainer = () => {
  const [allOpenTabs, setAllOpenTAbs] = useState([]);
  const [allOpenTabs2, setAllOpenTAbs2] = useState([]);
  const [openTabData, setOpenTabData] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [type, setType] = useState("");
  const [title, settitle] = useState("");
  const [dropStatus, setDropStatus] = useState();
  const [mainType, setMainType] = useState("");
  const [mainTitle, setMainTitle] = useState("");

  const [table, setTable] = useState("");
  const [column, setColumn] = useState("");
  const [indexOfEl, setIndexOfEl] = useState(null);

  const [queryjson, setQueryjson] = useState(null);

  const [reportTitle, setReportTitle] = useState(null);

  const [tables, setTables] = useState([
    {
      tbl: "",
      related: [],
      relatedShow: [],
      col: [[], []],
      sum: [[]],
      count: [[]],
    },
  ]);
  const [saveReports, setSaveReports] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState([]);
  const [respSelectedColumn, setRespSelectedColumn] = useState([]);
  const navigate = useNavigate();

  const filterSum = (sums, col) => {
    if (sums.filter((item) => item.split(":::")[1] == col).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const filterCount = (counts, col) => {
    if (counts.filter((item) => item.split(":::")[1] == col).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleSelectColumn = () => {
    let tmpFilter = [];
    let tmpReportField = [];
    let tmpSumField = [];
    let tmpCountField = [];
    tables.map((item, i) => {
      item.col[0].map((col) => {
        tmpFilter.push({
          table: item.tbl,
          column: col,
          index: i,
          sum: filterSum(item.sum[0], col),
          count: filterCount(item.count[0], col),
        });
        tmpReportField.push(item.tbl + ":::" + col);
      });
      item.sum[0].map((col) => {
        tmpSumField.push(col);
      });
      item.count[0].map((col) => {
        tmpCountField.push(col);
      });
    });

    let filteredTable = removeEmptyFilter(tables);

    let queryjson = {
      table_Data: filteredTable,
      reportfields: tmpReportField,
      sum: tmpSumField,
      count: tmpCountField,
    };
    postQueryJson(queryjson);
    setQueryjson(queryjson);
    setSelectedColumn(tmpFilter);
  };

  // console.log(queryjson);
  // const qPam = new URLSearchParams(window.location.search);
  // useEffect(() => {
  //   setPage(qPam.get("page"));
  // }, [qPam]);
  function removeEmptyFilter(filter) {
    let tmpFilter = [];
    filter.map((item, i) => {
      tmpFilter.push({
        tbl: item.tbl,
        related: item.related,
      });
    });
    if (tmpFilter[filter.length - 1] !== undefined) {
      if (
        tmpFilter[filter.length - 1]["tbl"] !== undefined &&
        tmpFilter[filter.length - 1]["tbl"] === ""
      ) {
        tmpFilter.pop();
      }
    }
    return tmpFilter;
  }

  const filterAddedArray = (tbl, relTables, resp) => {
    let arr1 = [...relTables];
    let arr2 = [...resp];
    let allArr = arr1.concat(arr2);
    let uniqueFinalArray = allArr.filter(function (item, pos) {
      return allArr.indexOf(item) == pos;
    });

    return uniqueFinalArray.filter((el) => el != tbl);
  };

  const buildQueryJSON = () => {};
  const buildTableJson = async (tbl, i) => {
    let tmpFilter = [];
    // let tmpFilter = addLine(event, index);
    let relateShowArr = tables[0].relatedShow;
    setSelectedColumn([]);
    tmpFilter[i] = {
      tbl: tbl.tbl,
      related: [],
      relatedShow: relateShowArr,
      col: [[], []],
      sum: [[]],
      count: [[]],
    };

    tmpFilter[i + 1] = {
      tbl: "",
      related: [],
      relatedShow: [],
      col: [[], []],
      sum: [[]],
      count: [[]],
    };
    await axios
      .get(
        `https://staging.trainingpipeline.com/backend/web/mii/applicant/columns?table=${tbl.tbl}`,
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.data !== undefined) {
          let columnData = Object.values(res.data.data);
          tmpFilter[i]["col"][1] = columnData;
        }

        return tmpFilter;
      })
      .then(
        (tmpFilter) => {
          axios
            .get(
              `https://staging.trainingpipeline.com/backend/web/mii/applicant/relations?tableName=${tbl.tbl}`,
              {
                headers: {
                  accept: "application/json",
                },
              }
            )
            .then((resp) => {
              let relatedData1 = [];
              let relatedData2 = [];
              let relatedData3 = [];
              if (
                resp.data !== null &&
                resp.data !== undefined &&
                resp.data.length > 0
              ) {
                if (tables.length > 1) {
                  let arr = filterAddedArray(
                    tmpFilter[i].tbl,
                    tmpFilter[i]["related"],
                    resp.data
                  );
                  relatedData3.push(...arr);
                } else {
                  relatedData3.push(...resp.data);
                }
                relatedData1.push(...resp.data);
                relatedData2.push(...resp.data);
              }
              tmpFilter[i]["related"] = Array.from(new Set(relatedData1));
              tmpFilter[i + 1]["relatedShow"] = Array.from(
                new Set(relatedData3)
              );

              tmpFilter[i + 1]["related"] = Array.from(new Set(relatedData2));

   
            });
        },
        (error) => {
          console.log(error);
        }
      );
  };
// console.log("0443",tables);
  const handleSavedReport = async (e) => {
    // fetchTableData();
    setReportTitle(e.name);
    postQueryJson(JSON.parse(e.fields_json));
    setQueryjson(JSON.parse(e.fields_json));
    let fieldjson = JSON.parse(e.fields_json).table_Data;
    let fields = JSON.parse(e.fields_json).reportfields;
    let sumFields = JSON.parse(e.fields_json).sum;
    let countFields = JSON.parse(e.fields_json).count;
    console.log("044",sumFields);
    let tmpFilter2 = [];
    const newElement = [];
    fieldjson.map(async (tbl, i) => {
      let selectedCol = [];
      let selectedSum = [];
      let selectedCount = [];
      fields.map((item, i) =>
        item.split(":::")[0] == tbl.tbl
          ? selectedCol.push(item.split(":::")[1])
          : null
      );
      sumFields.map((item, i) =>
        item.split(":::")[0] == tbl.tbl
          ? selectedSum.push(item)
          : null
      );
      countFields.map((item, i) =>
        item.split(":::")[0] == tbl.tbl
          ? selectedCount.push(item)
          : null
      );
      let tmpFilter = [];
      let relateShowArr = tables[0].relatedShow;
      let col = [];
      await axios
        .get(
          `https://staging.trainingpipeline.com/backend/web/mii/applicant/columns?table=${tbl.tbl}`,
          {
            headers: {
              accept: "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data.data !== undefined) {
            let columnData = Object.values(res.data.data);
            col = [...columnData];
          }
        });

      if (i == 0) {
        tmpFilter[i] = {
          tbl: tbl.tbl,
          related: tbl.related,
          relatedShow: relateShowArr,
          col: [[...selectedCol], [...col]],
          sum: [[...sumFields]],
          count: [[...selectedCount]],
        };
      } else {
        tmpFilter[i] = {
          tbl: tbl.tbl,
          related: tbl.related,
          relatedShow: fieldjson[i - 1].related,
          col: [[...selectedCol], [...col]],
          sum: [[...sumFields]],
          count: [[...selectedCount]],
        };
      }
      var sortedArray = [];
      for (var i = 0; i < fieldjson.length; i++) {
        var found = false;
        sortedArray.push(fieldjson[i].tbl);
      }
      let temp3 = tmpFilter.filter((item) => item != undefined);
      tmpFilter2 = [...tmpFilter2, ...temp3].sort(
        (a, b) => sortedArray.indexOf(a.tbl) - sortedArray.indexOf(b.tbl)
      );

      setTables(tmpFilter2);
      handleSelectColumn();
      let tmpFilterSelectedCol = [];
      tmpFilter2.map((item, i) => {
        item.col[0].map((col) => {
          tmpFilterSelectedCol.push({
            table: item.tbl,
            column: col,
            index: i,
            sum: filterSum(item.sum[0], col),
            count: filterCount(item.count[0], col),
          });
        });
      });
      console.log("0441",tmpFilter2);
      setSelectedColumn(tmpFilterSelectedCol);
    });

    // console.log("04",fieldjson);
    // let tmpReportField = [];
    // let tmpSumField = [];
    // let tmpCountField = [];
    // tables.map((item, i) => {
    //   item.col[0].map((col) => {
    //     tmpFilter.push({
    //       table: item.tbl,
    //       column: col,
    //       index: i,
    //       sum: filterSum(item.sum[0], col),
    //       count: filterCount(item.count[0], col),
    //     });
    //     tmpReportField.push(item.tbl + ":::" + col);
    //   });
    //   item.sum[0].map((col) => {
    //     console.log("friday", col);
    //     tmpSumField.push(col);
    //   });
    //   item.count[0].map((col) => {
    //     tmpCountField.push( col);
    //   });
    // });
    // setAllOpenTAbs(e.fields_json);
    // const newElement = [...e.fields_json];
    // let filterTitle;
    // let filterType;
    // let filterShowTitle;
    // let filterShowType;
    // let custom_column;
    // let arr = [];
    // newElement.map((item, i) => {
    //   if (
    //     item.type == "all_course_enrolled" ||
    //     item.type == "completed_courses" ||
    //     item.type == "registered_courses" ||
    //     item.type == "total_courses" ||
    //     item.type == "total_users"
    //   ) {
    //     custom_column = true;
    //   } else {
    //     custom_column = false;
    //   }
    //   if (TableData.filter((e) => e.table_name == item.table_name).length > 0) {
    //     filterShowTitle = TableData.filter(
    //       (e) => e.table_name == item.table_name
    //     )[0].title;
    //     filterShowType = TableData.filter(
    //       (e) => e.table_name == item.table_name
    //     )[0].fields.filter((e) => e[0] == item.type)[0][1];

    //     filterTitle = TableData.filter(
    //       (e) => e.table_name == item.table_name
    //     )[0].table_name;
    //     filterType = TableData.filter(
    //       (e) => e.table_name == item.table_name
    //     )[0].fields.filter((e) => e[0] == item.type)[0][0];

    //     arr.push({
    //       data: {
    //         required: false,
    //         type: filterType,
    //         className: "form-control",
    //         label: "",
    //         placeholder: "",
    //         custom_column: custom_column,
    //         table_name: filterTitle,
    //       },
    //       show_type: {
    //         showType: filterShowType,
    //         name: filterShowTitle,
    //       },
    //     });
    //   }
    //   return arr;
    // });

    // setAllOpenTAbs2(arr);
  };

  const handleDragStart = (tbl, col, index) => {
    // setTable(tbl);
    // setColumn(col);
    // setIndexOfEl(index);
    // console.log(tbl);
    // console.log(col);
    // console.log(index);
    // setType(type);
    // settitle(title);
    // setMainType(show_type);
    // setMainTitle(mainTitle);
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
        handleDragDrop(table, column, indexOfEl);
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

  const handleRightTab = (table, column, indexOfEl) => {
    if (selectedColumn.length == 0) {
      // console.log("1", table);
      // console.log("2", column);
      // console.log("3", indexOfEl);
    }
    // let custom_column;
    // if (
    //   type == "all_course_enrolled" ||
    //   type == "completed_courses" ||
    //   type == "registered_courses" ||
    //   type == "total_courses" ||
    //   type == "total_users"
    // ) {
    //   custom_column = true;
    // } else {
    //   custom_column = false;
    // }
    // if (allOpenTabs2.length > 0 && allOpenTabs.length === 0) {
    //   let arrList = allOpenTabs2;
    //   let arrList2 = [];
    //   arrList.map((item, i) => {
    //     arrList2.push(item.data);
    //   });

    //   if (allOpenTabs.filter((e) => e.type === type).length === 0) {
    //     setAllOpenTAbs([
    //       ...arrList2,
    //       {
    //         required: false,
    //         type: type,
    //         className: "form-control",
    //         label: "",
    //         placeholder: "",
    //         custom_column: custom_column,
    //         table_name: title,
    //       },
    //     ]);
    //     setAllOpenTAbs2([
    //       ...allOpenTabs2,
    //       {
    //         data: {
    //           required: false,
    //           type: type,
    //           className: "form-control",
    //           label: "",
    //           placeholder: "",
    //           custom_column: custom_column,
    //           table_name: title,
    //         },
    //         show_type: {
    //           showType: showType,
    //           name: name,
    //         },
    //       },
    //     ]);
    //   }
    // } else {
    //   if (allOpenTabs.filter((e) => e.type === type).length === 0) {
    //     setAllOpenTAbs([
    //       ...allOpenTabs,
    //       {
    //         required: false,
    //         type: type,
    //         className: "form-control",
    //         label: "",
    //         placeholder: "",
    //         custom_column: custom_column,
    //         table_name: title,
    //       },
    //     ]);
    //     setAllOpenTAbs2([
    //       ...allOpenTabs2,
    //       {
    //         data: {
    //           required: false,
    //           type: type,
    //           className: "form-control",
    //           label: "",
    //           placeholder: "",
    //           custom_column: custom_column,
    //           table_name: title,
    //         },
    //         show_type: {
    //           showType: showType,
    //           name: name,
    //         },
    //       },
    //     ]);
    //   }
    // }
  };

  // const fetchData = async () => {
  //   if (allOpenTabs.length > 0) {
  //     if (startDate && endDate) {
  //       let data = JSON.stringify(allOpenTabs);
  //       let datefilter = JSON.stringify([
  //         {
  //           start_date: startDate,
  //           end_date: endDate,
  //         },
  //       ]);

  //       axios
  //         .post(
  //           `https://staging.trainingpipeline.com/backend/web/report-generate/generate?per-page=15&page=${page}`,
  //           { data, datefilter },
  //           {
  //             headers: {
  //               accept: "application/json",
  //             },
  //           }
  //         )
  //         .then(
  //           (res) => {
  //             setOpenTabData(res.data.payload);
  //             setResponseData(res.data);
  //           },
  //           (error) => {
  //             console.log(error);
  //           }
  //         );
  //     } else {
  //       let data = JSON.stringify(allOpenTabs);
  //       axios
  //         .post(
  //           `https://staging.trainingpipeline.com/backend/web/report-generate/generate?per-page=15&page=${page}`,
  //           { data },
  //           {
  //             headers: {
  //               accept: "application/json",
  //             },
  //           }
  //         )
  //         .then(
  //           (res) => {
  //             setOpenTabData(res.data.payload);
  //             setResponseData(res.data);
  //           },
  //           (error) => {
  //             console.log(error);
  //           }
  //         );
  //     }
  //   }
  // };

  const postQueryJson = async (jsonData) => {
    let queryjson = JSON.stringify(jsonData);
    axios
      .post(
        `https://staging.trainingpipeline.com/backend/web/mii/api/v1/mii-report/query-search?per-page=15&page=${page}`,
        { queryjson },
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then(
        (res) => {
          if (res.data !== undefined) {
            setRespSelectedColumn(res.data.payload);
            setResponseData(res.data);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    postQueryJson(queryjson);
  }, [page]);

  const fetchTableData = async () => {
    setSelectedColumn([]);
    await axios
      .get(
        `https://staging.trainingpipeline.com/backend/web/mii/applicant/get-tables`,
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then(
        (res) => {
          if (res.data.data !== undefined) {
            let tableData = Object.values(res.data.data);
            let related = [];
            related[0] = tableData;
            // remove this line
            // setRelatedAndTables(related)
            // setRelatedOrTables(related)

            let tmpAndFilter = [
              {
                tbl: "",
                related: [],
                relatedShow: [],
                col: [[], []],
                sum: [[]],
                count: [[]],
              },
            ];
            tmpAndFilter[0]["related"] = tableData;
            tmpAndFilter[0]["relatedShow"] = tableData;

            setTables([...tmpAndFilter]);
          }
        },
        (error) => {
          console.log("====error:", error);
        }
      );
  };

  const resetreportTitle = () => {
    setReportTitle(null);
  };

  // useEffect(() => {
  //   fetchData();
  // }, [allOpenTabs, page, endDate]);

  const handleChangePage = (event, value) => {
    // navigate(`/?page=${value}`);
    setPage(value);
    // if (allOpenTabs.length > 0) {
    //   setPage(value);
    // } else {
    //   setPage(1);
    // }
  };

  const closeTab = (table, column, index) => {
    if (index == null) return;
    let tmpFilter = [...tables];
    let tempSelectArr = [...tables[index]["col"][0]];
    tempSelectArr.splice(
      tables[index].col[0].findIndex((a) => a === column),
      1
    );
    tmpFilter[index]["col"][0] = tempSelectArr;
    setTables(tmpFilter);
    let arr = selectedColumn;
    arr.splice(
      selectedColumn.findIndex((a) => a.table === table && a.column === column),
      1
    );
    setSelectedColumn([...arr]);
    handleSelectColumn();
  };

  const getSaveData = async () => {
    axios
      .get(
        `https://staging.trainingpipeline.com/backend/web/report-generate/get-reports`,
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then(
        (res) => {
          if (res.data !== undefined) {
            setSaveReports([...res.data.reports]);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    fetchTableData();
    getSaveData();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      my={1}
      sx={{
        justifyContent: "center",
      }}
    >
      <ReportNavBar
        handleSavedReport={handleSavedReport}
        saveReports={saveReports}
        getSaveData={getSaveData}
      />
      <MainHead
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        allOpenTabs={allOpenTabs}
        setReportTitle={setReportTitle}
        reportTitle={reportTitle}
        queryjsonData={queryjson}
        getSaveData={getSaveData}
        pageNum={page}
        responseData={responseData}
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
          tables={tables}
          setTables={setTables}
          buildQueryJSON={buildQueryJSON}
          selectedColumn={selectedColumn}
          setSelectedColumn={setSelectedColumn}
          handleSelectColumn={handleSelectColumn}
          closeTab={closeTab}
          fetchTableData={fetchTableData}
          setReportTitle={setReportTitle}
          resetreportTitle={resetreportTitle}
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
          selectedColumn={selectedColumn}
          closeTab={closeTab}
          tables={tables}
          setTables={setTables}
          handleSelectColumn={handleSelectColumn}
          respSelectedColumn={respSelectedColumn}
        />
      </Box>
      <Box
        display="flex"
        sx={{
          justifyContent: "center",
        }}
      >
        {selectedColumn.length > 0 && (
          <Pagination
            count={selectedColumn.length > 0 ? responseData.pages : 1}
            variant="outlined"
            shape="rounded"
            // onChange={(e) => console.log(`/?page=${e}`,e.target)}
            onChange={handleChangePage}
          />
        )}
      </Box>
    </Box>
  );
};

export default ReportMainContainer;
