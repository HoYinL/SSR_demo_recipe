import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { InsertDeleteIconStyles } from "../../../style";

const FileInputComponent = (props) => {
    const insertDeleteIconStyle = InsertDeleteIconStyles();

    useEffect(() => {
        if (typeof window != 'undefined') {
            const fileReader = new window.FileReader();
            const file = document.getElementById(props.id);

            file.addEventListener("change", function(event) {
                fileReader.readAsDataURL(this.files[0]);
            })

            fileReader.addEventListener('load', () => {
                props.setDisplayImg(fileReader.result);
            });
        }
    }, []);

    return (
        <>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id={props.id}
                multiple
                type="file"
            />

            <label htmlFor={props.id}>
                <Box
                    title="add iamge from file"
                    className={`fa fa-file-image-o ${insertDeleteIconStyle.type}`}
                    sx={{ color: 'grey', width: '2rem' }}
                />
            </label>
        </>

    )
}

export default FileInputComponent