import React, { useState, useEffect } from "react";
import { Card, Box } from "@mui/material";
import DishNameForm from "./component/DishNameForm";
import DescriptionForm from "./component/DescriptionForm";
import TagForm from "./component/TagForm";
import BackgroundImgForm from "./component/BackgroundImg";
import { FormStyle } from "./style";
import { CreateObjectStore, SaveObjectStore, DeleteObjectStore } from "./function";
import { useDispatch, useSelector } from "react-redux";
import { setFeature } from "../../../../../../store/featurereducer";

const CreatePostFeaturesComponent = (props) => {
    const formStyle = FormStyle();
    const dispatch = useDispatch();

    const [ dishName, setDishName ] = useState('');
    const [ savedDishName, setSavedDishName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ savedDescription, setSavedDescription ] = useState('');
    const [ tagList, setTagList ] = useState([]);
    const [ savedTagList, setSavedTagList ] = useState([]);
    const [ backgroundImg, setBackgroundImg ] = useState('');
    const [ savedBackgroundImg, setSavedBackgroundImg ] = useState('');
    const [ saveLocalData, setSaveLocalData ] = useState(null);
    const [ localSavedData, setLocalSavedData ] = useState(null);

    const user = useSelector(state => state.token.token_payload);

    useEffect(() => {
        const unloadCallback = async (event) => {
            if(!navigator.onLine){
                await Promise.resolve().then((res) => {
                    SaveObjectStore(
                        'local_save_data', 
                        'save_data',
                        dishName? dishName: savedDishName,
                        description? description: savedDescription,
                        backgroundImg? backgroundImg: savedBackgroundImg,
                        tagList.length != 0? tagList: savedTagList
                    )
                })

                event.preventDefault();
                event.returnValue = "";
                return "";
            }
        };

        window.addEventListener("beforeunload",
            unloadCallback
        );

        return () => window.removeEventListener("beforeunload",
            unloadCallback
        );
    }, [props.postData]);

    useEffect(() => {
        CreateObjectStore('local_save_data', 'save_data', setLocalSavedData, setSaveLocalData)
    }, [])

    useEffect(() => {
        if(localSavedData != null){
            setSavedDishName(localSavedData.dish_name);
            setSavedDescription(localSavedData.description);
            setSavedBackgroundImg(localSavedData.backgroundImg);
            setSavedTagList(localSavedData.tagList)
            setTagList(localSavedData.tagList)
        }
    }, [localSavedData])

    useEffect(() => {
        if(saveLocalData != null && user != null) {
            saveLocalData == true && DeleteObjectStore('local_save_data', 'save_data');
        }
    }, [saveLocalData, user]);

    useEffect(() => {
        if (props.saveFeature != undefined && props.saveFeature != null) {
            setSavedDishName(props.saveFeature.dish_name);
            setSavedDescription(props.saveFeature.description);
            setSavedBackgroundImg(props.saveFeature.backgroundImg);
            setSavedTagList(props.saveFeature.tagList);
            setTagList(props.saveFeature.tagList);
        }
    }, [props.saveFeature]);

    useEffect(() => {
        if (props.setPostData != undefined)
            props.setPostData({
                dishName: dishName ? dishName : savedDishName,
                description: description ? description : savedDescription,
                backgroundImg: backgroundImg ? backgroundImg : savedBackgroundImg,
                tagList: tagList.length != 0 ? tagList : savedTagList,
                userId: user != null && user.id,
                url: window.location.pathname
            });
    }, [dishName, description, backgroundImg, tagList, user])

    useEffect(() => {
        if(props.postData != undefined && props.postData.length != 0){
            dispatch(setFeature(props.postData));
        }
    }, [props.postData]);

    return (
        <Card className={formStyle.root}>
            <DishNameForm savedDishName={savedDishName} setDishName={setDishName} />
            <DescriptionForm savedDescription={savedDescription} setDescription={setDescription} />
            <TagForm savedTagList={savedTagList} tagList={tagList} setTagList={setTagList} />
            <BackgroundImgForm savedBackgroundImg={savedBackgroundImg} backgroundImg={backgroundImg} setBackgroundImg={setBackgroundImg} />
        </Card>
    )
}

export default CreatePostFeaturesComponent