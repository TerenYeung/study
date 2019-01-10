interface ILetterProcess {
    public void writeContext(String context);
    public void fillEnvelope(String address);
    public void letterIntoEnvelope();
    public void sendLetter();
}

class LetterProcess implements ILetterProcess {
    public void writeContext(String context) {
        System.out.println("填写信的内容..." + context);
    }
    public void fillEnvelope(String address) {
        System.out.println("填写收件人地址及姓名..." + address);
    }
    public void letterIntoEnvelope() {
        System.out.println("把信放到信封中...");
    }
    public void sendLetter() {
        System.out.println("邮递信件...");
    }
}

class ModernPostOffice {
    private ILetterProcess letterProcess = new LetterProcess();
    public void sendLetter(String context, String address) {
        letterProcess.writeContext(context);
        letterProcess.fillEnvelope(address);
        letterProcess.letterIntoEnvelope();
        letterProcess.sendLetter();
    }
}

public class FacadeClient {
    public static void main(String[] args) {
        ModernPostOffice postOffice = new ModernPostOffice();
        postOffice.sendLetter("Hell World!", "Happy Road No. 666");
    }
}

