import ReactDOM from 'react-dom';

const scrollreveal = async () => {
    if(typeof window != 'undefined'){
        const scrollreveal = await import('scrollreveal');
        const ScrollReveal = scrollreveal.default;
        const copyright = document.getElementById("copyright");
        const copyrightNode = ReactDOM.findDOMNode(copyright);
        for(let index = 0; index < copyrightNode.children.length; index++){
            ScrollReveal().reveal( copyrightNode.children[index] , { distance: '50px', origin: 'bottom', opacity: 0, duration: 1000, delay: index*500});
        }
    }
}

export default scrollreveal