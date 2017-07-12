import { Contact } from './contact.model';

export class Member extends Contact {
    id: string;
    name: string;
    imgSrc: string;
    role: string;
    displayName: string;
    depardepartmentName: string;
    // pinyin: string;
    // first: string;
    constructor(item: {
        id: string;
        name: string;
        imgSrc: string;
        role?: string;
        displayName?: string;
        depardepartmentName: string;
    }) {
        super(item);
        this.role = item.role;
    }
}