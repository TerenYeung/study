interface IConnectMail {
    public void connect();
}

class ConnectToPOP3 implements IConnectMail {
    public void connect() {
        System.out.println("POP3 连接...");
    }
}

class ConnectToIMAP implements IConnectMail {
    public void connect() {
        System.out.println("IMAP 连接...");
    }
}

class ConnectToHTTP implements IConnectMail {
    public void connect() {
        System.out.println("HTTP 连接...");
    }
}

abstract class AbstractMailConnectFactory {
    public abstract <T extends IConnectMail> T createConnect(Class<T> c);
}

class MailConnectFactory extends AbstractMailConnectFactory {
    public <T extends IConnectMail> T createConnect(Class<T> c) {
        IConnectMail connectMail = null;
        try {
            connectMail = (T)Class.forName(c.getName()).newInstance();
        } catch(Exception e) {
            System.out.println("连接错误...");
        }
        return (T)connectMail;
    }
}

public class MailClient {
    public static void main(String[] args) {
        AbstractMailConnectFactory PostPort = new MailConnectFactory();
        IConnectMail pop3Connect = PostPort.createConnect(ConnectToPOP3.class);
        pop3Connect.connect();
    }
}