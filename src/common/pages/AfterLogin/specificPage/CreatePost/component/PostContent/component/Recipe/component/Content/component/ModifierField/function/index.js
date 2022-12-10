export const getImgElement = (element) => {
    const imgData = [];
    (element);
    if(element.props.children instanceof Array){
        element.props.children.map(child => {
            return child.props.type == 'textContent'? imgData.push(getTextElement(child)) : imgData.push(getImgElement(child))
        });
    } else if(element.props.children === null){
        return element.props
    } else {
        return getImgElement(element.props.children)
    }

    return imgData
}

export const getTextElement = (element) => {
    if(element.type == 'ul'){
        return getULElement(element)
    }
    if(element == null) return
    if(element instanceof Array){
        const content = [];
        element.map((child) => {
            if(element != null){
                content.push(getTextElement(child))
            }
        });
        const obj = {blocktype: `${content[0]?.blocktype}`, children: content}
        return obj
    }
    if((element.props?.children instanceof Array && element.props.id != 'text')){
        let target = null;
        element.props.children.map((child) => {
            if(child.props?.children != null){
                target = getTextElement(child.props.children);
            }
        })
        return target
    } else if(element.props?.children != null && element.props.id != 'text'){
        return getTextElement(element.props.children)
    } else if (element.props?.children == null){
        return null
    } else if (element.props.id == 'text'){
        return element.props
    }
}

export const getULElement = (element) => {
    const ulText = [];
    if(element.props.children instanceof Array){
        element.props.children.map((child) => {
            ulText.push(getTextElement(child));
        })
    }
    return ulText
}