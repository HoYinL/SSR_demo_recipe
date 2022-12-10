const initialColumnsDisplayNone = () => {
    const compStyles1 = getComputedStyle(document.getElementById('FriendList'));
    const compStyles2 = getComputedStyle(document.getElementById('FuncBar'));

    document.getElementById('FriendList').style.transition = 'right 0s';
    document.getElementById('FuncBar').style.transition = 'left 0s';
    document.getElementById('FuncBlock').style.transition = 'left 0s';
    document.getElementById('FriendList').style.opacity = '0';
    document.getElementById('FuncBar').style.opacity = '0';
    document.getElementById('showLeftColumn').style.left = '0px',
    document.getElementById('showRightColumn').style.right = '0px',

    setTimeout(() => {
        document.getElementById('FriendList').style.right = `-${compStyles1.getPropertyValue('width')}`;
        document.getElementById('FuncBar').style.left = `-${compStyles2.getPropertyValue('width')}`;
        document.getElementById('FuncBlock').style.left = `-${compStyles2.getPropertyValue('width')}`;
        document.getElementById('FriendList').style.opacity = '1';
        document.getElementById('FuncBar').style.opacity = '1';
    }, 250)
}

const initialColumnsDisplay = () => {
    document.getElementById('FriendList').style.right = '0px';
    document.getElementById('FuncBar').style.left = '0px';
    document.getElementById('FuncBlock').style.left = '0px';
}

const initialColumnDisplayNone = () => {
    document.getElementById('FriendList').style.right = '-200px';
    document.getElementById('FuncBar').style.left = '-200px';
    document.getElementById('FuncBlock').style.left = '-200px';
}

const initialHideLeftRightColumns = () => {
    const compStyles1 = getComputedStyle(document.getElementById('FriendList'));
    const compStyles2 = getComputedStyle(document.getElementById('FuncBar'));

    document.getElementById('FuncBlock').style.transition = 'left .25s';
    document.getElementById('FriendList').style.transition = 'right .5s';
    document.getElementById('FuncBar').style.transition = 'left .5s';

    setTimeout(() => {
        document.getElementById('FuncBlock').style.left = '-200px';
        document.getElementById('FriendList').style.right = `-${compStyles1.getPropertyValue('width')}`;
        document.getElementById('FuncBar').style.left = `-200px`;
    }, 250);

    setTimeout(() => {
        document.getElementById('showLeftColumn').style.left = '0px';
        document.getElementById('showRightColumn').style.right = '0px';
    }, 750)
}

const pagesHideLeftRightColumns = () => {
    const compStyles1 = getComputedStyle(document.getElementById('FriendList'));
    const compStyles2 = getComputedStyle(document.getElementById('FuncBar'));

    document.getElementById('FuncBlock').style.transition = 'left .25s';
    document.getElementById('FriendList').style.transition = 'right .25s';
    document.getElementById('FuncBar').style.transition = 'left .25s';

    document.getElementById('FriendList').style.right = `-${compStyles1.getPropertyValue('width')}`;
    document.getElementById('FuncBlock').style.left = '-200px';
    document.getElementById('FuncBar').style.left = `-${compStyles2.getPropertyValue('width')}`;
    document.getElementById('showLeftColumn').style.left = `0px`;
    document.getElementById('showRightColumn').style.right = `0px`;
}

const showLeftRightColumns = () => {
    document.getElementById('FriendList').style.transition = 'right 0.5s';
    document.getElementById('FuncBar').style.transition = 'left 0.5s';

    setTimeout(() => {
        document.getElementById('FriendList').style.right = `0px`;
        document.getElementById('FuncBar').style.left = `0px`;
    }, 250)
}

const hideLeftColumn = () => {
    const compStyles2 = getComputedStyle(document.getElementById('FuncBar'));
    document.getElementById('FuncBlock').style.left = '-200px';
    document.getElementById('FuncBar').style.left = `-${compStyles2.getPropertyValue('width')}`;
    document.getElementById('showLeftColumn').style.left = `0px`;
}

const showLeftColumn = () => {
    document.getElementById('FuncBlock').style.transition = 'left .25s';
    document.getElementById('FuncBar').style.transition = 'left .25s';
    document.getElementById('showLeftColumn').style.transition = 'left .25s';

    document.getElementById('FuncBlock').style.left = '0px';
    document.getElementById('FuncBar').style.left = `0px`;
    document.getElementById('showLeftColumn').style.left = `200px`;
}

const hideRightColumn = () => {
    document.getElementById('FriendList').style.transition = 'right 0.25s';

    const compStyles1 = getComputedStyle(document.getElementById('FriendList'));
    document.getElementById('FriendList').style.right = `-${compStyles1.getPropertyValue('width')}`;
    document.getElementById('showRightColumn').style.right = `0px`;
}

const showRightColumn = () => {
    document.getElementById('FriendList').style.transition = 'right .25s';

    document.getElementById('FriendList').style.right = `0px`;
    document.getElementById('showRightColumn').style.right = `200px`;
}

const scrollLeftColumn = (initialClientX) => {
    const showLeftColumn = document.getElementById('showLeftColumn');
    const FuncBar = document.getElementById('FuncBar');

    function closure_scroll(initialClientX, device){
        const initial_clientX = initialClientX;
        let latest_clientX = initialClientX;
        FuncBar.style.transition = 'left .25s';

        return function(e){
            const clientX = device == 'PC' ? e.clientX : e.touches[0].clientX;

            if(clientX - latest_clientX > 0 && clientX - initial_clientX <= 200){
                showLeftColumn.style.left = `${clientX - initialClientX}px`;
                FuncBar.style.left = `${-200 + clientX - initialClientX}px`;  
                latest_clientX = clientX;
            } 
            else return
        }
    }

    const mouseScrollLeft = closure_scroll(initialClientX, 'PC');
    const touchScrollLeft = closure_scroll(initialClientX, 'mobile');

    initialClientX != false && document.addEventListener('pointermove', mouseScrollLeft);
    initialClientX != false && document.addEventListener('touchmove', touchScrollLeft);

    document.addEventListener('pointerup', (e) => {
        document.removeEventListener('pointermove', mouseScrollLeft);
        document.removeEventListener('touchmove', touchScrollLeft);
    }, { once: true });
}

const scrollRightColumn = (initialClientX) => {
    const showRightColumn = document.getElementById('showRightColumn');
    const FriendList = document.getElementById('FriendList');

    function closure_scroll(initialClientX, device){
        const initial_clientX = initialClientX;
        let latest_clientX = initialClientX;
        FriendList.style.transition = 'right .25s';

        return function(e){
            const clientX = device == 'PC' ? e.clientX : e.touches[0].clientX;

            if(clientX - latest_clientX < 0 && initial_clientX - clientX <= 200){
                showRightColumn.style.right = `${initial_clientX - clientX }px`;
                FriendList.style.right = `${initial_clientX - clientX  - 200}px`;  
                latest_clientX = clientX;
            } 
            else return
        }
    }

    const mouseScrollRight = closure_scroll(initialClientX, 'PC');
    const touchScrollRight = closure_scroll(initialClientX, 'mobile');

    initialClientX != false && document.addEventListener('pointermove', mouseScrollRight);
    initialClientX != false && document.addEventListener('touchmove', touchScrollRight);

    document.addEventListener('pointerup', (e) => {
        document.removeEventListener('pointermove', mouseScrollRight);
        document.removeEventListener('touchmove', touchScrollRight);
    }, { once: true });
};

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

function getPropertyStyleValue(target, property){
    const targetStyle = window.getComputedStyle(target);
    return targetStyle.getPropertyValue(property);
}

function createObserver(target, cb){
    const config = { attributes: true };
    const observer = new MutationObserver(cb);
    observer.observe(target, config);
}

const getPropertyStyle = (target, property) => {
    const computedStyles = window.getComputedStyle(target);

    const style = computedStyles.getPropertyValue(property);
    const value = Number(style.slice(0, style.length - 2));

    return value
}

export { 
    showLeftRightColumns,
    initialHideLeftRightColumns, 
    pagesHideLeftRightColumns,
    showLeftColumn,
    hideLeftColumn,
    showRightColumn,
    hideRightColumn,
    initialColumnsDisplayNone,
    initialColumnsDisplay,
    scrollLeftColumn,
    scrollRightColumn,
    isChildElement,
    getPropertyStyleValue,
    createObserver,
    getPropertyStyle,
    initialColumnDisplayNone
}