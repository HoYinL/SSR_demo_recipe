function getSelectionHtml(target, hyperlink = '', range2 = '', color = '') {
    var sel, range, node;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            if(range2 != ''){
                range = range2;
            } else {
                range = window.getSelection().getRangeAt(0);
            }
            
            let html = `<img style="fontSize: 1.25rem" src="${link}" />`;

            range.deleteContents();

            let el = document.createElement("div");
            el.innerHTML = html;

            var frag = document.createDocumentFragment(), node, lastNode;
            if (target != 'new') {
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }
            } 
            range.insertNode(frag);
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.collapse(false);
        range.pasteHTML(html);
    }
}

export { getSelectedText, getSelectionHtml };