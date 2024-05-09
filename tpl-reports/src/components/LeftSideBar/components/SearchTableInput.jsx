import React from 'react'

import TextField from "@mui/material/TextField";


const SearchTableInput = () => {
  return (
    <TextField
              id="outlined-basic"
              placeholder="Search Tables/Column"
              variant="outlined"
              sx={{ width: "100%" }}
            />
  )
}

export default SearchTableInput