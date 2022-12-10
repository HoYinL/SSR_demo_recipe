import React, { useState, useEffect } from "react";
import UpslashInput from "./component/Input";
import UpslashImgOutput from "./component/Output"

const ImgFromUpslashComponent = (props) => {
    const [ displayOutput, setDisplayOutput ] = useState(false);
    const [ displayUpslashImg, setDisplayUpslashImg ] = useState(null);
    const [ searchItem, setSearchItem ] = useState('');
    const [ totalImg, setTotalImg ] = useState(0);
    const [ totalPages, setTotalPages ] = useState(0);

    return(
        <>
            {
                displayOutput == false && 
                    <UpslashInput 
                        setSearchItem={setSearchItem}
                        setDisplayUpslashImg={setDisplayUpslashImg}
                        setDisplayOutput={setDisplayOutput}
                        setTotalImg={setTotalImg}
                        setTotalPages={setTotalPages}
                    />
            }
            { 
                displayOutput && 
                    <UpslashImgOutput 
                        searchItem={searchItem} 
                        setDisplayUpslashImg={setDisplayUpslashImg}
                        displayImg={displayUpslashImg}
                        setDisplayUpslash={props.setDisplayUpslash}
                        displayUpslash={props.displayUpslash} 
                        setSelectedImg={props.setDisplayImg}
                        totalImg={totalImg}
                        totalPages={totalPages}
                        setDisplayLine={props.setDisplayLine}
                        setIsUpslash={props.setIsUpslash}
                        setDefaultCaption={props.setDefaultCaption}
                    />
            }
        </>
    )
};

export default ImgFromUpslashComponent