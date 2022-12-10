const getPropertyStyle = (target, property) => {
    const computedStyles = window.getComputedStyle(target);

    return computedStyles.getPropertyValue(property);
};

export const getPropertyStyleValue = (target, property) => {
    const propertyStyle = getPropertyStyle(target, property);
    const propertyStyleValue = Number(propertyStyle.slice(0, propertyStyle.length - 2));

    return propertyStyleValue
};

export const fun = (originalClientX, verticalDividingLine) => {
    let latestClientX = Math.floor(originalClientX.clientX);

    return (e) => {
        let currentClientX = (e.clientX || e.touches[0].clientX);
        let clientXDistance = currentClientX - latestClientX;

        verticalDividingLine.style.transform = `translateX(${clientXDistance}px)`;
    };
};

export const modifyWidth = (target, value, flexBlockContainer) => {
    const flexBlockContainerWidth = getPropertyStyleValue(flexBlockContainer, 'width');
    const percentage = `${value/flexBlockContainerWidth * 100}%`;

    if(target.id == 'flexBlockImg'){
        //target.style.maxWidth = percentage; 
        target.style.maxWidth = `100%`; 
        target.style.width = `${value}px`; 
    } else {
        target.style.width = `${value}px`; 
        target.style.minWidth = `0px`; 
    };
};

export const resizeFlex = (
    clientX, 
    originalclientX,
    flexBlockImg,
    flexBlockImgModifier,
    contentField,
    flexBlockContainer,
    verticalDividingLine,
) => {

    const scrolledDistance = Math.floor(clientX - originalclientX);

    const flexBlockImgWidth = getPropertyStyleValue(flexBlockImg, 'width');
    const contentFieldWidth = getPropertyStyleValue(contentField, 'width');

    if(scrolledDistance > 0){
        const flexBlockImgBigger = flexBlockImgWidth + Math.abs(scrolledDistance);
        const ContentFieldSmaller = contentFieldWidth - Math.abs(scrolledDistance);

        modifyWidth(flexBlockImg, flexBlockImgBigger, flexBlockContainer);
        modifyWidth(contentField, ContentFieldSmaller, flexBlockContainer);

        if(flexBlockImgModifier) flexBlockImgModifier.style.width = '100%';

    } else if (scrolledDistance < 0){
        const flexBlockImgSmaller = flexBlockImgWidth - Math.abs(scrolledDistance);
        const ContentFieldBigger = contentFieldWidth + Math.abs(scrolledDistance);

        modifyWidth(flexBlockImg, flexBlockImgSmaller, flexBlockContainer);
        modifyWidth(contentField, ContentFieldBigger, flexBlockContainer);

        if(flexBlockImgModifier && (flexBlockImgModifier.offsetLeft + flexBlockImgModifier.offsetWidth) < verticalDividingLine.offsetLeft && flexBlockContainer.style.width != ''){
            const flexBlockImgModifierWidth = flexBlockImgModifier.offsetLeft + flexBlockImgModifier.offsetWidth;

            flexBlockImgModifier.style.width = `${flexBlockImgModifierWidth - Math.abs(flexBlockImgModifier.offsetLeft < verticalDividingLine.offsetLeft)}px`;
        };
    }
};