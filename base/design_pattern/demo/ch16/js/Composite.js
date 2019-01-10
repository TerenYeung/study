var Folder = function(name) {
    this.name = name;
    this.files = [];
    this.parent = null;
}

Folder.prototype.add = function(file) {
    file.parent = this;
    this.files.push(file);
}

Folder.prototype.remove = function() {
    if (!this.parent) return false;

    for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
        if (files[l] === this) {
            files.splice(l, 1);
        }
    }
    return true
}

Folder.prototype.scan = function() {
    console.log('start scanning...' + this.name);

    for (var i = 0, file, files = this.files; file = files[i++];) {
        file.scan()
    }
}

var File =function(name) {
    this.name = name;
    this.parent = null;
}

File.prototype.add = function() {
    throw new Error('无法在文件下面添加。')
}

File.prototype.remove = function() {
    if (!this.parent) return false;

    for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
        if (files[l] === this) {
            files.splice(l, 1);
        }
    }
    return true;
}

File.prototype.scan = function() {
    console.log('start scanning...' + this.name);
}

var root = new Folder('root');
var fe = new Folder('fe');
var be = new Folder('be');
var js = new Folder('js');
var html = new Folder('html');
var python = new Folder('python');
var book1 = new File('JavaScript 设计模式');
var book2 = new File('深入浅出 Node.js');
var book3 = new File('Python 之禅');

root.add(fe);
root.add(be);
fe.add(js);
fe.add(html);
be.add(python)
js.add(book1);
js.add(book2);
python.add(book3);
root.scan();
console.log('---------')
html.remove();
book2.remove();
root.scan();