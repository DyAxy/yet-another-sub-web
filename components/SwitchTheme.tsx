import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

export const SwitchTheme = () => {
    const { theme, systemTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false)

    const isLightMode = useMemo(() => {
        if (theme === 'system') {
            return systemTheme === 'light';
        }
        return theme === 'light';
    }, [theme, systemTheme]);
    useEffect(() => {
        if (!mounted && theme !== 'system' && systemTheme === theme) {
            setTheme('system');
        }
    }, [mounted, theme, systemTheme, setTheme]);

    const toggleTheme = () => {
        if (theme === 'system') {
            setTheme(systemTheme === 'light' ? 'dark' : 'light');
        } else {
            setTheme(isLightMode ? 'dark' : 'light');
        }
    };
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <Button
            isIconOnly
            size="sm"
            radius="full"
            variant="light"
            onPress={toggleTheme}
        >
            <Icon icon={isLightMode ? "solar:heart-linear" : "solar:heart-bold"} />
        </Button>
    )
}