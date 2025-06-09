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
    let copyBtn = desc("复制链接").findOne(5000);
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