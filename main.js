let basePath = "/sdcard/脚本/";
let xhsPath = basePath + "xhs.js";
let qqPath = basePath + "qq.js";
let ttPath = basePath + "tt.js";

//toast("开始执行小红书脚本");
engines.execScriptFile(xhsPath);
sleep(10000); // 估算小红书脚本最大用时

//toast("开始执行球球助手脚本");
engines.execScriptFile(qqPath);
sleep(20000); // 估算球球助手脚本最大用时

//toast("开始执行今日头条脚本");
engines.execScriptFile(ttPath);
sleep(30000); // 估算今日头条脚本最大用时

toast("全部流程已完成");