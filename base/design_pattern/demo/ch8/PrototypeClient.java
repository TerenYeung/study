import java.util.*;
/**
 * @description 广告信模板
 */
class AdvTemplate {
    private String advSubject = "XX 银行国庆信用卡抽奖活动";
    private String advContext = "国庆抽象活动通知：只要刷卡就送你一百万！...";
    public String getAdvSubject() {
        return this.advSubject;
    }
    public String getAdvContext() {
        return this.advContext;
    }
}

/**
 * @description 邮件类代码
 */
class Mail implements Cloneable {
    private String receiver;
    private String subject;
    private String appellation;
    private String contxt;
    private String tail;
    public Mail(AdvTemplate advTemplate) {
        this.subject = advTemplate.getAdvSubject();
        this.contxt = advTemplate.getAdcContext();
    }
    @Override
    public Mail clone() {
        Mail mail = null;
        try {
            mail = (Mail)super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return mail;
    }
    public String getReceiver() {
        return this.receiver;
    }
    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }
    public String getSubject() {
        return this.subject;
    }
    public void setSubject(String subject) {
        this.subject = subject;
    }
    public String getAppellation() {
        return this.appellation;
    }
    public void setAppellation(String appellation) {
        this.appellation = appellation;
    }
    public String getContxt() {
        return this.contxt;
    }
    public void setContxt(String contxt) {
        this.contxt = contxt;
    }
    public String getTail() {
        return this.tail;
    }
    public void setTail(String tail) {
        this.tail = tail;
    }
}

public class PrototypeClient {
    private static int MAX_COUNT = 6;
    public static void main(String[] args) {
        int i = 0;
        Mail mail = new Mail(new AdvTemplate());
        mail.setTail("XX 银行版权所有");
        while(i < MAX_COUNT) {
            Mail cloneMail = mail.clone();
            cloneMail.setAppellation(getRandString(5) + " 先生（女士）");
            cloneMail.setReceiver(getRandString(5) + "@" + getRandString(8) + ".com");
            sendMail(cloneMail);
            i++;
        }
    }
    public static void sendMail(Mail mail) {
        System.out.println("标题：" + mail.getSubject() + "\t收件人：" + mail.getReceiver() + "\t...发送成功！");
    }
    public static String getRandString(int maxLength) {
        String source = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        StringBuffer sb = new StringBuffer();
        Random rand = new Random();
        for (int i = 0; i < maxLength; i++) {
            sb.append(source.charAt(rand.nextInt(source.length())));
        }
        return sb.toString();
    }
}