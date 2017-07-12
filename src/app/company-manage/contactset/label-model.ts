export class Label{
    id: number;
    name: string;
    disabled?: boolean;
    selected?: boolean;
    delForbidden?: boolean;
    constructor(obj?:any){
        this.id  = obj && obj.id || Math.floor(Math.random()*10000000);
        this.disabled = obj && obj.disabled || false;
        this.selected = obj && obj.selected || false;
        this.delForbidden = obj && obj.delForbidden || false;
    }
}
