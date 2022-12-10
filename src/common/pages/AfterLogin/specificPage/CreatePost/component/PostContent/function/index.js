const scrollToContentWriter = (setScrolledToBlock) => {
    const appBarStyle = window.getComputedStyle(document.getElementById("Appbar"));
    const appBarHeight = Number(appBarStyle.getPropertyValue('height').slice(0, -2));

    const writerOffsetTop = document.getElementById("ContentWriter").offsetTop - appBarHeight;

    const scrollFun = setInterval(() => {
        const startingOffsetTop = window.pageYOffset;
        const scrollLength = writerOffsetTop - startingOffsetTop;
        const speed = Math.ceil(scrollLength / 15);

        if(scrollLength > 1){
            scrollBy(0, speed);
        } else { 
            scrollBy(0, scrollLength);
            clearInterval(scrollFun)
        }

    }, 5);

    document.addEventListener('wheel', () => {
        clearInterval(scrollFun)
    })
}

export { scrollToContentWriter }