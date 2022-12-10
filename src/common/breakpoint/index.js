import { createTheme } from "@material-ui/core/styles";

const values = {
};

const breakpointValues = (values) => {
    for(let size = 1; size <= 6000; size += 20){
        values[`_${size-1}`] = size; 
    }
}
breakpointValues(values)

const theme = createTheme({
    breakpoints: {
        values
      },
})

export default theme