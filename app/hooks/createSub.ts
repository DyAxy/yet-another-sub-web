import { config as cfg } from '@/config'

const backends = process.env.NEXT_PUBLIC_BACKENDS?.split('|') ?? ["http://127.0.0.1:25500/sub?"]

export const createSub = (params: Params) => {
    const { url, target, backend, mode, config, include, exclude, tfo, udp, scv, append_type, emoji, list } = params;

    if (!url) throw Error('请在输入订阅链接后再试');
    if (!target) throw Error('请在选择客户端后再试');

    const flow = [
        backend || backends[0],
        `target=${cfg.clients[target as keyof typeof cfg.clients]}`,
        `&url=${encodeURIComponent(url.replace(/\n/g, '|'))}`,
        '&insert=false',
    ];

    if (params.mode === 'hard') {
        const configItem = cfg.remoteConfig.flatMap(category => category.items).find(item => item.label === config);
        const configValue = configItem ? configItem.value : config;

        if (config) flow.push(`&config=${encodeURIComponent(configValue)}`);
        if (include) flow.push(`&include=${encodeURIComponent(include)}`);
        if (exclude) flow.push(`&exclude=${encodeURIComponent(exclude)}`);
        if (tfo) flow.push('&tfo=true');
        if (udp) flow.push('&udp=true');
        if (scv) flow.push('&scv=true');
        if (append_type) flow.push('&append_type=true');
        if (emoji) flow.push('&emoji=true');
        if (list) flow.push('&list=true');
    }

    return flow.join('')
}