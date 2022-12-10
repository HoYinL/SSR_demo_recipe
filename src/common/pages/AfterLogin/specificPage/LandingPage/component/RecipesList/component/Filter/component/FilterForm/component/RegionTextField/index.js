import React, { useState } from "react";
import Regions from "./component/Regions";
import Countries from "./component/Countries";

const RegionComponent = (props) => {
    const [ displayCountries, setDisplayCountries ] = useState(false);
    const [ region, setRegion ] = useState(null);
    const [ delete_region, setDeleteRegion ] = useState('');

    const setRegionState = (value) => {
        setRegion(value);
        setDisplayCountries(true);
    }

    return(
        <>
            <Regions 
                function={setRegionState}
                setDeleteRegion={setDeleteRegion}
                setDisplayCountries={setDisplayCountries} 
                setFilters={props.setFilters} 
                filters={props.filters}
                delete_region={delete_region}
            />
            { displayCountries == true && 
                <Countries 
                    region={region} 
                    setFilters={props.setFilters} 
                    filters={props.filters}
                    delete_region={delete_region}
                /> 
            }
        </>
    )
}

export default RegionComponent