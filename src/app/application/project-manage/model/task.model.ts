/**
 * 任务模型
 *
 */
export class Task {
    id: number;
    name: string;
    level: number;
    supervise: number;
    state: number;
    executornames: string; //执行人
    projectid: number;
    closingdate: string;
    
    constructor(obj?: any) {
        this.name = obj && obj.name || "任务名称";
        this.supervise = obj && obj.supervise || 0;
        this.state = obj && obj.state || 0;
    }
}
