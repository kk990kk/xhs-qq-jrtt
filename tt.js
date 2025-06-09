// 设置分辨率
setScreenMetrics(1080, 2400);
auto.waitFor();

// 打开今日头条
app.launch("com.ss.android.article.news");
sleep(2000);

/* let myText = text("我的").findOne(3000);
if (myText) {
    // 获取父控件（一般为可点击的容器）
    let parent = myText.parent();
    // 检查父控件是否可点击
    if (parent && parent.clickable()) {
        // toast("点击父级容器");
        parent.click();
    } else {
        // 兜底用坐标点击
        let b = parent ? parent.bounds() : myText.bounds();
        click(b.centerX(), b.centerY());
    }
    sleep(1000);
} */

// 点击发布按钮
let publishBtn = id("hr7").findOne(10000);
if (publishBtn) {
    publishBtn.click();
    sleep(2000);
} else {
    toast("未找到发布按钮");
    exit();
}

// 查找并点击“文章”按钮的FrameLayout
let articleBtn = className("android.widget.FrameLayout").bounds(0, 2262, 270, 2400).findOne(3000);
if (articleBtn) {
    articleBtn.click();
    sleep(1000);
} else {
    toast("未找到文章按钮");
    click(135, 2331); // 取按钮中心点
    sleep(1000);
    exit();
}

// 粘贴标题
click(268, 308); // 点击标题输入框
sleep(500);
click(952,2317);
sleep(500);
click(517,1699); 
sleep(500);
click(195,607);
sleep(500);
// 添加图片
let addPicBtn = className("android.widget.Button").desc("添加图片").findOne(5000);
if (addPicBtn) {
    addPicBtn.click();
    sleep(1500);
} else {
    toast("未找到添加图片按钮");
    exit();
}

// 用户手动调整图片顺序
toast("请手动调整图片顺序");

// 等待“完成”按钮出现（id为brn），最多等60秒
let waitCount = 0;
while (!id("brn").exists() && waitCount < 60) {
    toast("等待完成按钮出现：${waitCount * 0.5}秒");
    console.log("等待完成按钮出现：${waitCount * 0.5}秒");
    sleep(500);
    waitCount++;
}
if (!id("brn").exists()) {
    toast("完成按钮未出现，退出脚本");
    console.log("完成按钮未出现，退出脚本");
    exit();
}

// 等待用户点击完成按钮（即“完成”按钮消失）
while (id("brn").exists()) {
    toast("等待用户点击完成按钮...");
    console.log("等待用户点击完成按钮...");
    sleep(500);
}
toast("用户已点击完成按钮");
console.log("用户已点击完成按钮");
sleep(1000);

// 点击“下一步”按钮
let nextBtn = id("mpd").className("android.widget.Button").text("下一步").findOne(5000);
if (nextBtn) {
    nextBtn.click();
    sleep(500);
} else {
    click(945,160); // 兜底用坐标点击
    exit();
}

// 确认发布按钮
let publishBtn2 = id("byp").className("android.widget.TextView").text("发布").desc("发布").findOne(5000);
if (publishBtn2 && publishBtn2.clickable()) {
    publishBtn2.click();
    sleep(500);
} else {
    toast("未找到‘发布’按钮");
    exit();
}

// 等待发布完成
sleep(4000);
toast("内容已发布");

// 返回桌面
home();