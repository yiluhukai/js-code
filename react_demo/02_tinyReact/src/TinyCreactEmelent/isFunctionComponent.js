import isFunction from "./isFunction";

export default function isFunctionComponent(virtualDOM) {
    const type = virtualDOM.type;
    return (
        isFunction(virtualDOM) &&
        type &&
        !(type.prototype && type.prototype.render)
    );
}
