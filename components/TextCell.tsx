import { Icon } from "@iconify/react/dist/iconify.js"
import { Button, Input } from "@nextui-org/react"
import copy from "copy-to-clipboard"
import { toast } from "sonner"

export const TextCell = ({
    label,
    value,
    placeholder,
}: {
    label: string,
    value: string,
    placeholder: string
}) => (
    <Input
        isReadOnly
        variant="bordered"
        label={label}
        value={value}
        placeholder={placeholder}
        endContent={
            < div className="w-9 h-9 justify-center items-center flex" >
                <Button
                    isIconOnly
                    isDisabled={value === ''}
                    variant="light"
                    onPress={() => {
                        copy(value)
                        toast.success(`${label}已复制到剪贴板`)
                    }}>
                    <Icon icon="solar:copy-line-duotone" />
                </Button>
            </div >
        }
    />)