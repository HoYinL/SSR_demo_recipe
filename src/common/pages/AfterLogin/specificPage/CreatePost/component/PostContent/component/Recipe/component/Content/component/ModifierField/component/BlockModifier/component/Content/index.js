import React, { useState } from "react";
import InputField from "./component/InputBlock";

const InsertContentIconComponent = (props) => {
    const [type, setType ] = useState('');
    const [transform, setTransform] = useState(null);
    const [target, setTraget] = useState(null);

    return(
        <>
            <InputField 
                type={type}
                setType={setType}
                ListStylesObj={props.ListStylesObj}
                ulStylesObj={props.ulStylesObj}
                TextStylesObj={props.TextStylesObj}
                QuotesStylesObj={props.QuotesStylesObj}
                InputTextStyles={props.InputTextStyles}
                textContent={props.textContent}
                saveTextContent={props.saveTextContent}
                target={target}
                transform={transform}
                setTransform={setTransform}
                display={props.display}
            />
        </>
    )
};

export default InsertContentIconComponent