import ReactDOM from 'react-dom';

const revealTitle = async () => {
        const scrollreveal = await import('scrollreveal');
        const ScrollReveal = scrollreveal.default;

        ScrollReveal().reveal('#contributer_block_title', { opacity: 0, distance: '50px', origin: 'bottom', duration: 1000, afterReveal: () => ScrollReveal().clean('#contributer_block_title')});
        ScrollReveal().reveal('#contributer_block_subtitle', { opacity: 0, duration: 1000, delay: 250, afterReveal: () =>  ScrollReveal().clean('#contributer_block_subtitle')});
}

const revealContributers = async () => {
    if(typeof window != 'undefined'){
        const scrollreveal = await import('scrollreveal');
        const ScrollReveal = scrollreveal.default;
        const contributer_firstList = document.getElementById('contributer_firstList');
        const contributer_firstList_node = ReactDOM.findDOMNode(contributer_firstList);
        const firstList_boxes = contributer_firstList_node.children;

        for(let index = 0; index < firstList_boxes.length; index++){
            !firstList_boxes[index].dataset['srId'] &&
                ScrollReveal().reveal( firstList_boxes[index], { opacity: 0, distance: '50px', origin: 'bottom', duration: 500, delay: (index + 1) * 250, afterReveal: () => {
                    ScrollReveal().clean(firstList_boxes[index]);
            }})
        }
    }
}

const size = (setListColumn) => {
    if(window.innerWidth > 2400){
        setListColumn(6);
        return
    }
    if(window.innerWidth > 1800  && window.innerWidth <= 2400){
        setListColumn(5);
        return
    }
    if(window.innerWidth > 1040  && window.innerWidth <= 1800){
        setListColumn(4);
        return
    }
    if(window.innerWidth > 740 && window.innerWidth <= 1040){
        setListColumn(3);
        return
    }
    if(window.innerWidth > 500 && window.innerWidth <= 740){
        setListColumn(2);
        return
    }
    if(window.innerWidth <= 500){
        setListColumn(1);
        return
    }
}

const chunk = (items, size) => {  
    const chunks = []

    while (items.length) {
      chunks.push(
        items.splice(0, size)
      )
    }
  
    return chunks
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

export { revealContributers, revealTitle, size, chunk, isChildElement }