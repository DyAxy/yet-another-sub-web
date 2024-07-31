import { cn, Switch } from "@nextui-org/react";

export const SwitchCell = ({
    title,
    isSelected,
    onValueChange
}: {
    title: string
    isSelected: boolean,
    onValueChange: (value: boolean) => void
}) => (
    <Switch
        color="success"
        classNames={{
            base: cn(
                "inline-flex flex-row-reverse max-w-full items-center",
                "justify-between cursor-pointer rounded-medium gap-2 p-4",
                "border-solid border-2 shadow-sm border-default-200 hover:border-default-400",
            ),
        }}
        isSelected={isSelected}
        onValueChange={onValueChange}
    >
        <div className="flex flex-col">
            <p className="text-sm">{title}</p>
        </div>
    </Switch>
)