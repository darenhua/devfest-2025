"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({
    setBenefitsSelected,
    benefitsSelected,
    items,
}: {
    setBenefitsSelected: (x: boolean) => void;
    benefitsSelected: boolean;
    items: {
        title: string;
        url: string;
        icon?: LucideIcon;
        isActive?: boolean;
        items?: {
            title: string;
            url: string;
        }[];
    }[];
}) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <div
                        key={item.title}
                        onClick={() =>
                            setBenefitsSelected(item.title === "Benefits")
                        }
                    >
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                isActive={
                                    item.title === "Benefits" &&
                                    benefitsSelected
                                }
                                tooltip={item.title}
                            >
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </div>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
