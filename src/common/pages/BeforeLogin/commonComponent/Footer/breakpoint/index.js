import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
    breakpoints: {
      values: {
       xs: 0,
       sm: 400,
       md: 700,
       lg: 900,
       xl: 1200,
       tablet:1024
     }
   }
});

export default theme