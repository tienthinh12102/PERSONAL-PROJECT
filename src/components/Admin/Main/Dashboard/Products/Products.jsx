import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TabContext from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";
import { Paper } from "@material-ui/core";
import ListProducts from "./ListProducts";
import FormProducts from "./FormProducts";
import "../style.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Products() {
  const classes = useStyles();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <TabContext value={value}>
        <Paper>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="List Products" value="1" />
            <Tab label="Add Products" value="2" />
          </Tabs>
          <TabPanel value="1">
            <ListProducts></ListProducts>
          </TabPanel>
          <TabPanel value="2">
            <FormProducts onChangeTab={(tab) => {setValue(tab)}}></FormProducts>
          </TabPanel>
        </Paper>
      </TabContext>
    </div>
  );
}
