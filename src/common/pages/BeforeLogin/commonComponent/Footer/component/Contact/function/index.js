import ReactDOM from 'react-dom';

const scrollreveal = async () => {
    if(typeof window != 'undefined'){
        const scrollreveal = await import('scrollreveal');
        const ScrollReveal = scrollreveal.default;

        ScrollReveal().reveal('#contact_infoList', { opacity: 0, duration: 1000});
        window.innerWidth > 700? 
            ScrollReveal().reveal('#footer_infoList', { distance: '100px', origin: 'bottom', opacity: 0, duration: 1000, delay: 500}):
            ScrollReveal().reveal('#footer_infoList', { distance: '100px', origin: 'left', opacity: 0, duration: 1000, delay: 500});
    }
}

export default scrollreveal