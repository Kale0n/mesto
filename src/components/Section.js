export default class Section {
    constructor ({items, renderer}, selectorContainer) {
        this._initialArray = items;
        this._renderer = renderer;
        this._container = document.querySelector(selectorContainer);
    }

    addItem(element) {
        this._container.append(element);
    }

    addItemPrepend(element) {
        this._container.prepend(element);
    }

    renderItems() {
            this._initialArray.forEach(element => { 
            this._renderer(element);
        });
    }
}