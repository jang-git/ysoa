export class Contact {
    id: string;
    name: string;
    imgSrc: string;
    pinyin: string;
    everychar: string;
    firstchar: string;
    displayName: string;
    depardepartmentName: string;
    constructor(item?: {
        id: string;
        name: string;
        imgSrc: string;
        depardepartmentName: string;
    }) {
        this.id = item.id;
        this.name = item.name;
        this.imgSrc = item.imgSrc;
        this.depardepartmentName = item.depardepartmentName;
    }

    setpinying(item: {
        pinyin: string;
        everychar: string;
        firstchar: string;
    }) {
        this.pinyin = item.pinyin;
        this.everychar = item.everychar;
        this.firstchar = item.firstchar;
    }
}
