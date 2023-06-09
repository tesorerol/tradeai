import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: '40px 50px 0',
    flexGrow: 1,
    '& .MuiPaper-root': {
      borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
      backgroundColor: 'black',
      color: 'white',
      '& .MuiTabs-root': {
        '& .MuiTab-root': {
          textTransform: 'none',
          fontSize: '14px',
          fontWeight: '600',
          lineHeight: '20px',
          [theme.breakpoints.down('sm')]: {
            minWidth: '100px',
          },
        },
        '& .MuiTabs-indicator': {
          height: '4px',
        },
        '& .Mui-selected': {
          color: '#A84DFF',
          opacity: 1,
          background: '#121327',
          borderRadius: '10px 10px 0px 0px',
        },
      },
    },
    '& .MuiAppBar-root': {
      backgroundColor: '#06071C',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '30px',
    },
  },
  pageTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: 600,
    fontSize: '32px',
    lineHeight: '45px',
    color: '#fff',
  },
  pageTitle2: {
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: 600,
    fontSize: '32px',
    lineHeight: '45px',
    color: '#fff',
    position: 'absolute',
    top: '50px',
    left: '80px',

    '@media only screen and (max-width: 1024px)': {
      top: '30px',
      left: '40px',
    },

    '@media only screen and (max-width: 768px)': {
      top: '30px',
      left: '20px',
    },
  },
  tabHeader: {
    '& .MuiAppBar-colorPrimary': {
      backgroundColor: 'none',
      color: 'white',
    },
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },
  },
  tabPanelWrap: {},
  formControlSelect: {
    display: 'none',
    width: '95%',
    background: '#222228',
    border: '1px solid #44454B',
    borderRadius: 4,

    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
      width: '100%',
    },
    [theme.breakpoints.only('xs')]: {
      display: 'block',
      width: '100%',
    },
  },

  banner: {
    minHeight: '100vh',
    '@media only screen and (max-width: 1459px)': {
      minHeight: 'unset',
    },
    '& img': {
      objectFit: 'contain',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        maxHeight: '100vh',
      },
    },
    '& video': {
      aspectRatio: '16/9',
      '@media only screen and (max-width: 1024px)': {
        objectFit: 'cover',
      },
    },
    '& iframe': {
      aspectRatio: '16/9',
    },
  },

  selectBox: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    lineHeight: '26px',
    color: '#FFFFFF',
    height: 40,
    width: '100%',

    '&::before, &::after': {
      display: 'none',
    },

    '& select': {
      paddingLeft: 12,
      paddingTop: 0,
      paddingBottom: 0,
      height: 25,
    },

    '& .MuiSelect-select option': {
      backgroundColor: '#222228',
    },

    '& .MuiSelect-icon': {
      color: '#FFFFFF',
      fontSize: 20,
      top: 'calc(50% - 10px)',
      right: 4,
    },
  },

  selectBoxType: {
    width: 120,
  },

  wrraper: {
    width: '100%',
    height: 'inherit',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
  },

  default: {
    backgroundImage: 'url(/images/nfts/bg-not-connect.png)',
    width: '100%',
    height: '90vh',
    backgroundSize: 'cover',
  },
}));

export const useTabPanelStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    padding: '40px 0 50px',
    // minHeight: '90vh',
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      padding: '16px 0',
    },
  },
}));
