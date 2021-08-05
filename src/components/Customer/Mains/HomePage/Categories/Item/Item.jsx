import { Grid, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

Item.propTypes = {
  categories: PropTypes.array,
  loading: PropTypes.bool,
}

Item.defaultProps = {
  categories: [],
}

const useStyles = makeStyles((theme) => ({
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#fff",
    margin: "0 1rem",
    cursor: "pointer",
  },
}));

function Item(props) {
  const { categories } = props;
  const classes = useStyles();
  let i = 1;

  const element = categories.slice(0, 3).map(category => (
    <React.Fragment key={category.id}>
      <Grid item xs={4} className={`${classes.center} category__hover`}>
        <img
          src={process.env.PUBLIC_URL + `images/categories-${i++}.jpeg`}
          alt={category.image}
          className="category__img"
        />
        <h2 className="category__title">{category.name}</h2>
        <p className="category__count">(30 Items)</p>
      </Grid>
    </React.Fragment >
  ))

  return (
    <React.Fragment>
      <Grid container spacing={3} wrap="nowrap">
        {element}
      </Grid>
    </React.Fragment>
  );
}

export default Item;
