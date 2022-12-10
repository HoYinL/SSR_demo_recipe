export const setFollowerNumber = (number) => {
    let returnNumber = number;

    if (returnNumber / 1000 > 1 && returnNumber / 1000000 < 1) {
        returnNumber = `${returnNumber / 1000 + (returnNumber % 1000).toFixed(1)} K followers`;
    } else if (returnNumber / 1000 > 1 && returnNumber / 1000000 > 1) {
        returnNumber = `${returnNumber / 1000000 + (returnNumber % 1000000).toFixed(1)} M followers`;
    } else if (returnNumber != 0 && returnNumber != 1) {
        returnNumber = `${returnNumber} followers`
    } else {
        returnNumber = `${returnNumber} follower`
    }

    return returnNumber
}