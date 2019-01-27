import java.util.Iterator;
import java.util.ArrayList;
interface IProjectIterator extends Iterator {}

class ProjectIterator implements IProjectIterator {
    private ArrayList<IProject> projectList = new ArrayList<IProject>();
    private int currentItem = 0;
    public ProjectIterator(ArrayList<IProject> projectList) {
        this.projectList = projectList;
    }
    public boolean hasNext() {
        boolean b = true;
        if (this.currentItem >= this.projectList.size() || this.projectList.get(this.currentItem) == null) {
            b = false;
        }
        return b;
    }
    public IProject next() {
        return (IProject)this.projectList.get(this.currentItem++);
    }
    public void remove() {}
}


interface IProject {
    public void add(String name, int num, int cost);
    public String getProjectInfo();
    public IProjectIterator iterator();
}

class Project implements IProject {
    private ArrayList<IProject> projectList = new ArrayList<IProject>();
    private String name = "";
    private int num = 0;
    private int cost = 0;
    private Project(String name, int num, int cost) {
        this.name = name;
        this.num = num;
        this.cost = cost;
    }
    public Project() {}
    public void add(String name, int num, int cost) {
        this.projectList.add(new Project(name, num, cost));
    }
    public String getProjectInfo() {
        String info = "";
        info = info + "项目名称：" + this.name;
        info = info + "\t项目人数：" + this.num;
        info = info + "\t项目费用：" + this.cost;
        return info;
    }
    public IProjectIterator iterator() {
        return new ProjectIterator(this.projectList);
    }
}

public class IteratorClient {
    public static void main(String[] args) {
        IProject project = new Project();
        for (int i = 1; i<=10; i++) {
            project.add("第" + i + "个项目", i*5, i*1000);
        }
        IProjectIterator projectIterator = project.iterator();
        while(projectIterator.hasNext()) {
            IProject p = (IProject)projectIterator.next();
            System.out.println(p.getProjectInfo());
        }

        for (IProject p:project) {
            System.out.println(p.getProjectInfo());
        }
    }
}
