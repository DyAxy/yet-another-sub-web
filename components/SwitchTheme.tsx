import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useMemo } from "react";

export const SwitchTheme = () => {
    const { theme, systemTheme, setTheme } = useTheme();

    const isLightMode = useMemo(() => theme === 'system' ? systemTheme === 'light' : theme === 'light', [theme, systemTheme]);

    const toggleTheme = () => {
        if (theme === 'system') {
            setTheme(systemTheme === 'light' ? 'dark' : 'light');
        } else {
            setTheme(theme !== systemTheme ? 'system' : isLightMode ? 'dark' : 'light');
        }
    };
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