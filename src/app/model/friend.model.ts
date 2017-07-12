import { Contact } from './contact.model';
export class Friend extends Contact {
    displayName: string
    mobile: string
    constructor(item: {
        id: string;
        name: string;
        imgSrc: string;
        depardepartmentName: string;
    }) {
        super(item);
    }
}