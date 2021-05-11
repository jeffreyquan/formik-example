import { createMuiTheme } from "@material-ui/core/styles";

// https://type-scale.com/
// Base size - 10px, Scale - 1.250 Major Third
export const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10,
    h1: {
      fontSize: "1.953rem",
    },
    h2: {
      fontSize: "1.563rem",
    },
    h3: {
      fontSize: "1.25rem",
    },
    h4: {
      fontSize: "1rem",
    },
    h5: {
      fontSize: "0.8rem",
    },
    h6: {
      fontSize: "0.64rem",
    },
    body1: {
      fontSize: "1.4rem",
    },
    body2: {
      fontSize: "1.4rem",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          fontSize: "62.5%",
        },
      },
    },
  },
});
