import React, { useState, useEffect } from "react";
import FilterBlock from "./component/FilterBlock";
import FilterForm from "./component/FilterForm";
import { DocumentOverflow } from "../../../../../../../CommonComponent/Appbar/style";

const FilterComponent = () => {
    const [ displayForm, setDisplayForm ] = useState(false)

    const documentOverflow = DocumentOverflow();

    const handleOnClick = () => {
        setDisplayForm(!displayForm)
    }

    useEffect(() => {
        if(displayForm == true) document.body.classList.add(documentOverflow.hidden)
        else document.body.classList.remove(documentOverflow.hidden)
    }, [displayForm])

    return(
        <>
            <FilterBlock function={handleOnClick}/>
            { displayForm == true && <FilterForm function={handleOnClick} />}
        </>
    )
}

export default FilterComponent