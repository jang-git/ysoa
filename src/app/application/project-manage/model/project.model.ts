/**
 * 项目模型
 *
 */
export class Project {
    id: number;
    projectname: string;
    name: string;
    createtime: string;
    state: number;
    totaltask: number;
    desc: string;
    
    constructor(obj?: any) {
        this.projectname = obj && obj.projectname || "暂无项目名称";
        this.createtime = obj && obj.createtime || null;
        this.state = obj && obj.state || 0;
    }
}
