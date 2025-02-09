import { Undo2Icon, SaveIcon, PlusIcon } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "./magicui/dock";

export type IconProps = React.HTMLAttributes<SVGElement>;

const DATA = [
    { icon: Undo2Icon, label: "Go Back" },
    { icon: SaveIcon, label: "Save Research" },
    { icon: PlusIcon, label: "New Research" },
];

export default function AppDock() {
    return (
        <TooltipProvider>
            <Dock direction="middle">
                {DATA.map((item) => (
                    <DockIcon key={item.label}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-12 rounded-full"
                                >
                                    <item.icon className="size-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{item.label}</p>
                            </TooltipContent>
                        </Tooltip>
                    </DockIcon>
                ))}
            </Dock>
        </TooltipProvider>
    );
}
