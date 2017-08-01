function TreeNode(type, name, father,url){
    this.children = [];
    this.father = father;
    this.url = url;
    this.name = name;
    this.type = type;
}

var root = TreeNode(null, null);
var current = root;

function add(node, path, file, url){
    if(path.length == 0){
        var newNode = TreeNode('file', file, node, url);
        node.children.append(newNode);
    }else{
        nextDir = path[0];
        for(var i = 0; i < node.children.length, i++){
            if(node.children[i].name == nextDir && node.children[i].type == 'dir')break;
        }
        if(i == node.children.length){
            var newNode = TreeNode('dir', newDir, node, null);
            node.children.append(newNode);
            add(newNode, path.slice(1,path.length), file, url);
        }else{
            add(node.children[i], path.slice(1,path.length), file, url);
        }
    }
}

function FsCd(path){
    if(path == '..'){
        if(current.father != null)current = current.father;
        return true;
    }
    if(path == '.'){
        return true;
    }
    for(var i = 0; i < current.children.length, i++){
        if(current.children[i].name == nextDir && current.children[i].type == 'dir'){
            current = current.children[i];
            return true;
        }
    }
    return false;
}

function FsLs(){
    var result = '';
    for(var i = 0; i < current.children.length, i++){
        result += current.children[i].name;
    }
    return result;
}

function FsVi(ele, f){
    for(var i = 0; i < current.children.length, i++){
        if(current.children[i].name == f && current.children[i].type == 'file'){
            ele.src = current.children[i].url;
            return;
        }
    }
}

function buildFS(text){
    var files = text.split('\n');
    for(var f = 0; f < files.length; f++){
        data = files[f].split(';');
        path = data[0].split('/');
        file = data[1];
        url = data[2];
        add(root, path, file, url);
    }
}

function loadFiles(){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "../doc/notes", true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            var allText = rawFile.responseText;
            buildFS(allText);
        }
    }

    rawFile.send();
}
