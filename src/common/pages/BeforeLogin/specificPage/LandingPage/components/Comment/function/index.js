import ReactDOM from 'react-dom';

const scrollreveal = async () => {
    if(typeof window != 'undefined'){
        const scrollreveal = await import('scrollreveal');
        const ScrollReveal = scrollreveal.default;

        ScrollReveal().reveal(document.getElementById('comment_title'), { opacity: 0, distance: '150px', origin: 'right', duration: 750});
        ScrollReveal().reveal(document.getElementById('comment_subtitle'), { opacity: 0, distance: '150px', origin: 'right', duration: 750});

        const comment_info = document.getElementById('comment_info');
        const comment_info_node = ReactDOM.findDOMNode(comment_info);
        const comment_node_length = comment_info_node.children.length;
        for(let index = 0; index < comment_node_length; index++){
            ScrollReveal().reveal( comment_info_node.children[index], { opacity: 0, duration: 500, delay: (index + 1) * 350,  afterReveal: () => {
                comment_info_node.children[index].style.opacity = '1';
                ScrollReveal().clean(comment_info_node.children[index]);
            }});
        }
    }
}


const scrollrevealButton = async (left_button, right_button) => {
    if(typeof window != 'undefined'){
        const scrollreveal = await import('scrollreveal');
        const ScrollReveal = scrollreveal.default;

        ScrollReveal().reveal( document.getElementById('left_button'), { opacity: 0, distance: '50px', origin: 'left', duration: 1000, afterReveal: () =>  ScrollReveal().clean(document.getElementById('left_button'))});
        ScrollReveal().reveal( document.getElementById('right_button'), { opacity: 0, distance: '50px', origin: 'right', duration: 1000, afterReveal: () =>  ScrollReveal().clean(document.getElementById('right_button')) });
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

const addToRefs = (el) => {
    if (el && !listOfCard.current.includes(el)) {
        listOfCard.current.push(el);
    } else {
        listOfCard.current.pop();
    }
}

const addRefs = (el) => {
    if (el && !listOfComment.current.includes(el)) {
        listOfComment.current.push(el);
    } else {
        listOfComment.current.pop();
    }
}

export { scrollreveal, chunk, scrollrevealButton, addToRefs, addRefs }