/**
 * 通讯录模型
 *
 */
export class Contact {
    id: number;
    membername: string;
    level: number;
    supervise: number;
    state: number;
    executornames: string; //执行人
    projectid: number;
    closingdate: string;
    
    constructor(obj?: any) {
        this.supervise = obj && obj.supervise || 0;
        this.state = obj && obj.state || 0;
    }
}
