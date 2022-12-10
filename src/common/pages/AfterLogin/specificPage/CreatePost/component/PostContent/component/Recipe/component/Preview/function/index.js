import { getPropertyStyleValue } from "../../Content/component/ModifierField/component/BlockModifier/FlexModifier/function";

export const resizeContainer = (container, container2, target, originalClientX) => {
    let latestClientX = Math.floor(originalClientX.clientX);
    
    return (e) => {
        let currentClientX = (e.clientX || e.touches[0].clientX);
        let clientXDistance =  latestClientX - currentClientX;
    
        const containerWidth = getPropertyStyleValue(container, "width");
        if(target.id === 'rightController'){
            container.style.width = `${containerWidth - clientXDistance}px`;
            container2.style.width = `${containerWidth - clientXDistance}px`;
        } else {
            container.style.width = `${containerWidth + clientXDistance}px`;
            container2.style.width = `${containerWidth + clientXDistance}px`;
        }

        latestClientX = currentClientX;
    };
}