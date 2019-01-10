import java.util.HashMap;

/**
 * @description 报考信息实现类
 */
class SignInfo {
    private String id;
    private String location;
    private String subject;
    private String postAddress;
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public String getSubject() {
        return subject;
    }
    public void setSubject(String subject) {
        this.subject = subject;
    }
    public String getPostAddress() {
        return postAddress;
    }
    public void setPostAddress(String postAddress) {
        this.postAddress = postAddress;
    }
}

/**
 * @description 带对象池的报考信息类
 */
class SignInfoPool extends SignInfo {
    private String key;
    public SignInfoPool(String _key) {
        this.key = _key;
    }
    public String getKey() {
        return key;
    }
    public void setKey(String key) {
        this.key = key;
    }
}

/**
 * @description 报考信息工厂
 */
class SignInfoFactory {
    // 池容器
    private static HashMap<String, SignInfo> pool = new HashMap<String, SignInfo>();
    @Deprecated
    public static SignInfo getSignInfo() {
        return new SignInfo();
    }
    public static SignInfo getSignInfo(String key) {
        SignInfo result = null;
        if (!pool.containsKey(key)) {
            System.out.println(key + "---建立对象，并放置到池中");
            result = new SignInfoPool(key);
            pool.put(key, result);
        } else {
            result = pool.get(key);
            System.out.println(key + "---直接从池中取得");
        }
        return result;
    }
}


/**
 * @description 场景类
 */
public class SignInfoClient {
    public static void main(String[] args) {
        for (int i = 0; i < 4; i++) {
            String subject = "科目" + i;
            for (int j = 0; j < 30; j ++) {
                String key = subject + "考试地点" + j;
                SignInfoFactory.getSignInfo(key);
            }
        }
        SignInfo signInfo = SignInfoFactory.getSignInfo("科目1考试地点1");
    }
}