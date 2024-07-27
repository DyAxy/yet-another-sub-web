import { encode } from 'js-base64';

export const createShortSub = async (subLink: string) => {
    if (!subLink) throw Error('请在生成订阅链接后再试');

    const formData = new FormData();
    formData.append('longUrl', encode(subLink));

    const res = await fetch(`${process.env.NEXT_PUBLIC_SHORTURL}short`,{
        method: 'POST',
        body: formData,
    });

    if (res.status === 200) {
        const data = await res.json();
        if (data.Code !== 1) throw new Error(data.Message);
        return data.ShortUrl
    }
}