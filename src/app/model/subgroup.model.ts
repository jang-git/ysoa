import { Friend } from './friend.model';

export class Subgroup {
    title: string
    list: Friend[]
    constructor(title: string, list: Friend[]) {
        this.title = title;
        this.list = list;
    }
}