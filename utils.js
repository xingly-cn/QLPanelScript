module.exports = {
  ftLog,
  checkUpdate,
  randomMac,
  randomUUID,
  ts13,
  ts10,
  ts2Date,
  randomText,
  randomPic,
};

import CryptoJS from "crypto-js";

function ftLog(...msg) {
  console.log(`[朱雀引擎] -> ${msg.join(" ")}`);
}

function checkUpdate(localVersion) {
  let axios = require("axios");
  return axios
    .get(
      `https://gitee.com/onesugar_1/QLPanelScript/raw/main/my_script/gqcqV3.js`
    )
    .then((res) => {
      let versionPattern = /version = "(\d+\.\d+\.\d+)";/; // 正则匹配版本号
      let remoteVersion = res.data.match(versionPattern)[1];
      if (localVersion !== remoteVersion) {
        ftLog(
          `脚本非最新哟～，当前版本：${localVersion}，最新版本：${remoteVersion}`
        );
      } else {
        ftLog("脚本已是最新版本，请客官放心使用~");
      }
      ftLog(`Github脚本仓库：https://github.com/xingly-cn/QLPanelScript`);
      ftLog(`猪头小分队交流群：821211436\n`);
    });
}

function randomMac() {
  return "XX:XX:XX:XX:XX:XX".replace(/X/g, function () {
    return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16));
  });
}

function randomUUID() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

function ts13() {
  return Math.round(new Date().getTime()).toString();
}

function ts10() {
  return Math.round(new Date().getTime() / 1000).toString();
}

function ts2Date(time = +new Date()) {
  if (time.toString().length == 13) {
    var date = new Date(time + 8 * 3600 * 1000);
    return date.toJSON().substr(0, 19).replace("T", " ");
  } else if (time.toString().length == 10) {
    time = time * 1000;
    var date = new Date(time + 8 * 3600 * 1000);
    return date.toJSON().substr(0, 19).replace("T", " ");
  }
}

function randomText() {
  let axios = require("axios");
  return axios
    .get(`https://api.vvhan.com/api/text/joke?type=json`)
    .then((res) => {
      let title = res.data.data.title;
      let content = res.data.data.content;
      return title + "&" + content;
    });
}

function randomPic() {
  let axios = require("axios");
  return axios
    .get(`https://api.vvhan.com/api/wallpaper/views?type=json`)
    .then((res) => {
      return res.data.data.url;
    });
}

