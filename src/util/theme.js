const theme = {
  palette: {
    primary: {
      light: "#97daea", //"#1e88e5",
      main: "#1e88e5",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#d81b60",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
  spreadThis: {
    typography: {
      useNextVariants: true,
    },
    loginWrapper: {
      textAlign: "center",
      backgroundColor: "#011324",
      minHeight: "100vh",
    },
    underline: {
      color: "white",
      borderBottom: "white",
      backgroundColor: "transparent",
      root: {
        background: "transparent",
      },
      "&:before": {
        borderBottomColor: "white",
      },
      "&:after": {
        borderBottomColor: "white",
      },
      "&:hover:before": {
        borderBottomColor: ["white", "!important"],
      },
    },
    textSecondary: {
      color: "rgb(199, 225, 230)",
    },
    button: {
      marginTop: 20,
      position: "relative",
    },
    imageLogin: {
      margin: "20px auto 20px auto",
      maxWidth: 100,
    },
    cardLogin: {
      padding: "50px 30px",
      background:
        "linear-gradient(180deg, rgba(0,14,27,1) 39%, rgba(11,60,73,1) 73%, rgba(3,112,139,1) 100%);",
      color: "#fff",
      borderRadius: "10px",
    },
    loginTitle: {
      fontFamily: "Cinzel-Regular",
      padding: 20,
    },
    labelUnderline: {
      color: "#fff",
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
    },
    root: {
      display: "flex",
      position: "relative",
    },
    // link: {
    //   textDecoration: "none",
    //   color: theme.palette.text.primary,
    // },
    card: {
      display: "inline-block",
      //backgroundColor: "#002039",
      background:
        "linear-gradient(180deg, rgba(0,14,27,1) 39%, rgba(11,60,73,1) 73%, rgba(3,112,139,1) 100%);",
      color: "#fff",
      width: "24%",
      minHeight: "361px",
      marginRight: "1%",
      marginBottom: "1%",
      position: "relative",
    },
    selectedCard: {
      "& .MuiCard-root": {
        background:
          "linear-gradient( 180deg, rgba(2, 22, 24, 1) 16%, rgba(3, 39, 51, 1) 42%, rgba(4, 80, 111, 1) 62%, rgba(8, 187, 230, 1) 80%, rgba(1, 160, 172, 1) 100%)",
      },
    },
    cardHeading: {
      color: "#FFF",
      textTransform: "uppercase",
    },
    capitalize: {
      textTransform: "capitalize",
    },
    image: {
      height: "130px",
      width: "130px",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50% 50%",
      margin: "18px auto 0",
      borderRadius: "100%",
    },
    textAlignCenter: {
      textAlign: "center",
    },
    progress: {
      position: "absolute",
    },
    capitalize: {
      textTransform: "capitalize",
    },
    inlineBlock: {
      display: "inline-block",
    },
    rightCommonSpace: {
      marginRight: "15px",
    },
    bottomCommonSpace: {
      marginBottom: "15px",
    },
    rootButton: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      borderRadius: "3px",
      border: "0px",
      color: "#fff",
      padding: "2px",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
    
  },
};

export default theme;
