// import java.util.HashMap;
import java.util.*;
/**
 * @description 内部员工信息接口
 */
interface IUserInfo {
    public String getUserName();
    public String getHomeAddress();
    public String getMobileNumber();
    public String getOfficeTelNumber();
    public String getJobPosition();
    public String getHomeTelNumber();
}

class UserInfo implements IUserInfo {
    public String getUserName() {
        System.out.println("姓名叫做...");
        return null;
    }
    public String getHomeAddress() {
        System.out.println("这里是员工的家庭地址...");
        return null;
    }
    public String getMobileNumber() {
        System.out.println("员工的家庭电话是...");
        return null;
    }
    public String getOfficeTelNumber() {
        System.out.println("办公室电话是...");
        return null;
    }
    public String getJobPosition() {
        System.out.println("这个人的职位是 BOSS ...");
        return null;
    }
    public String getHomeTelNumber() {
        System.out.println("员工的家庭电话是...");
        return null;
    }
}

/**
 * @descriptin 外部劳务公司人员信息接口
 */
interface IOuterUser {
    public Map getUserBaseInfo();
    public Map getUserOfficeInfo();
    public Map getUserHomeInfo();
}

class OuterUser implements IOuterUser {
    private Map baseInfoMap = new HashMap();
    private Map homeInfoMap = new HashMap();
    private Map officeInfoMap = new HashMap();
    public OuterUser() {
        baseInfoMap.put("userName", "Teren");
        baseInfoMap.put("mobileNumber", "123456");
        homeInfoMap.put("homeTelNumber", "123456");
        homeInfoMap.put("homeAddress", "广州市天河区");
        officeInfoMap.put("jobPosition", "BOSS");
        officeInfoMap.put("officeTelNumber", "123456");
    }
    public Map getUserBaseInfo() {
        return baseInfoMap;
    }
    public Map getUserHomeInfo() {
        return homeInfoMap;
    }
    public Map getUserOfficeInfo() {
        return officeInfoMap;
    }
}

/**
 * @description 适配器
 */
class OuterUserInfo extends OuterUser implements IUserInfo {
    private Map baseInfoMap = super.getUserBaseInfo();
    private Map homeInfoMap = super.getUserHomeInfo();
    private Map officeInfoMap = super.getUserOfficeInfo();
    public String getUserName() {
        String userName = (String)this.baseInfoMap.get("userName");
        System.out.println("姓名叫做" + userName);
        return userName;
    }
    public String getHomeAddress() {
        String homeAddress = (String)this.homeInfoMap.get("homeAddress");
        System.out.println("这里是员工的家庭地址" + homeAddress);
        return homeAddress;
    }
    public String getMobileNumber() {
        String mobileNumber = (String)this.baseInfoMap.get("mobileNumber");
        System.out.println("员工的家庭电话是" + mobileNumber);
        return mobileNumber;
    }
    public String getOfficeTelNumber() {
        String officeTelNumber = (String)this.officeInfoMap.get("officeTelNumber");
        System.out.println("办公室电话是" + officeTelNumber);
        return officeTelNumber;
    }
    public String getJobPosition() {
        String jobPosition = (String)this.officeInfoMap.get("jobPosition");
        System.out.println("这个人的职位是" + jobPosition);
        return jobPosition;
    }
    public String getHomeTelNumber() {
        String homeTelNumber = (String)this.homeInfoMap.get("homeTelNumber");
        System.out.println("员工的家庭电话是" + homeTelNumber);
        return homeTelNumber;
    }
}

public class ClassAdapterClient {
    public static void main(String[] args) {
        IUserInfo prettyGirl = new UserInfo();
        prettyGirl.getMobileNumber();
        IUserInfo prettyOuterGirl = new OuterUserInfo();
        prettyOuterGirl.getMobileNumber();
    }
}