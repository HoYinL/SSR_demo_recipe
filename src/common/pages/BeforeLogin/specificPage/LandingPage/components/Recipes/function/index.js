import ReactDOM from 'react-dom';

const scrollreveal = async () => {
    if(typeof window != 'undefined'){
        let scrollreveal = await import('scrollreveal');
        let ScrollReveal = scrollreveal.default;

        ScrollReveal().reveal('#recipes_title', { opacity: 0, distance: '50px', origin: 'left', duration: 750, afterReveal: () => ScrollReveal().clean('#recipes_title') });
        ScrollReveal().reveal('#recipes_subtitle', { opacity: 0, distance: '50px', origin: 'right', duration: 1000, afterReveal: () => ScrollReveal().clean('#recipes_subtitle') });
        ScrollReveal().reveal( document.getElementById("recipe_block"), { opacity: 0, duration: 500, afterReveal: () => ScrollReveal().clean( document.getElementById("recipe_block"))});
        ScrollReveal().reveal('#recipes_button', { opacity: 0, distance: '25px', origin: 'bottom', duration: 500, after: () => ScrollReveal().clean('#recipes_button')});
    }
}

const getPropertyStyle = (target, property) => {
    const computedStyles = window.getComputedStyle(document.getElementById(target));

    return computedStyles.getPropertyValue(property);
}

function isChildElement(target, parent){
    let element = target;
    let isChildElement = true;

    while(element != parent){
        element = element.parentNode;
        if(element == document.body){
            isChildElement = false;
            break
        }
        if(element == parent) break;
    }

    return isChildElement 
}

const fun = () => {
    return (e) => {
        e.preventDefault()
    }
}
export { scrollreveal, getPropertyStyle, isChildElement, fun }