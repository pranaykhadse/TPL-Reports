import { MenuItem } from '@mui/material';
import React from 'react'
import { useMemo } from 'react';

const MenuItemComponent = (props) => {
    const containsText = (text, searchText) =>
        text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    const displayedOptions = useMemo(
        () => props.menuItem.filter((option) => containsText(option, props.searchText)),
        [props.searchText]
      );


  return (
    displayedOptions.length > 0
        ? displayedOptions.map((option, i) => (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>
          ))
        : props.menuItem.map((option, i) => (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>
          ))
  )
}

export default MenuItemComponent