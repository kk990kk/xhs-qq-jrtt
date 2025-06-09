// 设备分辨率：1080x2400
setScreenMetrics(1080, 2400);
auto.waitFor();

// 智能解锁和设备唤醒
if (!device.isScreenOn()) {
    device.wakeUp();
    sleep(1500);
}

// 启动小红书
app.launch("com.xingin.xhs");
sleep(500);

// 用户友好提示
//toast("请选择要分享的文章");

// 点击分享按钮并尝试复制链接，失败则重试
let maxRetry = 3;
let retry = 0;
while (retry < maxRetry) {
   // 等待并点击分享按钮，直到找到为止
    while (true) {
        let shareBtn = id("moreOperateIV").findOne(3000);
        if (shareBtn) {
            shareBtn.click();
            sleep(1000);
            break; // 找到并点击后跳出内层循环
        } else {
            // click(1006, 190); // 备用坐标
            sleep(1000);
        }
    }

    // 查找复制链接按钮
    let copyBtn = desc("复制链接").findOne(3000);
    if (copyBtn) {
        let b = copyBtn.bounds();
        click(b.centerX(), b.centerY());
        sleep(800);
        break; // 找到并点击后跳出循环
    } else {
        toast("未找到复制链接按钮，重试第" + (retry + 1) + "次");
        retry++;
        sleep(1000);
        if (retry == maxRetry) {
            toast("多次未找到复制链接按钮，退出");
            exit();
        }
    }
}
// 返回
let backBtn = id("0_resource_name_obfuscated").className("android.widget.Button").desc("返回").findOne(3000);
if (backBtn) {
    backBtn.click();
    sleep(800);
} else {
    toast("未找到返回按钮，使用坐标点击兜底");
    click(51, 187);
    sleep(800);
}

// 返回桌面
home();
sleep(200);

// 查找并点击桌面上的“球球去水印”快捷方式
let qqShortcut = desc("球球去水印").findOne(5000);
if (!qqShortcut) {
    qqShortcut = text("球球去水印").findOne(5000);
}
if (qqShortcut) {
    qqShortcut.click();
    sleep(1500); // 等待小程序加载
} else {
    toast("未找到球球去水印快捷方式");
    exit();
}
// 粘贴链接
click(908, 355); // 点击输入框
sleep(1500);

// 提取素材
click(553, 834); // 立即提取
sleep(5000); // 增加处理时间

// 保存图片
click(756, 2266); // 保存全部图片
sleep(7000); // 等待7秒，确保图片保存完成

// 复制标题
click(892,622);
sleep(800);
click(1009, 697); // 点击标题
sleep(800);

back();
sleep(500);

sleep(200);
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

// 等待用户选择图片并点击完成按钮
let completed = false;
let maxWaitTime = 60; // 最大等待时间（秒）
let waitCount = 0;

while (!completed && waitCount < maxWaitTime) {
    if (id("brn").exists()) {
        toast("完成按钮已出现，等待用户点击...");
        console.log("完成按钮已出现，等待用户点击...");
        // 等待用户点击完成按钮
        while (id("brn").exists()) {
            sleep(500);
        }
        completed = true;
    } else {
        toast("等待完成按钮出现：${waitCount * 0.5}秒");
        console.log("等待完成按钮出现：${waitCount * 0.5}秒");
        sleep(500);
        waitCount++;
    }
}

if (!completed) {
    toast("等待超时，退出脚本");
    console.log("等待超时，退出脚本");
    exit();
}


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