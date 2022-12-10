const scrollreveal = async (advertisement_box) => {
    if(typeof window != 'undefined'){
        const scrollreveal = await import('scrollreveal');
        const ScrollReveal = scrollreveal.default;

        ScrollReveal().reveal( advertisement_box, { transition: 'opacity .5s'});
    }
}

export { scrollreveal }