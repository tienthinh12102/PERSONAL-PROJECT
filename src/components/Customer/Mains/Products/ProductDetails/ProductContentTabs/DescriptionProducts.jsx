import React from "react";

const DescriptionProducts = (props) => {
  const { description, thumbnailUrl } = props;

  return (
    <div className="tabs__content--description">
      <p>
        {description}
      </p>
      <div className="images">
        <img
          alt="img"
          className="img4"
          src={thumbnailUrl[0]}
        />
        <img
          alt="img"
          className="img1"
          src={thumbnailUrl[1]}
        />
        <img
          alt="img"
          className="img4"
          src={thumbnailUrl[2]}
        />
      </div>
      <p>
        {description}
      </p>
    </div>
  );
};

export default DescriptionProducts;
