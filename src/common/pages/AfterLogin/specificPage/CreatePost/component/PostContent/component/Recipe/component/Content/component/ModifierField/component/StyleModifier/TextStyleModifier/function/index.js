import { constant } from "async";

const getSelectedText = () => {
    if (window.getSelection) {
        return window.getSelection();
    } else if (document.selection) {
        return document.selection.createRange().text;
    }
    return '';
};

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
            
            let html;

            switch(target){
                case 'a':
                    html = `<a style="color: #3c3737" href="${hyperlink}" target="_blank">${range}</a>`;
                    break;
                case 'i':
                    html = `<i>${range}</i>`;
                    break;
                case 'b':
                    html = `<b>${range}</b>`;
                    break;
                case 'color':
                    html = `<span style="color: ${color}">${range}</span>`;
                    break;
            }

            range.deleteContents();

            let el = document.createElement("div");
            el.innerHTML = html;

            var frag = document.createDocumentFragment(), node, lastNode;
            if (target != 'new') {
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }
            } else {
                frag.appendChild(document.createElement("br"));
            }
            range.insertNode(frag);

            if (target == 'new') {
                const setpos = document.createRange();
                const set = window.getSelection();

                setpos.setStart(sel.baseNode.nextSibling.nextSibling, 0);

                setpos.collapse(true);

                set.removeAllRanges();
                set.addRange(setpos);
            }
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.collapse(false);
        range.pasteHTML(html);
    }
}

export { getSelectedText, getSelectionHtml };