const scrollreveal = async () => {
    if(typeof window != 'undefined'){
        const scrollreveal = await import('scrollreveal');
        const ScrollReveal = scrollreveal.default;

        if (window.innerWidth > 700){ 
            ScrollReveal().reveal('#webtitle_backgroundImg', { opacity: 0, duration: 500, afterReveal: () => ScrollReveal().clean('#webtitle_backgroundImg')});
            ScrollReveal().reveal('#webtitle_title', { opacity: 0, distance: '150px', origin: 'left', delay: 500, duration: 1000, afterReveal: () => ScrollReveal().clean('#webtitle_title')})
            ScrollReveal().reveal('#webtitle_subtitle', { opacity: 0, distance: '150px', origin: 'left', delay: 750, duration: 1000, afterReveal: () => ScrollReveal().clean('#webtitle_subtitle')})
            ScrollReveal().reveal('#searchbar_card', { opacity: 0, distance: '150px', origin: 'left', delay: 1000, duration: 1000, afterReveal: () => ScrollReveal().clean('#searchbar_card')})
        } else {
            ScrollReveal().reveal('#searchbar_card', { opacity: 0, duration: 1000 , afterReveal: () => ScrollReveal().clean('#searchbar_card')});
        }
    }
}

export { scrollreveal }