import ReactDOM from 'react-dom';

const scrollreveal = async () => {
    if(typeof window != 'undefined'){
        const scrollreveal = await import('scrollreveal');
        const ScrollReveal = scrollreveal.default;

        ScrollReveal().reveal('#discovery_infoListTitle', { opacity: 0, duration: 1000})
        window.innerWidth > 700? 
            ScrollReveal().reveal('#footer_infoDiscoveryList', { distance: '100px', origin: 'bottom', opacity: 0, duration: 1000, delay: 1000, afterReveal: (el) => {
                document.getElementById('footer_infoDiscoveryList').style.transform = '';
                document.getElementById('footer_infoDiscoveryList').style.transition = '';
                ScrollReveal().clean('#footer_infoDiscoveryList');
            }}): ScrollReveal().reveal('#footer_infoDiscoveryList', { distance: '100px', origin: 'right', opacity: 0, duration: 1000, delay: 500, afterReveal: (el) => {
                document.getElementById('footer_infoDiscoveryList').style.transform = '';
                document.getElementById('footer_infoDiscoveryList').style.transition = '';
                ScrollReveal().clean('#footer_infoDiscoveryList');
            }})
    }
}

export default scrollreveal