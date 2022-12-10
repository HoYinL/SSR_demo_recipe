import ReactDOM from 'react-dom';

const scrollreveal = async () => {
    if(typeof window != 'undefined'){
        const scrollreveal = await import('scrollreveal');
        const ScrollReveal = scrollreveal.default;
        const app_logo = document.getElementById("app_logo");
        const app_logo_node = ReactDOM.findDOMNode(app_logo);
        const node_length = app_logo_node.children.length;

        if(window.innerWidth > 700){
            ScrollReveal().reveal('#footer_logo', { distance: '50px', origin: 'left', opacity: 0, duration: 1000});
            ScrollReveal().reveal('#footer_appDiscription', { distance: '50px', origin: 'left', opacity: 0, duration: 1000, delay: 250});
        } else {
            ScrollReveal().reveal('#footer_logo', { distance: '50px', origin: 'bottom', opacity: 0, duration: 1000});
            ScrollReveal().reveal('#footer_appDiscription', { distance: '50px', origin: 'bottom', opacity: 0, duration: 1000, delay: 350});
            
        }
        for(let index = 0; index < node_length; index++){
            ScrollReveal().reveal(app_logo_node.children[index], { distance: '25px', origin: 'bottom', opacity: 0, duration: 500, delay: 350 + (index + 1) * 250});
        }
    }
}

export default scrollreveal