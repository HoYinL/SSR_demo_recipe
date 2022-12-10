import ReactDOM from 'react-dom';

const scrollreveal = async () => {
    if(typeof window != 'undefined'){
        const scrollreveal = await import('scrollreveal');
        const ScrollReveal = scrollreveal.default;

        const info_root = document.getElementById("info_root");
        const info_root_node = ReactDOM.findDOMNode(info_root);
        const info_root_length = info_root_node.children.length;
        for(let index = 0; index < info_root_length; index++){
            ScrollReveal().reveal( info_root_node.children[index], { opacity: 0, distance: '50px', origin: 'bottom', delay: window.innerWidth > 380? 250 * (index + 1): 0, duration: 500, afterReveal: () => {
                ScrollReveal().clean(info_root_node.children[index]);
            }});
        }
        
    }
}

export { scrollreveal }