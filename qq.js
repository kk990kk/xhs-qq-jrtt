// 设置分辨率
setScreenMetrics(1080, 2400);
auto.waitFor();

// 返回桌面
home();
sleep(500);

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
sleep(7000); // 等待8秒，确保图片保存完成

// 复制标题
click(892,622);
sleep(1000);
click(1009, 697); // 点击标题
sleep(1000);

back();
sleep(500);

// 返回桌面
home();