import ReactDOM from 'react-dom';

const scrollreveal = async () => {
    if(typeof window != 'undefined'){
        const scrollreveal = await import('scrollreveal');
        const ScrollReveal = scrollreveal.default;

        const node = document.getElementById("navigation");
        const DOMnode = ReactDOM.findDOMNode(node);
        for(let index = 0; index < DOMnode.childNodes.length; index++){
            ScrollReveal().reveal(DOMnode.childNodes[index] , { distance: '50px', origin: 'bottom', opacity: 0, duration: 1000, delay: index * 75})
        }
    }
}

export default scrollreveal