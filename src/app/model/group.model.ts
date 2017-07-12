import { Contact } from './contact.model';
import { Member } from './member.model';
export class Group extends Contact {
    upperlimit: number;
    fact: number;
    creater: string;
    memberList: Member[];
    depardepartmentName: string;
    constructor(item: {
        id: string;
        name: string;
        imgSrc: string;
        upperlimit: number;
        fact: number;
        creater: string;
        depardepartmentName: string;
    }) {
        super(item);
        this.upperlimit = item.upperlimit;
        this.fact = item.fact;
        this.creater = item.creater;
        this.memberList = []
    }

}