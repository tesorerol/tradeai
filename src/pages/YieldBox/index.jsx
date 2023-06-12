import React from "react";
import Summary from "./Summary";
import { useStyles, useTabPanelStyles } from "./styles";
import "./styles/index.scss";

const YieldBox = () => {
  const classes = useStyles();
  const panelClasses = useTabPanelStyles();

  const userStaked = () => {
    return (
      <div className={classes.root}>
        <div className={panelClasses.root}>
          <Summary />
        </div>
      </div>
    );
  };

  return <>{userStaked()}</>;
};

export default YieldBox;
