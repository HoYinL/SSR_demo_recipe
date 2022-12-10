import { getImgElement } from "../../../../function";
import { getTextElement } from "../../../../function";

export const getElementChildren = (element) => {
    const savedData = [];
    if(element.props.children instanceof Array){
        element.props.children.map(child => {
            if(child.props.type == 'Img'){
                savedData.push(getImgElement(child));
            } else if(child.props.type == 'textContent'){
                savedData.push(getTextElement(child));
            } else {
                savedData.push(getElementChildren(child))
            }
        })
    } else if(element.props.children != null){
        element.props.children.props.type == 'Img' ? savedData.push(getImgElement(element.props.children)): savedData.push(getTextElement(element.props.children));
    } else if(element.props.children == null){
        return
    } else {
        return getElementChildren(element.props.children)
    }

    return savedData
};

export const isGridBlock = (target, className) => {
    let currentTarget = target;
    let isGridBlock = false;

    while(currentTarget != document.body){
        if(!currentTarget.classList.contains(className)){
            currentTarget = currentTarget.parentNode;
        } else {
            isGridBlock = currentTarget;
            break;
        }
    }

    return isGridBlock;
}