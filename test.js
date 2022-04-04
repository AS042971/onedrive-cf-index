  var danmaku_area = 0.05
  // 修改
  var danmaku_size = 30
  // 修改完
  var art = new Artplayer({
    container: document.querySelector('.artplayer-app'),
    url: 'https://jsxm.sharepoint.cn/sites/nf-asoul/_layouts/15/download.aspx?UniqueId=0fee52f5-2ee1-429a-bf4f-ac8a75865a54&Translate=false&tempauth=eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvanN4bS5zaGFyZXBvaW50LmNuQGE4Y2NjNDgzLTY1NjktNDlhMC1hNjYxLWQ2YTFmMTViOWZhMSIsImlzcyI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMCIsIm5iZiI6IjE2NDkwODUyMjEiLCJleHAiOiIxNjQ5MDg4ODIxIiwiZW5kcG9pbnR1cmwiOiJmY05KcFhkd3Q1R1FDWngrUk9OdFFiNktSWHY2R2pnMGtYc1FEb0Y4U1g0PSIsImVuZHBvaW50dXJsTGVuZ3RoIjoiMTI5IiwiaXNsb29wYmFjayI6IlRydWUiLCJjaWQiOiJPV1UxWVRobE5tVXRaVGd6TUMwME1XRTRMVGxqWkRRdE9UUTBNemcxTUdVMFpHUXciLCJ2ZXIiOiJoYXNoZWRwcm9vZnRva2VuIiwic2l0ZWlkIjoiWVRCa00yTm1OVEl0WWpWaFppMDBPV013TFRneE4yVXRaakU0T0RJME16QTVZMll5IiwiYXBwX2Rpc3BsYXluYW1lIjoiTkYtQVNPVUwiLCJhcHBpZCI6Ijk4ZGU0ZjE0LTZkMjUtNDAzMS1hNmVmLWEwMmUxMzQ0OTMwYyIsInRpZCI6ImE4Y2NjNDgzLTY1NjktNDlhMC1hNjYxLWQ2YTFmMTViOWZhMSIsInVwbiI6ImtuYWlmZW5AYXNmLmluayIsInB1aWQiOiIxMDAzMzIzMEM2NDZBRDg0IiwiY2FjaGVrZXkiOiIwaC5mfG1lbWJlcnNoaXB8MTAwMzMyMzBjNjQ2YWQ4NEBsaXZlLmNvbSIsInNjcCI6ImFsbHNpdGVzLnJlYWQgYWxsc2l0ZXMud3JpdGUiLCJ0dCI6IjIiLCJ1c2VQZXJzaXN0ZW50Q29va2llIjpudWxsLCJpcGFkZHIiOiI0MC43Mi43NC4xOTMifQ.dVZnUmljY1FmQ1lxbUdqSjB6VmVLWmhCSjN1U1UyZjUzejc0c3Fna0dnTT0&ApiVersion=2.0',
    plugins: [artplayerPluginDanmuku({
        danmuku: 'https://dm.asdanmaku.com/Xml/2022.04.03 A-SOUL游戏室 三十三期 嘿嘿！入职A-SOUL！.xml',
        speed: 11,
        // 全局持续时间
        opacity: 0.7,
        // 全局透明度
        size: 30,
        // 全局字体大小
        maxlength: 100,
        // 全局最大长度
        synchronousPlayback: true,
        // 是否同步到播放速度
        margin: [0, 0]
    }), ],
    settings: [{
            width: 150,
            html: '弹幕开关',
            selector: [{
                    default: true,
                    html: '显示',
                    showDanmuku: true
                },
                {
                    html: '隐藏',
                    showDanmuku: false
                },
            ],
            onSelect: function (item) {
                if (item.showDanmuku) {
                    art.plugins.artplayerPluginDanmuku.show();
                } else {
                    art.plugins.artplayerPluginDanmuku.hide();
                }
            },
        },
        {
          width: 150,
          html: '弹幕显示区域',
          selector: [{
                  html: '四分之一屏',
                  danmaku_area: 0.75
              },
              {
                  html: '半屏',
                  danmaku_area: 0.5
              },
              {
                  html: '四分之三屏',
                  danmaku_area: 0.25
              },
              {
                  default: true,
                  html: '全屏',
                  danmaku_area: 0.05
              },
          ],
          onSelect: function (item) {
              danmaku_area = item.danmaku_area;
              // 修改
              pluginOption.margin[0] = -danmaku_size;
              pluginOption.margin[1] = art.height * item.danmaku_area;
              // 修改完
          },
        },
        {
            width: 150,
            html: '弹幕大小',
            selector: [{
                    html: '较小 (15px)',
                    size: 15
                },
                {
                    html: '小 (20px)',
                    size: 20
                },
                {
                    default: true,
                    html: '较小 (25px)',
                    size: 25
                },
                {
                    html: '适中 (30px)',
                    size: 30
                },
                {
                    html: '较大 (40px)',
                    size: 40
                },
                {
                    html: '很大 (50px)',
                    size: 50
                },
            ],
            onSelect: function (item) {
              // 修改
              danmaku_size = item.size
              pluginOption.fontSize = danmaku_size;
              pluginOption.margin[0] = -danmaku_size;
              pluginOption.margin[1] = art.height * item.danmaku_area;
              // 修改完
            },
        },
        {
            width: 150,
            html: '弹幕不透明度',
            selector: [{
                    html: '30%',
                    opacity: 0.3
                },
                {
                    html: '50%',
                    opacity: 0.5
                },
                {
                    default: true,
                    html: '70%',
                    opacity: 0.7
                },
                {
                    html: '90%',
                    opacity: 0.9
                },
                {
                    html: '100%',
                    opacity: 1.0
                }
            ],
            onSelect: function (item) {
              // 修改
              pluginOption.opacity = item.opacity;
              pluginOption.margin[0] = -danmaku_size;
              pluginOption.margin[1] = art.height * item.danmaku_area;
              // 修改完
            },
        }
    ],
    setting: true,
    whitelist: ['*'],
    autoSize: true,
    autoMini: true,
    flip: true,
    volume: 0.5,
    rotate: true,
    playbackRate: true,
    hotkey: true,
    pip: true,
    fullscreen: true,
    fullscreenWeb: true,
});
// 修改
var plugin = art.plugins.artplayerPluginDanmuku.config()
var pluginOption = plugin.option;
// 修改完
art.on('resize', () => {
  // 修改
  pluginOption.margin[0] = -danmaku_size;
  pluginOption.margin[1] = art.height * danmaku_area;
  // 修改完
});
// 修改
art.on('video:play', () => {
  pluginOption.margin[0] = -danmaku_size;
  pluginOption.margin[1] = art.height * danmaku_area;
});
// 修改完

fetch('https://dm.asdanmaku.com/Pbf/2022.04.03 A-SOUL游戏室 三十三期 嘿嘿！入职A-SOUL！.pbf')
    .then(response => response.text())
    .then(rawPBFStr => {

        var timelineTable = document.querySelector('.timeline')
        var highlight = []

        var rawPBFList = rawPBFStr.split(/[(\r\n)\r\n]+/);
        rawPBFList.shift()
        rawPBFList.forEach(PBFItem => {
            if (!PBFItem) {
                return
            }
            var PBFParts = PBFItem.split('*')
            if (PBFParts.length <= 2) {
                return
            }
            var timeMarker = PBFParts.shift()
            var timeMarkerParts = timeMarker.split('=')
            var time = parseInt(timeMarkerParts[1]) / 1000
            var text = PBFParts[0]

            timeButtonTd = document.createElement('td');
            timeButtonTd.innerText = new Date(time * 1000).toISOString().substr(11, 8);
            timeTextTd = document.createElement('td');
            timeTextTd.innerText = text;

            timelineRow = document.createElement('tr');
            timelineRow.style.cursor = "pointer";
            timelineRow.addEventListener('click', () => {
                art.seek = time;
            })
            timelineRow.appendChild(timeButtonTd);
            timelineRow.appendChild(timeTextTd);
            timelineTable.appendChild(timelineRow);

            highlight.push({
                "time": time,
                "text": text
            });
        });

        console.log(highlight)
        art.option.highlight = highlight;
    })
