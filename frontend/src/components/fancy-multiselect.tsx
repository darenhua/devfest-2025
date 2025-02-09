"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

export type Framework = Record<"value" | "label", string>;

async function fetchDrugNames(fileUrl: string) {
    // 1) Fetch the CSV file
    const response = await fetch(fileUrl);
    const text = await response.text();

    // 2) Split the CSV into rows (by newline)
    const rows = text.trim().split("\n");

    return rows;
}

export function FancyMultiSelect({
    selected,
    setSelected,
}: {
    selected: string[];
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}) {
    const [drugNames, setDrugNames] = React.useState<string[]>([]);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");

    React.useEffect(() => {
        (async () => {
            const fileUrl = "/drug-names.txt";
            const columnData = await fetchDrugNames(fileUrl);
            setDrugNames(columnData);
        })();
    }, []);

    const handleUnselect = React.useCallback((framework: string) => {
        setSelected((prev) => prev.filter((s) => s !== framework));
    }, []);

    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current;
            if (input) {
                if (e.key === "Delete" || e.key === "Backspace") {
                    if (input.value === "") {
                        setSelected((prev) => {
                            const newSelected = [...prev];
                            newSelected.pop();
                            return newSelected;
                        });
                    }
                }
                // This is not a default behaviour of the <input /> field
                if (e.key === "Escape") {
                    input.blur();
                }
            }
        },
        []
    );

    const selectables = drugNames
        .slice(0, 50)
        .filter((framework) => !selected.includes(framework));

    return (
        <Command
            onKeyDown={handleKeyDown}
            className="overflow-visible bg-transparent"
        >
            <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <div className="flex flex-wrap gap-1">
                    {selected.map((framework) => {
                        return (
                            <Badge key={framework} variant="secondary">
                                {framework}
                                <button
                                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleUnselect(framework);
                                        }
                                    }}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onClick={() => handleUnselect(framework)}
                                >
                                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                </button>
                            </Badge>
                        );
                    })}
                    {/* Avoid having the "Search" Icon */}
                    <CommandPrimitive.Input
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={setInputValue}
                        onBlur={() => setOpen(false)}
                        onFocus={() => setOpen(true)}
                        placeholder="Select prescription drugs..."
                        className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                    />
                </div>
            </div>
            <div className="relative mt-2">
                <CommandList>
                    {open && selectables.length > 0 ? (
                        <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                            <CommandGroup className="h-full overflow-auto">
                                {selectables.map((framework) => {
                                    return (
                                        <CommandItem
                                            key={framework}
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                            onSelect={(value) => {
                                                setInputValue("");
                                                setSelected((prev) => [
                                                    ...prev,
                                                    framework,
                                                ]);
                                            }}
                                            className={"cursor-pointer"}
                                        >
                                            {framework}
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </div>
                    ) : null}
                </CommandList>
            </div>
        </Command>
    );
}
