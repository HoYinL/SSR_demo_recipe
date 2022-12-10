import { getPropertyStyleValue } from "../../../BlockModifier/FlexModifier/function";

const getPropertyStyle = (target, property) => {
    const computedStyles = window.getComputedStyle(target);

    return computedStyles.getPropertyValue(property);
}

const setImgBlockSize = (target, imgPreviewBlock, height_value, width_value) => {

    if(target.id != `imgPreviewBlock`){
        target.style.maxHeight = height_value;
        target.style.width = width_value;
        target.style.height = height_value;
    }

    setTimeout(() => {
        imgPreviewBlock.style.width = `100%`;
        imgPreviewBlock.style.height = `100%`;
    }, 0);
}

const setElementWidth = (imgBlock, imgPreviewBlock) => {
    const PreviewBlockWidth = getPropertyStyle(imgPreviewBlock, 'width');
    const PreviewBlockHeight = getPropertyStyle(imgPreviewBlock, 'height');

    (PreviewBlockWidth)

    setImgBlockSize(imgBlock.getElementsByClassName('imgBox')[0], imgPreviewBlock, PreviewBlockHeight, PreviewBlockWidth);
    setImgBlockSize(imgBlock, imgPreviewBlock, PreviewBlockHeight, PreviewBlockWidth);
    setImgBlockSize(imgPreviewBlock, imgPreviewBlock, PreviewBlockHeight, PreviewBlockWidth);
};

function resizeHandler(cb, imgBlock, imgPreviewBlock, Img_Block){
    // 1. 
    const contentContainer = document.getElementById('content_container');

        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            contentContainer.addEventListener('touchmove', cb);
            document.body.style.overflowY = 'hidden';

            document.addEventListener('touchend', () => {
                setElementWidth(imgBlock, imgPreviewBlock, Img_Block);
                contentContainer.removeEventListener('touchmove', cb);
                document.body.style.overflowY = '';
            }, {once: true});
        } else {
            contentContainer.addEventListener('pointermove', cb);

            document.addEventListener('pointerup', () => {
                setElementWidth(imgBlock, imgPreviewBlock, Img_Block);
                contentContainer.removeEventListener('pointermove', cb);
            }, {once: true});
        }
}

function setPosition(target, top, right, bottom, left){
    target.style.top = top;
    target.style.right = right;
    target.style.bottom = bottom;
    target.style.left = left;
}

const imgResize = {
    vertical_resize: function(clientXY, ele_Direction, imgBlock, imgPreviewBlock, Img_Block) {
        let initial_clientX = clientXY['clientX'];
        let ele = ele_Direction;

        function closure_fun(initialClientX, ele, imgPreviewBlock){
            let initial_clientX = initialClientX;
            const height = getPropertyStyle(imgPreviewBlock, 'height');

            imgPreviewBlock.style.right = (ele == 'W'? '0px' : ele == 'E'? 'unset': null);
            imgPreviewBlock.style.left = (ele == 'W'? 'unset': ele == 'E'? '0px': null);

            return (e) => {
                ('diu');
                const img_width_value = getPropertyStyleValue(imgPreviewBlock, 'width')
                const currentX = (e.clientX || e.touches[0].clientX );

                if(currentX > initial_clientX){
                    const distance = currentX - initial_clientX;
                    imgPreviewBlock.style.width = (ele == 'W'? `${img_width_value - distance}px`: ele ==  'E'? `${img_width_value + distance}px`: null);
                    imgPreviewBlock.style.height = height;
                } else {
                    const distance = initial_clientX - currentX;
                    imgPreviewBlock.style.width = (ele == 'W'? `${img_width_value + distance}px`: ele ==  'E'? `${img_width_value - distance}px`: null);
                    imgPreviewBlock.style.height = height;
                }

                initial_clientX = currentX;
            }
        }

            const resizeVertically = closure_fun(initial_clientX, ele, imgPreviewBlock)
        
            resizeHandler(resizeVertically, imgBlock, imgPreviewBlock, Img_Block);
        }, 

    horizontal_resize: function(clientXY, ele_Direction, imgBlock, imgPreviewBlock, Img_Block) {
            let initial_clientY = clientXY['clientY'];
            let ele = ele_Direction;
    
            const width = getPropertyStyle(imgPreviewBlock, 'width');

            function closure_fun(initialClientY, ele, imgPreviewBlock){
                let initial_clientY = initialClientY;

                imgPreviewBlock.style.top = (ele == 'S'? '0px': ele == 'N'? 'unset': null);
                imgPreviewBlock.style.bottom = (ele == 'S'? 'unset': ele == 'N'? '-4px': null);
    
                return (e) => {
                    (getPropertyStyle(imgPreviewBlock, 'width'));
                    const img_height_value = getPropertyStyleValue(imgPreviewBlock, 'height');
                    const currentY = (e.clientY || e.touches[0].clientY);

                    if(currentY > initial_clientY){
                        const distance = currentY - initial_clientY;
                        imgPreviewBlock.style.height =  (ele == 'S'? `${img_height_value + distance}px`: ele == 'N'? `${img_height_value - distance}px`: null);
                        imgPreviewBlock.style.width = width;
                    } else {
                        const distance = initial_clientY - currentY;
                        imgPreviewBlock.style.height = (ele == 'S'? `${img_height_value - distance}px`: ele == 'N'? `${img_height_value + distance}px`: null);
                        imgPreviewBlock.style.width = width;
                    }
    
                    initial_clientY = currentY;
                }
            }
    
            const resizeHorizontally = closure_fun(initial_clientY, ele, imgPreviewBlock)
            
            resizeHandler(resizeHorizontally, imgBlock, imgPreviewBlock, Img_Block);
    },

    slash_resize: function(clientXY, ele_Direction, imgBlock, imgPreviewBlock, Img_Block){
        let initial_clientX = clientXY['clientX'];
        let initial_clientY = clientXY['clientY'];
        let ele = ele_Direction;

        function closure_fun(
            initialClientX, 
            initialClientY, 
            eleDirection, 
            imgPreviewBlock
        ){
            initial_clientX = initialClientX;
            initialClientY = initialClientY;
            ele = eleDirection;

            switch(ele){
                case 'NW':
                    setPosition(imgPreviewBlock, 'unset', '0px', '-4px', 'unset');
                    break;
                case 'NE':
                    setPosition(imgPreviewBlock, 'unset', 'unset', '0px', '0px');
                    break;
                case 'SW':
                    setPosition(imgPreviewBlock, '0', '0px', 'unset', 'unset');
                    break;
                case 'SE':
                    setPosition(imgPreviewBlock, '0', 'unset', 'unset', '0px');
                    break;

            }

            return (e) => {
                const widthHeightLarger = closure_resizeBox(e, initial_clientX, initial_clientY, 'widthHeightLarger', imgPreviewBlock);
                const widthHeightSmaller = closure_resizeBox(e, initial_clientX, initial_clientY, 'widthHeightSmaller', imgPreviewBlock);
                const widthLargerHeightSmaller = closure_resizeBox(e, initial_clientX, initial_clientY, 'widthLargerHeightSmaller', imgPreviewBlock);
                const widthSmallerHeightLarger = closure_resizeBox(e, initial_clientX, initial_clientY, 'widthSmallerHeightLarger', imgPreviewBlock);
                const widthLarger = closure_resizeBox(e, initial_clientX, initial_clientY, 'widthLarger', imgPreviewBlock);
                const widthSmaller = closure_resizeBox(e, initial_clientX, initial_clientY, 'widthSmaller', imgPreviewBlock);
                const heightLarger = closure_resizeBox(e, initial_clientX, initial_clientY, 'heightLarger', imgPreviewBlock);
                const heightSmaller = closure_resizeBox(e, initial_clientX, initial_clientY, 'heightSmaller', imgPreviewBlock);

                let currentX = (e.clientX || e.touches[0].clientX);
                let currentY = (e.clientY || e.touches[0].clientY);

                switch(ele){
                    case 'NW':
                    // 181deg to 359deg
                        currentX < initial_clientX && 
                            (currentY < initial_clientY? widthHeightLarger(): widthLargerHeightSmaller());
                    // 1deg to 179deg
                        currentX > initial_clientX && 
                            (currentY < initial_clientY? widthSmallerHeightLarger(): widthHeightSmaller());
                    // 0deg
                    // y-axis
                        currentX === initial_clientX &&
                            (currentY < initial_clientY? heightLarger(): heightSmaller());
                    // 90deg
                    // x-axis
                        currentY === initial_clientY &&
                            (currentX < initial_clientX ? widthLarger(): widthSmaller());
                        
                    break;

                    case 'NE':
                    // 181deg to 359deg
                        currentX < initial_clientX && 
                            (currentY < initial_clientY? widthSmallerHeightLarger(): widthHeightSmaller());
                    // 1deg to 179deg
                        currentX > initial_clientX && 
                            (currentY < initial_clientY? widthHeightLarger(): widthLargerHeightSmaller());
                    // 0deg
                    // y-axis
                        currentX === initial_clientX &&
                            (currentY < initial_clientY? heightLarger(): heightSmaller());
                    // 90deg
                    // x-axis
                        currentY === initial_clientY &&
                            (currentX < initial_clientX ? widthSmaller(): widthLarger());
                    break;

                    case 'SW':
                    // 181deg to 359deg
                        currentX < initial_clientX && 
                            (currentY < initial_clientY? widthLargerHeightSmaller():widthHeightLarger());
                    // 1deg to 179deg
                        currentX > initial_clientX && 
                            (currentY < initial_clientY? widthHeightSmaller(): widthSmallerHeightLarger());
                    // 0deg
                    // y-axis
                        currentX === initial_clientX &&
                            (currentY < initial_clientY? heightSmaller(): heightLarger());
                    // 90deg
                    // x-axis
                        currentY === initial_clientY &&
                            (currentX < initial_clientX ? widthLarger(): widthSmaller());
                    break;

                    case 'SE':
                    // 181deg to 359deg
                        currentX < initial_clientX && 
                            (currentY < initial_clientY? widthHeightSmaller(): widthSmallerHeightLarger());
                    // 1deg to 179deg
                        currentX > initial_clientX && 
                            (currentY < initial_clientY? widthLargerHeightSmaller(): widthHeightLarger());
                    // 0deg
                    // y-axis
                        currentX === initial_clientX &&
                            (currentY < initial_clientY? heightSmaller(): heightLarger());
                    // 90edeg
                    // x-axis
                        currentY === initial_clientY &&
                            (currentX < initial_clientX ? widthSmaller(): widthLarger());
                    break;
                }

                initial_clientX = currentX;
                initial_clientY = currentY;
            }
        }

        const resizeSlashFromNW = closure_fun(initial_clientX, initial_clientY, ele, imgPreviewBlock);

        resizeHandler(resizeSlashFromNW, imgBlock, imgPreviewBlock, Img_Block);
    }
}

function closure_resizeBox(e, initialClientX, initialClientY, modification, imgPreviewBlock){
    let initial_clientX = initialClientX;
    let initial_clientY = initialClientY;

    const img_height_value = getPropertyStyleValue(imgPreviewBlock, 'height');
    const img_width_value = getPropertyStyleValue(imgPreviewBlock, 'width');

    const xAxis_distance = Math.abs((e.clientX || e.touches[0].clientX) - initial_clientX);
    const yAxis_distance = Math.abs((e.clientY || e.touches[0].clientY) - initial_clientY);

    switch(modification){
        case 'widthHeightLarger':
            return () => {
                imgPreviewBlock.style.width = `${img_width_value + xAxis_distance}px`;
                imgPreviewBlock.style.height = `${img_height_value + yAxis_distance}px`;
            }
        case 'widthHeightSmaller':
            return () => {
                imgPreviewBlock.style.width = `${img_width_value - xAxis_distance}px`;
                imgPreviewBlock.style.height = `${img_height_value - yAxis_distance}px`;
            }
        case 'widthLargerHeightSmaller':
            return () => {
                imgPreviewBlock.style.width = `${img_width_value + xAxis_distance}px`;
                imgPreviewBlock.style.height = `${img_height_value - yAxis_distance}px`;
            }
        case 'widthSmallerHeightLarger':
            return () => {
                imgPreviewBlock.style.width = `${img_width_value - xAxis_distance}px`;
                imgPreviewBlock.style.height = `${img_height_value + yAxis_distance}px`;
            }
        case 'widthLarger':
            return () => {
                imgPreviewBlock.style.width = `${img_width_value + xAxis_distance}px`;
                imgPreviewBlock.style.height = `${img_height_value}px`;
            }
        case 'widthSmaller':
            return () => {
                imgPreviewBlock.style.width = `${img_width_value - xAxis_distance}px`;
                imgPreviewBlock.style.height = `${img_height_value}px`;
            }
        case 'heightLarger':
            return () => {
                imgPreviewBlock.style.width = `${img_width_value}px`;
                imgPreviewBlock.style.height = `${img_height_value + yAxis_distance}px`;
            }
        case 'heightSmaller':
            return () => {
                imgPreviewBlock.style.width = `${img_width_value}px`;
                imgPreviewBlock.style.height = `${img_height_value - yAxis_distance}px`;
            }
    }
}

const getSelectedText = () => {
    if (window.getSelection) {
        return window.getSelection();
    } else if (document.selection) {
        return document.selection.createRange().text;
    }
    return '';
}

export { getPropertyStyle, setImgBlockSize, imgResize, getSelectedText }