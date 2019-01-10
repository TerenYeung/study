abstract class Group {
    public abstract void find();
    public abstract void add();
    public abstract void delete();
    public abstract void change();
    public abstract void plan();
}

class RequirementGroup extends Group {
    public void find() {
        System.out.println("找到需求组...");
    }
    public void add() {
        System.out.println("客户要求增加需求...");
    }
    public void delete() {
        System.out.println("客户要求删除需求...");
    }
    public void change() {
        System.out.println("客户要求改变需求...");
    }
    public void plan() {
        System.out.println("客户要求变更需求计划...");
    }
}

class PageGroup extends Group {
    public void find() {
        System.out.println("找到美工组...");
    }
    public void add() {
        System.out.println("客户要求增加页面...");
    }
    public void delete() {
        System.out.println("客户要求删除页面...");
    }
    public void change() {
        System.out.println("客户要求改变页面...");
    }
    public void plan() {
        System.out.println("客户要求变更页面计划...");
    }
}

class CodeGroup extends Group {
    public void find() {
        System.out.println("找到代码组...");
    }
    public void add() {
        System.out.println("客户要求增加功能...");
    }
    public void delete() {
        System.out.println("客户要求删除功能...");
    }
    public void change() {
        System.out.println("客户要求改变功能...");
    }
    public void plan() {
        System.out.println("客户要求变更功能计划...");
    }
}

abstract class Command {
    protected RequirementGroup rg = new RequirementGroup();
    protected PageGroup pg = new PageGroup();
    protected CodeGroup cg = new CodeGroup();
    public abstract void execute();
}

/**
 * @description 增加需求命令
 */
class AddRequirementCommand extends Command {
    public void execute() {
        super.rg.find();
        super.rg.add();
        super.rg.plan();
    }
}

/**
 * @description 删除页面命令
 */
class DeletePageCommand extends Command {
    public void execute() {
        super.pg.find();
        super.pg.delete();
        super.pg.plan();
    }
}

/**
 * @description 发号施令者
 */
class Invoker {
    private Command command;
    public void setCommand(Command command) {
        this.command = command;
    }
    public void action() {
        this.command.execute();
    }
}

public class CommandClient {
    public static void main(String[] args) {
        Invoker invoker = new Invoker();
        Command addRequirementCommand = new AddRequirementCommand();
        invoker.setCommand(addRequirementCommand);
        invoker.action();

        Command deletePageCommand = new DeletePageCommand();
        invoker.setCommand(deletePageCommand);
        invoker.action();
    }
}