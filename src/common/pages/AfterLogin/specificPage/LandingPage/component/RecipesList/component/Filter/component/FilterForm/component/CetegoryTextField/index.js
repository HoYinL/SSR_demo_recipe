import React, { useState, useEffect } from "react";
import Category from "./Category";
import Ingrediant from "./Ingrediant";

const CategoryComponent = (props) => {
    const [ displayIngrediant, setDisplayIngrediant ] = useState(false);
    const [ ingrediantType, setIngrediantType ] = useState('');
    const [ delete_category, setDeleteCategory ] = useState('');

    const display = (e) => {
        setDisplayIngrediant(true);
        setIngrediantType(e.target.value);
    }

    return (
        <>
            <Category 
                function={display} 
                setDeleteCategory={setDeleteCategory}
                setDisplayIngrediant={setDisplayIngrediant}
                setFilters={props.setFilters} 
                filters={props.filters}
            />

            { displayIngrediant == true && 
                <Ingrediant 
                    type={ingrediantType} 
                    setFilters={props.setFilters} 
                    filters={props.filters}
                    delete_category={delete_category}
                /> 
            }
        </>
    )
}

export default CategoryComponent