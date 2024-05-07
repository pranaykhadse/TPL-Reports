const TableData = [
  {
    title: "User",
    table_name: "tbl_user",
    fields: [
      "username",
      "email",
      "status",
      "lms_status",
      "course_status",
      "is_deleted",
      "primary_group",
      "all_course_enrolled",
      "completed_courses",
      "registered_courses",
    ],
  },
  {
    title: "Groups",
    table_name: "tbl_groups",
    fields: ["name", "is_group", "total_courses", "total_users"],
  },
  {
    title: "Courses",
    table_name: "tbl_courses",
    fields: [
      "name",
      "amount",
      "total_events",
      "total_classes",
      "total_users",
      "status",
      "group",
      "skills",
      "behaviours",
    ],
  },
];

export default TableData;
