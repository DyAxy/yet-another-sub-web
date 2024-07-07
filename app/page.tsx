'use client'

import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Link,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import { Icon } from '@iconify/react/dist/iconify.js';

import { useTheme } from "next-themes";
import { toast, Toaster } from "sonner";
import { encode } from 'js-base64';
import copy from 'copy-to-clipboard';

import { config } from '../config'

import { SwitchCell } from "@/components/SwitchCell";
import { InputCell } from "@/components/InputCell";
import { AutocompleteCell } from "@/components/AutocompleteCell";
import { TextCell } from "@/components/TextCell";

export default function Home() {
  const { theme, systemTheme, setTheme } = useTheme();
  const isLightMode = useMemo(() => {
    if (theme === 'system') {
      return systemTheme === 'light';
    }
    return theme === 'light';
  }, [theme, systemTheme]);
  useEffect(() => {
    if (theme !== 'system' && systemTheme === theme) {
      setTheme('system');
    }
  }, [theme, systemTheme, setTheme]);
  const toggleTheme = () => {
    setTheme(isLightMode ? 'dark' : 'light');
  };

  const [params, setParams] = useState({
    mode: "easy",
    subLink: '',
    shortSubLink: '',
    shortSubLoading: false,

    backend: process.env.NEXT_PUBLIC_BACKENDS?.split('|')[0] as string,
    url: '',
    target: '',
    config: '',
    include: '',
    exclude: '',
    tfo: false,
    udp: false,
    scv: false,
    append_type: false,
    emoji: false,
    list: false
  })

  const tabs = [
    {
      id: 'easy',
      label: '简单模式',
      icon: 'solar:cat-linear',
    },
    {
      id: 'hard',
      label: '进阶模式',
      icon: 'solar:winrar-linear'
    },
  ]
  const createSub = () => {
    if (params.url === '') {
      return toast.error('请在输入订阅链接后再试')
    }
    if (params.target === '') {
      return toast.error('请在选择客户端后再试')
    }
    const flow = [params.backend]
    flow.push(`target=${config.clients[params.target as keyof typeof config.clients]}`)
    flow.push(`&url=${encodeURIComponent(params.url.replace(/\n/g, '|'))}`)
    flow.push('&insert=false')
    if (params.mode == 'hard') {
      if (params.config !== '') {
        const item = config.remoteConfig.find(item => item.label === params.config)
        if (item) flow.push(`&config=${encodeURIComponent(item?.value)}`)
      }
      if (params.include !== '') flow.push(`&include=${encodeURIComponent(params.include)}`)
      if (params.exclude !== '') flow.push(`&exclude=${encodeURIComponent(params.exclude)}`)
      if (params.tfo) flow.push(`&tfo=true`)
      if (params.udp) flow.push(`&udp=true`)
      if (params.scv) flow.push(`&scv=true`)
      if (params.append_type) flow.push(`&append_type=true`)
      if (params.emoji) flow.push(`&emoji=true`)
      if (params.list) flow.push(`&list=true`)
    }
    const subLink = flow.join('')
    copy(subLink)
    toast.success('定制订阅已复制到剪贴板')

    setParams(prevParams => ({ ...prevParams, subLink }))
  }
  const createShortSub = async () => {
    if (params.subLink === '') {
      return toast.error('请在生成订阅链接后再试')
    }
    setParams(prevParams => ({ ...prevParams, shortSubLoading: true }));
    try {
      const formData = new FormData();
      formData.append('longUrl', encode(params.subLink));

      const res = await fetch(`${process.env.NEXT_PUBLIC_SHORTURL}short`, {
        method: 'POST',
        body: formData,
      });

      if (res.status === 200) {
        const data = await res.json();
        if (data.Code !== 1) throw new Error(data.Message);
        copy(data.ShortUrl)
        toast.success('短链接已复制到剪贴板')
        setParams(prevParams => ({ ...prevParams, shortSubLink: data.ShortUrl }));
      }
    } catch (e) {
      toast.error((e as Error).message)
    } finally {
      setParams(prevParams => ({ ...prevParams, shortSubLoading: false }));
    }
  };
  const importClash = () => {
    if (params.subLink === '') {
      return toast.error('请在生成订阅链接后再试')
    }

    let url = params.subLink
    if (params.shortSubLink !== '') url = params.shortSubLink
    window.location.href = `clash://install-config?url=${encodeURIComponent(url)}`
  }

  return (
    <div className="w-full p-4 flex flex-col justify-center items-center gap-3">
      <Card className="w-full lg:w-1/2">
        <CardBody>
          <Tabs
            size="lg"
            fullWidth
            aria-label="Mode"
            items={tabs}
            selectedKey={params.mode}
            onSelectionChange={(key) => {
              setParams({ ...params, mode: key.toString() })
            }}
          >
            {(item) => (
              <Tab key={item.id} title={
                <div className="flex items-center space-x-2 font-bold">
                  <Icon icon={item.icon}></Icon>
                  <span>{item.label}</span>
                </div>
              }>
                <div className="flex flex-col gap-3">
                  {/* 订阅链接 */}
                  <Textarea
                    variant="bordered"
                    label="订阅链接"
                    placeholder="支持订阅或ss/ssr/vmess链接，多个链接每行一个或者用 | 分隔"
                    className="w-full"
                    minRows={1}
                    value={params.url}
                    onValueChange={(value) => {
                      setParams({ ...params, url: value });
                    }}
                  />
                  {/* 客户端 */}
                  <AutocompleteCell
                    label="客户端"
                    selectedKey={params.target}
                    onSelectionChange={(key) => {
                      setParams({ ...params, target: (key ?? '').toString() });
                    }}
                    defaultItems={Object.entries(config.clients)}
                    itemKey={0}
                    itemLabel={0}
                  />
                  {params.mode == 'hard' ? (<div className="flex flex-col gap-3">
                    <AutocompleteCell
                      label="后端地址"
                      selectedKey={params.backend}
                      onSelectionChange={(key) => {
                        if (key) {
                          setParams({ ...params, backend: key.toString() });
                        }
                      }}
                      defaultItems={process.env.NEXT_PUBLIC_BACKENDS?.split('|').map((value, index) => ({
                        key: index,
                        value: value
                      })) as any[]}
                      itemKey="value"
                      itemLabel="value"
                    />
                    <AutocompleteCell
                      label="远程配置"
                      selectedKey={params.config}
                      onSelectionChange={(key) => {
                        setParams({ ...params, config: (key ?? '').toString() });
                      }}
                      defaultItems={config.remoteConfig}
                      itemKey="label"
                      itemLabel="label"
                    />
                    <InputCell
                      label="包含节点"
                      value={params.include}
                      onValueChange={(value) => {
                        setParams({ ...params, include: value });
                      }}
                      placeholder="节点名包含的关键字，支持正则"
                    />
                    <InputCell
                      label="排除节点"
                      value={params.exclude}
                      onValueChange={(value) => {
                        setParams({ ...params, exclude: value });
                      }}
                      placeholder="节点名排除的关键字，支持正则"
                    />
                    <div className='flex flex-col lg:grid lg:grid-cols-2 gap-3'>
                      {config.switchCells.map((cell) => (
                        <SwitchCell
                          key={cell.key}
                          title={cell.title}
                          isSelected={params[cell.key as keyof typeof params] as boolean}
                          onValueChange={(value) => {
                            setParams({ ...params, [cell.key]: value });
                          }}
                        />
                      ))}
                    </div>
                  </div>) : null}
                </div>
              </Tab>
            )}
          </Tabs>
        </CardBody>
        <CardFooter className="flex flex-col gap-5 pt-4">
          <TextCell
            label="定制订阅"
            value={params.subLink}
            placeholder="请先输入订阅链接和选择客户端后，点击生成订阅链接"
          />
          <TextCell
            label="订阅短链"
            value={params.shortSubLink}
            placeholder="生成订阅链接后，点击生成短链"
          />
          <Textarea
            isReadOnly
            variant="bordered"
            label="测试环境"
            className="w-full"
            value={JSON.stringify(params)}
          />
          <div
            className="w-2/3 flex flex-col gap-3"
          >
            <Button
              color="primary"
              startContent={<Icon icon="solar:link-round-angle-linear" />}
              onPress={createSub}
            >生成订阅链接</Button>
            <Button
              isLoading={params.shortSubLoading}
              color="primary"
              startContent={<Icon icon="solar:link-minimalistic-2-linear" />}
              onPress={createShortSub}
            >生成短链接</Button>
            <Button
              color="default"
              startContent={<Icon icon="solar:cloud-download-linear" />}
              onPress={importClash}
            >导入至 Clash</Button>
          </div>
        </CardFooter>
      </Card>
      <p className="text-bold text-sm text-center">
        <Button
          isIconOnly
          size="sm"
          radius="full"
          variant="light"
          onPress={toggleTheme}
        >
          <Icon icon={isLightMode ? "solar:sun-2-linear" : "solar:moon-stars-linear"} />
        </Button>
        Made with ❤ by <Link isExternal
          href="https://github.com/DyAxy/yet-another-sub-web">DyAxy</Link>.
      </p>
      <Toaster richColors position="top-center" theme={theme as "light" | "dark" | "system" | undefined} />
    </div >
  );
}
