const htmlParser = (target) => {
    const str = target.replace(/\n/g, "<br />");
    const split_str = str.split('<br />').map(string => string.split('&#x2022;'));
    const split_block = split_str.map((ele) => {
        if(ele.length == 1){
            return `<span style="display: inline-block; color: red">${ele[0]}</span>`
        } else {
            return `<span style="display: flex">
                <span style="min-width: .6rem; display: inline-block; color: red">${'&#x2022;'}</span>
                <span style="display: inline-block; color: red">${ele[1]}</span>
            </span>`
        }
    });
    let str_html = '';
    split_block.map((ele) => {
        str_html += ele ;
    }) 

    return str_html
};

export {htmlParser}