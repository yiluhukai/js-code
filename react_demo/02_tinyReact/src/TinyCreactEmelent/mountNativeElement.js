import { createDomElement } from "./createDomElement";
export default function mountNativeElement(virtualDOM, container) {
    const dom = createDomElement(virtualDOM);
    container.appendChild(dom);
}
