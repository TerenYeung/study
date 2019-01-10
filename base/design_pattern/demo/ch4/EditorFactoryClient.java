interface IEditor {}

abstract class AbstractEditorOS implements IEditor {
    public abstract void doSomething();
}

abstract class AbstractEditorWin implements IEditor {
    public abstract void doSomething();
}

class EditorOS extends AbstractEditorOS {
    public void doSomething() {
        System.out.println("OS 编辑器...");
    }
}

class EditorWin extends AbstractEditorWin {
    public void doSomething() {
        System.out.println("Win 编辑器...");
    }
}

abstract class AbstractEditorFactory {
    public abstract AbstractEditorOS createEditorOS();

    public abstract AbstractEditorWin createEditorWin();
}

class EditorFactory extends AbstractEditorFactory {
    public AbstractEditorOS createEditorOS() {
        return new EditorOS();
    }

    public AbstractEditorWin createEditorWin() {
        return new EditorWin();
    }
}

public class EditorFactoryClient {
    public static void main(String[] args) {
        AbstractEditorFactory editorFactory = new EditorFactory();
        AbstractEditorOS editorOS = editorFactory.createEditorOS();
        AbstractEditorWin editorWin = editorFactory.createEditorWin();
        editorOS.doSomething();
        editorWin.doSomething();
    }
}