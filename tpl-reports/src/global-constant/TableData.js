const TableData = [
  {
    title: "User",
    table_name: "tbl_user",
    // fields: [
    //   "username",
    //   "email",
    //   "status",
    //   "lms_status",
    //   "course_status",
    //   "is_deleted",
    //   "primary_group",
    //   "all_course_enrolled",
    //   "completed_courses",
    // ],
    fields: [
      ["username","User Name"],
      ["email","Email"],
      ["status","Status"],
      ["lms_status","Lms Status"],
      ["course_status","Course Status"],
      ["is_deleted","Is Deleted"],
      ["primary_group","Primary Group"],
      ["all_course_enrolled","All Courses Enrolled"],
      ["completed_courses","Completed Courses"],
    ],
  },
  {
    title: "Groups",
    table_name: "tbl_group",
    fields: [["name","Name"], ["is_group","Is Group"], ["total_courses","Total Courses"], ["total_users","Total Users"]],
  },
  {
    title: "Courses",
    table_name: "tbl_course",
    fields: [
      ["name","Name"],
      ["amount","Amount"],
      ["total_events","Total Events"],
      ["total_classes", "Total Classes"],
      ["total_users","Total Users"],
      ["status","Status"],
      ["group","Group"],
      ["skills","Skills"],
      ["behaviours","Behaviours"],
    ],
  },
];

export default TableData;
