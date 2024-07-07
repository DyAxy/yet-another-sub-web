import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Key } from "react";

export const AutocompleteCell = ({
    label,
    selectedKey,
    onSelectionChange,
    defaultItems,
    itemKey,
    itemLabel,
}: {
    label: string,
    selectedKey: string,
    onSelectionChange: (key: Key | null) => void,
    defaultItems: any[],
    itemKey: string | number,
    itemLabel: string | number,
}) => (
    <Autocomplete
        variant="bordered"
        label={label}
        className="w-full"
        selectedKey={selectedKey}
        onSelectionChange={onSelectionChange}
        defaultItems={defaultItems}
    >
        {(item => (
            <AutocompleteItem key={item[itemKey]}>
                {item[itemLabel]}
            </AutocompleteItem>
        ))}
    </Autocomplete>
)