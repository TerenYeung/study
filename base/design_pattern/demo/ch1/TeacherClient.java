import java.util.*;

/**
 * 未遵循迪米特法则，不仅仅与直接的朋友类通信
 */
/*
class Teacher {
    public void command(GroupLeader groupLeader) {
        List listGirls = new ArrayList();

        for (int i = 0; i < 20; i++) {
            listGirls.add(new Girl());
        }

        groupLeader.countGirls(listGirls);
    }
}

class GroupLeader {
    public void countGirls(List<Girl> listGirls) {
        System.out.println("女生数量是：" + listGirls.size());
    }
}

class Girl {}

public class TeacherClient {
    public static void main(String[] args) {
        Teacher teacher = new Teacher();
        teacher.command(new GroupLeader());
    }
}
*/

class Teacher {
    public void command(GroupLeader groupLeader) {
        groupLeader.countGirls();
    }
}

class Girl {}

class GroupLeader {
    private List<Girl> listGirls;

    public GroupLeader(List<Girl> _listGirls) {
        this.listGirls = _listGirls;
    }

    public void countGirls() {
        System.out.println("女生数量是：" + this.listGirls.size());
    }
}

public class TeacherClient {
    public static void main(String[] args) {
        List<Girl> listGirls = new ArrayList<Girl>();

        for (int i = 0; i < 20; i++)
            listGirls.add(new Girl());

        Teacher teacher = new Teacher();
        teacher.command(new GroupLeader(listGirls));
    }
}