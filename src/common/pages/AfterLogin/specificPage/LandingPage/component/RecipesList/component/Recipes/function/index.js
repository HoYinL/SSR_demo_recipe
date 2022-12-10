export const getPropertyStyle = (target, property) => {
    const computedStyles = window.getComputedStyle(target);
    const computedStylesValue = computedStyles.getPropertyValue(property);

    return Number(computedStylesValue.slice(0, computedStylesValue.length - 2));
}