import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

interface IPositive {
    total: number;
}

interface IPositiveActions {
    onClick: () => void;
}

export class Positive extends Component<IPositive> {
    protected _close: HTMLElement;
    protected _total: HTMLElement;

    constructor(container: HTMLElement, actions: IPositiveActions) {
        super(container);

        this._close = ensureElement<HTMLElement>('.order-success__close', this.container);
        
        this._total = ensureElement<HTMLElement>('.order-success__description', this.container);

        if (actions?.onClick) {
            this._close.addEventListener('click', actions.onClick);
        }
    }
    set total(total: number) {
        this.setText(this._total, 'Списано' + total + 'синапсов');
    }
}