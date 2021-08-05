import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TabContext from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";
import { Paper } from "@material-ui/core";
import FormCategories from "./FormCategories";
import ListCategories from "./ListCategories";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Categories() {
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
            <Tab label="List Categories" value="1" />
            <Tab label="Add Categories" value="2" />
          </Tabs>
          <TabPanel value="1">
            <ListCategories />
          </TabPanel>
          <TabPanel value="2">
            <FormCategories onChangeTab={(tab) => {setValue(tab)}} />
          </TabPanel>
        </Paper>
      </TabContext>
    </div>
  );
}
