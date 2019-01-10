class AdvTemplate {
    private advSubject:string = "XX 银行国庆信用卡抽奖活动";
    private advContext = "国庆抽象活动通知：只要刷卡就送你一百万！...";
    public getAdvSubject():string {
        return this.advSubject;
    }
    public getAdvContext():string {
        return this.advContext;
    }
}

interface Cloneable {
    clone(): any;
}

class Mail implements Cloneable {
    private subject: string;
    private context: string;
    public constructor(advTemplate: AdvTemplate) {
        this.subject = advTemplate.getAdvSubject();
        this.context = advTemplate.getAdvContext();
    }
    public getSubject(): string {
        return this.subject;
    }
    public setSubject(_subject:string):void {
        this.subject = _subject;
    }
    public getContext(): string {
        return this.context;
    }
    public setContext(_context:string):void {
        this.context = _context;
    }
    /**
     * @description
     * 注意：当调用 clone 方法时会以 Mail.prototype 为原型克隆一个对象出来，但是不会经历 constructor 阶段；
     */
     public clone():Mail {
        let mail:Mail = null;

        try {
            Object.create = Object.create || function(obj) {
                let F = function() {};
                F.prototype = obj;
                return new F();
            }
            return Object.create.call(this, Mail.prototype)
        } catch(e) {
            console.error(e)
        }

        return mail;
    }
}

let mail:Mail = new Mail(new AdvTemplate());
let cloneMail:Mail = mail.clone()
console.dir(cloneMail)
console.log(cloneMail.setContext('XXX'))
console.log(cloneMail.getContext())