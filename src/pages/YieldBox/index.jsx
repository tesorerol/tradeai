import { createStyles, withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { Select, Tooltip } from "antd";
import React from "react";
import { useStyles, useTabPanelStyles } from "./styles";
import "./styles/index.scss";
import Summary from "./Summary";
import useWindowSize from '../../hooks/useWindowSize'

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) =>
  createStyles({
    root: {
      textTransform: "none",
      fontFamily: "Montserrat-Regular",
      fontWeight: 400,
      color: "#fff",
      opacity: 0.6,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      "&:hover": {
        cursor: "pointer",
        opacity: 1,
      },
    },
  })
)((props) => <Tab disableRipple {...props} />);

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  const classes = useTabPanelStyles();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className={classes.root}>{children}</div>}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const TAB_NAMES = ["Summary", "Reward"];


const YieldBox = () => {
  const classes = useStyles();
  const { width } = useWindowSize();

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    console.log({ newValue });
    setValue(newValue);
  };

  const userStaked = () => {
    return (
      <div className={classes.root}>
        <h1 className={classes.pageTitle}>
          Yield Box
          <Tooltip
            placement="bottom"
            title={
              <div>
                <div className="t-text1">How does the yieldbox work?</div>
                <div className="t-text2">
                  Each XBorg you hold gives you a share of the yieldbox.
                </div>
                <div className="t-text2">
                  Meaning the more you own, the more you earn.
                </div>
                <div className="t-text2">
                  Different tiers have different multipliers.
                </div>
                <div className="t-text2">
                  Please make sure to check{" "}
                  <span
                    style={{
                      color: "#0961FE",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() =>
                      window.open(
                        "https://medium.com/@VispX/yield-box-a20b61ae6091",
                        "_blank"
                      )
                    }
                  >
                    the info.
                  </span>{" "}
                </div>
              </div>
            }
            overlayClassName="custom-tooltip"
          >
            <img
              src="/images/icons/icon-tooltip.svg"
              alt="icon"
              style={{ marginLeft: 11 }}
            />
          </Tooltip>
        </h1>
        {width < 600 && (
          <div className="select-section-mobile">
            <Select
              className="select-yield-box-mobile"
              dropdownClassName="select-yield-box-mobile-popup"
              value={value}
              style={{ width: 120 }}
              onChange={(value) => setValue(value)}
              options={[
                {
                  value: 0,
                  label: "Summary",
                },
                {
                  value: 1,
                  label: "Reward",
                },
              ]}
            />
          </div>
        )}

        <AppBar className={classes.tabHeader} position="static">
          <StyledTabs value={value} onChange={handleChange}>
            {TAB_NAMES.map((element, index) => {
              return (
                <StyledTab
                  key={element}
                  label={element}
                  {...a11yProps(index)}
                />
              );
            })}
          </StyledTabs>
        </AppBar>
        <TabPanel key={value} value={value} index={value}>
          {value === 0 && <Summary />}
          {/* {value === 1 && <Reward />} */}
        </TabPanel>
      </div>
    );
  };

  return <>{userStaked()}</>;
};

export default YieldBox;
