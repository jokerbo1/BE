// 主要负责操作xml文件的增删查改 以及新增组
var dataPath = "../data/task.xml"
var domParser = new DOMParser();
var taskSuite = "taskSuite";
var taskGroup = "taskGroup";
var taskName = "task";
var finishName = "finish"
var timeName = "time"
var fs = require('fs');
var path = require('path');
var DATAMODULE ={
/**
 * 
 * @param {String} tg  任务组名称
 */
addTaskGroup:function(tg) {
    text = fs.readFileSync(path.join(__dirname,dataPath))
    var data = domParser.parseFromString(text, "text/xml");
    var group = data.getElementsByName(tg);
    if (group == undefined || group.length<=0) {
        var rootElement = data.getElementsByTagName(taskSuite);
        if(rootElement.length<=0)return;
        var node = data.createElement("taskGroup");
        node.setAttribute("name", tg)
        rootElement[0].appendChild(node)
    }else{
        var rootElement = data.getElementsByTagName(taskSuite);
        if(rootElement.length<=0)return;
        var node = data.createElement("taskGroup");
        node.setAttribute("name", tg+"1")
        rootElement[0].appendChild(node)
    }
    fs.writeFileSync(path.join(__dirname,dataPath),new XMLSerializer().serializeToString(data))
},

/**
 * 
 * @param {String} tg  根据名称删除任务组
 */
 delTaskGroup:function(tg) {
    text = fs.readFileSync(path.join(__dirname,dataPath))
    var data = domParser.parseFromString(text, "text/xml");
    var group = data.getElementsByName(tg);
    if (group != undefined && group.length>0) {
        group[0].parentElement.removeChild(group[0])
        // data.removeChild(group[0]);
    }
    fs.writeFileSync(path.join(__dirname,dataPath),new XMLSerializer().serializeToString(data))
},

/**
 * 展示所有的任务组
 */
 viewTaskGroup:function() {
    var list = [];
    text = fs.readFileSync(path.join(__dirname,dataPath))
    var data = domParser.parseFromString(text,"text/xml");
    var group = data.getElementsByTagName(taskGroup);
    if (group == undefined || group.length<=0) {
        return [];
    }
    
    //遍历对象获取属性值 ，返回列表供前端渲染
    for (var j=0;j<group.length;j++) {
        var node = group[j];
        list.push(node.getAttribute("name"));
    }
    console.log("list"+list);
    return list;
},

/**
 * 添加任务
 * @param {*} tg  任务组名称
 * @param {*} task 任务详细内容
 */
 addTask:function(tg, task,time) {
    text = fs.readFileSync(path.join(__dirname,dataPath))
    var data = domParser.parseFromString(text, "text/xml");
    var group = data.getElementsByName(tg);
    if (group == undefined || group.length<=0) {
        return "任务组不存在" + tg;
    }
    var node = data.createElement(taskName);
    node.setAttribute(finishName,false)
    node.setAttribute(timeName,time)
    node.textContent = task;
    group[0].appendChild(node)
    fs.writeFileSync(path.join(__dirname,dataPath),new XMLSerializer().serializeToString(data))
},

/**
 * 删除任务
 * @param {*} tg 任务组名称
 * @param {*} id 任务id
 */
 delTask:function(tg, id) {
    text = fs.readFileSync(path.join(__dirname,dataPath))
    var data = domParser.parseFromString(text, "text/xml");
    var group = data.getElementsByName(tg);
    if (group == undefined || group.length<=0) {
        return "任务组不存在" + tg;
    }
    task = group[0].getElementsByTagName(taskName)[id];
    group[0].removeChild(task);
    fs.writeFileSync(path.join(__dirname,dataPath),new XMLSerializer().serializeToString(data))
},
/**
 * 设置完成任务
 * @param {*} tg 任务组名称
 * @param {*} id 任务id
 */
finishTask:function(tg, id) {
    text = fs.readFileSync(path.join(__dirname,dataPath))
    var data = domParser.parseFromString(text, "text/xml");
    var group = data.getElementsByName(tg);
    if (group == undefined || group.length<=0) {
        return "任务组不存在" + tg;
    }
    task = group[0].getElementsByTagName(taskName)[id];
    task.setAttribute(finishName,true)
    task.textContent = new Date().toLocaleString() +" "+task.textContent;
    fs.writeFileSync(path.join(__dirname,dataPath),new XMLSerializer().serializeToString(data))
},

/**
   * 根据任务组展示所有的任务
   */
 viewTaskByGroupName:function(tg) {
    text = fs.readFileSync(path.join(__dirname,dataPath))
    var data = domParser.parseFromString(text, "text/xml");
    var group = data.getElementsByName(tg);
    if (group == undefined || group.length<=0) {
        return [];
    }
    var tasks = group[0].getElementsByTagName(taskName);
    if (tasks == undefined) return [];
    var taskList = [];
    //遍历对象获取属性值 ，返回列表供前端渲染
    for (var j=0;j<tasks.length;j++) {
        var node = tasks[j];
        fv= node.getAttribute(finishName)
        if( fv==undefined || fv==null){
            taskList.push({ key:j,value:node.textContent,finish:false,time:node.getAttribute(timeName) });
            continue;
        }
        taskList.push({ key:j,value:node.textContent,finish:fv=="true"?true:false,time:node.getAttribute(timeName) });
    }
    return taskList;
 }
}

module.exports = DATAMODULE;

