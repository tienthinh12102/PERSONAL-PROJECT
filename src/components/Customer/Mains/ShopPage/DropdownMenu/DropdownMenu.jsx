import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const DropdownMenu = (props) => {
  const classes = useStyles();
  const { categories, onChangeFindCategory, onChangeSortPrice } = props;
  const [value, setValue] = useState("");
  const [sort, setSort] = useState("")

  const element = categories.map(category => (
    <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>
  ));

  function onHandleChangeCategory(event) {
    setValue(event.target.value);

    if (onChangeFindCategory) {
      onChangeFindCategory(event.target.value)
    }
  }

  function onHandleChangeSort(event) {
    setSort(event.target.value);
    if (onChangeSortPrice) onChangeSortPrice(event.target.value);
    return;
  }

  return (
    <div className="dropdownmenu">
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Find By Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={onHandleChangeCategory}
        >
          <MenuItem value="all">All</MenuItem>
          {element}
        </Select>
      </FormControl>
      <div className="dropdown">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Sort By Price</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sort}
            onChange={onHandleChangeSort}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="asc">ASC</MenuItem>
            <MenuItem value="desc">DESC</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default DropdownMenu;
