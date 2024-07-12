import { Input } from "@nextui-org/react";

export const InputCell = ({
    label,
    placeholder,
    value,
    onValueChange,
}: {
    label: string,
    placeholder: string,
    value: string,
    onValueChange: (value: string) => void,
}) => (
    <Input
        variant="bordered"
        label={label}
        value={value}
        onValueChange={onValueChange}
        placeholder={placeholder}
        classNames={{
            inputWrapper: 'data-[hover=true]:border-primary/50 group-data-[focus=true]:border-primary/75'
        }}
    />
)