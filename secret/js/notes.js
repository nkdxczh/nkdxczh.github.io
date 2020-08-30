function TreeNode(type, name, father,url){
    this.children = [];
    this.father = father;
    this.url = url;
    this.name = name;
    this.type = type;
}

var root = new TreeNode('dir',null, null,null);
var current = root;

function add(node, path, file, url){
    if(path.length == 0){
        var newNode = new TreeNode('file', file, node, url);
        node.children.push(newNode);
    }else{
        nextDir = path[0];
        for(var i = 0; i < node.children.length; i++){
            if(node.children[i].name == nextDir && node.children[i].type == 'dir')break;
        }
        if(i == node.children.length){
            var newNode = new TreeNode('dir', nextDir, node, null);
            node.children.push(newNode);
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
    for(var i = 0; i < current.children.length; i++){
        if(current.children[i].name == path && current.children[i].type == 'dir'){
            current = current.children[i];
            return true;
        }
    }
    return false;
}

function FsLs(){
    var result = '<p class="prompt">';
    for(var i = 0; i < current.children.length; i++){
        if(current.children[i].type == 'file')
            result += "<a class='link' onclick=\"resetForm(6,\'vi "+current.children[i].name+"\')\">"+current.children[i].name + '</a> | ';
        else
            result += current.children[i].name + ' | ';
    }
    if(result =='<p class="prompt">')return '<p class="prompt"></p>';
    return result.slice(0,result.length-3) + '</p>';
}

function FsVi(f, ele){
    for(var i = 0; i < current.children.length; i++){
        if(current.children[i].name == f && current.children[i].type == 'file'){
            ele.src = current.children[i].url;
            return '<p class="prompt">Open file</p>';
        }
    }
    return '<p class="prompt">No this file</p>';
}

function FsTree(node = current, tabs = "|-"){
    result = ""; 
    for(var i = 0; i < node.children.length; i++){
        if(node.children[i].type == 'file'){
            result += "<p class=\"prompt\">"+tabs+"<a class='link' hrefi="+node.children[i].url+" onclick=\"resetForm(6,\'vi "+node.children[i].name+"\')\">"+node.children[i].name + '</a></p>';
        }else{
            result += "<p class=\"prompt\">"+tabs+node.children[i].name+'</p>';
            result += FsTree(node.children[i], '  '+tabs);
        }
    }
    return result;
}

function buildFS(text){
    root = new TreeNode('dir',null, null,null);
    var files = text.split('\n');
    for(var f = 0; f < files.length-1; f++){
        data = files[f].split(';');
        path = data[0].split('/');
        file = data[1];
        url = data[2];
        add(root, path, file, url);
    }
    current = root;
}

function loadFS(){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "https://zhanhao.org/doc/notes", true);
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
