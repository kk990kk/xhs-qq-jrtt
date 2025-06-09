// ====== 以小红书启动为标志自动运行一次 ======

// 监听小红书App启动
while (true) {
    let pkg = currentPackage();
    if (pkg === "com.xingin.xhs") {
        toast("检测到小红书已启动，开始自动化流程");
        break;
    }
    sleep(1000);
}

// ====== 主流程函数 ======
function main() {
    setScreenMetrics(1080, 2400);
    auto.waitFor();

    if (!device.isScreenOn()) {
        device.wakeUp();
        sleep(1500);
    }

    // 点击分享按钮并尝试复制链接，失败则重试
    let maxRetry = 3;
    let retry = 0;
    while (retry < maxRetry) {
        while (true) {
            let shareBtn = id("moreOperateIV").findOne(3000);
            if (shareBtn) {
                shareBtn.click();
                sleep(1000);
                break;
            } else {
                sleep(1000);
            }
        }
        let copyBtn = desc("复制链接").findOne(3000);
        if (copyBtn) {
            let b = copyBtn.bounds();
            click(b.centerX(), b.centerY());
            sleep(800);
            break;
        } else {
            toast("未找到复制链接按钮，重试第" + (retry + 1) + "次");
            retry++;
            sleep(1000);
            if (retry == maxRetry) {
                toast("多次未找到复制链接按钮，退出");
                return;
            }
        }
    }

    let backBtn = id("0_resource_name_obfuscated").className("android.widget.Button").desc("返回").findOne(3000);
    if (backBtn) {
        backBtn.click();
        sleep(800);
    } else {
        toast("未找到返回按钮，使用坐标点击兜底");
        click(51, 187);
        sleep(800);
    }

    home();
    sleep(200);

    let qqShortcut = desc("球球去水印").findOne(5000);
    if (!qqShortcut) {
        qqShortcut = text("球球去水印").findOne(5000);
    }
    if (qqShortcut) {
        qqShortcut.click();
        sleep(1500);
    } else {
        toast("未找到球球去水印快捷方式");
        return;
    }

    click(908, 355);
    sleep(1500);
    click(553, 834);
    sleep(5000);
    click(756, 2266);
    sleep(7000);

    click(892,622);
    sleep(800);
    click(1009, 697);
    sleep(800);

    back();
    sleep(500);
    sleep(200);

    // 打开今日头条
    app.launch("com.ss.android.article.news");
    sleep(2000);

    let publishBtn = id("hr7").findOne(10000);
    if (publishBtn) {
        publishBtn.click();
        sleep(1500);
    } else {
        toast("未找到发布按钮");
        return;
    }

    let articleBtn = className("android.widget.FrameLayout").bounds(0, 2262, 270, 2400).findOne(3000);
    if (articleBtn) {
        articleBtn.click();
        sleep(1000);
    } else {
        toast("未找到文章按钮");
        click(135, 2331);
        sleep(1000);
        return;
    }

    click(268, 308);
    sleep(500);
    click(952,2317);
    sleep(500);
    click(517,1699);
    sleep(500);
    click(195,607);
    sleep(500);

    let addPicBtn = className("android.widget.Button").desc("添加图片").findOne(5000);
    if (addPicBtn) {
        addPicBtn.click();
        sleep(1500);
    } else {
        toast("未找到添加图片按钮");
        return;
    }

    toast("请手动选择图片并点击完成按钮");
    // 等待用户选择图片并点击完成按钮
    // 等待“完成”按钮出现（用户至少选择了一张图片）
    while (!id("brn").exists()) {
        toast("等待用户选择图片...");
        sleep(500);
    }
    toast("完成按钮已出现，等待用户调整顺序并点击完成...");
    // 等待“完成”按钮消失（用户点击了完成，进入下一步）
    while (id("brn").exists()) {
        sleep(500);
    }
    // 增加等待，确保页面切换完成
    sleep(1500);

    let nextBtn = id("mpd").className("android.widget.Button").text("下一步").findOne(5000);
    if (nextBtn) {
        nextBtn.click();
        sleep(500);
    } else {
        click(945,160);
        return;
    }

    let publishBtn2 = id("byp").className("android.widget.TextView").text("发布").desc("发布").findOne(5000);
    if (publishBtn2 && publishBtn2.clickable()) {
        publishBtn2.click();
        sleep(500);
    } else {
        toast("未找到‘发布’按钮");
        return;
    }

    sleep(4000);
    toast("内容已发布");
    home();
}

// ====== 调用主流程 ======
main();
