import * as React from "react";
import {
    AudioWaveform,
    Calculator,
    CircleDollarSign,
    Command,
    FileText,
    Frame,
    GalleryVerticalEnd,
    HeartHandshake,
    Map,
    PersonStanding,
    PieChart,
    UserPlus,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { Session } from "@supabase/supabase-js";

const data = {
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "People",
            url: "#",
            icon: PersonStanding,
            isActive: true,
        },
        {
            title: "Pay",
            url: "#",
            icon: CircleDollarSign,
        },
        {
            title: "Expenses",
            url: "#",
            icon: Calculator,
        },
        {
            title: "Benefits",
            url: "#",
            icon: HeartHandshake,
        },
        {
            title: "Documents",
            url: "/hello",
            icon: FileText,
        },
        {
            title: "Recruiting",
            url: "/hello",
            icon: UserPlus,
        },
    ],
};

export function AppSidebar({
    session,
    benefitsSelected,
    setBenefitsSelected,
}: {
    session: Session;
    benefitsSelected: boolean;
    setBenefitsSelected: (x: boolean) => void;
}) {
    const user = {
        name: "Demo Test!",
        email: session.user.email,
        avatar: "/avatars/shadcn.jpg",
    };

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain
                    benefitsSelected={benefitsSelected}
                    setBenefitsSelected={setBenefitsSelected}
                    items={data.navMain}
                />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
