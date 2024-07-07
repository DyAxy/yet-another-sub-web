export const config = {
    clients: {
        Clash: "clash",
        Surge: "surge&ver=4",
        Quantumult: "quan",
        QuantumultX: "quanx",
        Mellow: "mellow",
        Surfboard: "surfboard",
        Loon: "loon",
        singbox: "singbox",
        ss: "ss",
        ssd: "ssd",
        sssub: "sssub",
        ssr: "ssr",
        ClashR: "clashr",
        V2Ray: "v2ray",
        Trojan: "trojan",
        Surge3: "surge&ver=3"
    },
    switchCells: [
        { title: "TCP 快速打开", key: "tfo" },
        { title: "UDP 启用", key: "udp" },
        { title: "关闭证书检查", key: "scv" },
        { title: "显示节点类型", key: "append_type" },
        { title: "显示 Emoji 旗帜", key: "emoji" },
        { title: "仅输出为节点", key: "list" }
    ],
    remoteConfig: [
        {
            label: "No-Urltest",
            value:
                "https://cdn.jsdelivr.net/gh/SleepyHeeead/subconverter-config@master/remote-config/universal/no-urltest.ini"
        },
        {
            label: "Urltest",
            value:
                "https://cdn.jsdelivr.net/gh/SleepyHeeead/subconverter-config@master/remote-config/universal/urltest.ini"
        },
        {
            label: "Maying",
            value:
                "https://cdn.jsdelivr.net/gh/SleepyHeeead/subconverter-config@master/remote-config/customized/maying.ini"
        },
        {
            label: "Ytoo",
            value:
                "https://cdn.jsdelivr.net/gh/SleepyHeeead/subconverter-config@master/remote-config/customized/ytoo.ini"
        },
        {
            label: "FlowerCloud",
            value:
                "https://cdn.jsdelivr.net/gh/SleepyHeeead/subconverter-config@master/remote-config/customized/flowercloud.ini"
        },
        {
            label: "Nexitally",
            value:
                "https://cdn.jsdelivr.net/gh/SleepyHeeead/subconverter-config@master/remote-config/customized/nexitally.ini"
        },
        {
            label: "SoCloud",
            value:
                "https://cdn.jsdelivr.net/gh/SleepyHeeead/subconverter-config@master/remote-config/customized/socloud.ini"
        },
        {
            label: "ARK",
            value:
                "https://cdn.jsdelivr.net/gh/SleepyHeeead/subconverter-config@master/remote-config/customized/ark.ini"
        },
        {
            label: "ssrCloud",
            value:
                "https://cdn.jsdelivr.net/gh/SleepyHeeead/subconverter-config@master/remote-config/customized/ssrcloud.ini"
        },
        {
            label: "NeteaseUnblock(仅规则，No-Urltest)",
            value:
                "https://cdn.jsdelivr.net/gh/SleepyHeeead/subconverter-config@master/remote-config/special/netease.ini"
        },
        {
            label: "Basic(仅GEOIP CN + Final)",
            value:
                "https://cdn.jsdelivr.net/gh/SleepyHeeead/subconverter-config@master/remote-config/special/basic.ini"
        }
    ]
}