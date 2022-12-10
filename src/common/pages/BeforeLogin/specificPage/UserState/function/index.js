const clearScrollreveal = async () => {
    if(typeof window != 'undefined'){
        const scrollreveal = await import('scrollreveal');
        const ScrollReveal = scrollreveal.default;
        ScrollReveal().destroy();
    }
}

export { clearScrollreveal }