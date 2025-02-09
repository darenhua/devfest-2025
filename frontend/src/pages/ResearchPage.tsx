import Dock from "@/components/dock";
import LlmOutput from "@/components/llm-output";
import { Loader2Icon, CircleCheck, CircleX } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface AgentTaskProps {
    loading: boolean;
    success: boolean;
    final?: boolean;
    title: string;
    body: {
        insurancePlan: string;
        drugNames: string[];
    };
}

function AgentTask({ task }: { task: AgentTaskProps }) {
    if (task.final) {
        return (
            <blockquote
                key={task.title}
                className="animate-fadeinup text-green-700 mt-6 border-l-2 pl-6 italic"
            >
                {task.title}
            </blockquote>
        );
    }
    return (
        <blockquote
            key={task.title}
            className="animate-fadeinup mt-6 border-l-2 pl-6 italic"
        >
            {task.title}{" "}
            {task.loading ? (
                <Loader2Icon className="animate-spin inline-block w-3 h-3 ml-3" />
            ) : task.success ? (
                <CircleCheck className="inline-block text-green-500 w-3 h-3 ml-3" />
            ) : (
                <CircleX className="inline-block text-red-500 w-3 h-3 ml-3" />
            )}
        </blockquote>
    );
}
async function fetchFormularyData() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
}

export default function ResearchPage({
    insurancePlan,
    drugNames,
}: {
    insurancePlan: string;
    drugNames: string[];
}) {
    const [agentTasks, setAgentTasks] = useState<AgentTaskProps[]>([]);
    const [finishedTasks, setFinishedTasks] = useState(false);
    const hasRunOnce = useRef(false);
    useEffect(() => {
        if (hasRunOnce.current) return;
        hasRunOnce.current = true;

        const body = {
            insurancePlan,
            drugNames,
        };
        main();
        async function main() {
            addAgentTask("Searching formulary for drug coverage...");
            await fetchFormularyData();
            succeedAgentTask();

            addAgentTask("Tidying up results...");
            await fetchFormularyData();
            failAgentTask();

            setAgentTasks((agentTasks) => [
                ...agentTasks,
                {
                    title: "Research Complete!",
                    final: true,
                    loading: true,
                    success: false,
                    body: body,
                },
            ]);

            await new Promise((resolve) => setTimeout(resolve, 1000));
            setFinishedTasks(true);
        }
        function addAgentTask(title: string) {
            setAgentTasks((agentTasks) => [
                ...agentTasks,
                { title, loading: true, success: false, body: body },
            ]);
        }

        function failAgentTask() {
            setAgentTasks((agentTasks) => {
                agentTasks[agentTasks.length - 1].loading = false;
                agentTasks[agentTasks.length - 1].success = false;
                return agentTasks;
            });
        }

        function succeedAgentTask() {
            setAgentTasks((agentTasks) => {
                agentTasks[agentTasks.length - 1].loading = false;
                agentTasks[agentTasks.length - 1].success = true;
                return agentTasks;
            });
        }
    }, [drugNames, insurancePlan]);

    return (
        // TODO PUT IT HERE, position absoluted. and hover
        // https://magicui.design/docs/components/iphone-15-pro
        <>
            <div className="min-h-screen p-16 flex">
                <div className="w-1/4">
                    <h3 className="scroll-m-20 mt-8 text-2xl font-normal tracking-tight">
                        Demystifying {insurancePlan}...
                    </h3>
                    {agentTasks.map((task, index) => (
                        <AgentTask task={task} key={index} />
                    ))}
                </div>
                <div className="max-w-[750px] mx-auto">
                    {finishedTasks && <LlmOutput />}
                </div>
            </div>
            <div className="w-full flex justify-center fixed bottom-6">
                <Dock />
            </div>
        </>
    );
}
