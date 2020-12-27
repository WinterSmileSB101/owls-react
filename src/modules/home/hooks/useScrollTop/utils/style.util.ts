const getStyles = (elem: Element) => {
    // Support: IE <=11+ (trac-14150)
    // In IE popup's `window` is the opener window which makes `window.getComputedStyle( elem )`
    // break. Using `elem.ownerDocument.defaultView` avoids the issue.
    let view = elem.ownerDocument.defaultView;

    // `document.implementation.createHTMLDocument( "" )` has a `null` `defaultView`
    // property; check `defaultView` truthiness to fallback to window in such a case.
    if (!view) {
        view = window;
    }

    return view.getComputedStyle(elem);
};

// Note: an element does not contain itself
const elContaines = (a, b) => {
    let adown = a.nodeType === 9 ? a.documentElement : a,
        bup = b && b.parentNode;

    return (
        a === bup ||
        !!(
            bup &&
            bup.nodeType === 1 &&
            // Support: IE 9 - 11+
            // IE doesn't have `contains` on SVG.
            (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16)
        )
    );
};

const isAttached = (elem: Element) => {
    if (!document.getRootNode()) {
        return elContaines(elem.ownerDocument, elem);
    } else {
        const composed = { composed: true };
        return elContaines(elem.ownerDocument, elem) || elem.getRootNode(composed) === elem.ownerDocument;
    }
};

const getStyle = (elem: HTMLElement, name: string) => {
    let style = elem.style;
};

const getCurCss = (elem: Element, name: string, computed?: CSSStyleDeclaration) => {
    let ret;

    computed = computed || getStyles(elem);

    // getPropertyValue is needed for `.css('--customProperty')` (gh-3144)
    if (computed) {
        ret = computed.getPropertyValue(name) || computed[name];

        if (ret === '' && !isAttached(elem)) {
            ret = (elem as HTMLElement)?.style[name];
        }
    }

    if (!ret) {
        ret = elem[name];
    }

    return ret !== undefined
        ? // Support: IE <=9 - 11+
          // IE returns zIndex value as an integer.
          ret + ''
        : ret;
};

export { getCurCss };
