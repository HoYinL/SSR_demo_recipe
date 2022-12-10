function isChildElement(target, parent){
    let element = target;
    let isChildElement = true;

    while(element != parent){
        element = element.parentNode;
        if(element == document.body){
            isChildElement = false;
            break
        }
        if(element == parent) break;
    }

    return isChildElement 
}

export { isChildElement }