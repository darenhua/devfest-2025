import Dock from "@/components/dock";
import LlmOutput from "@/components/llm-output";
import { Loader2Icon, CircleCheck, CircleX } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import axios from 'axios';

interface AgentTaskProps {
    loading: boolean;
    success: boolean;
    final?: boolean;
    title: string;
    body: {
        insurancePlan: string;
        drugNames: string[];
        results?: any[];
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

async function fetchFormularyData(insurancePlan: string, drugNames: string[]) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const results = [];
            
    
    for (const drug of drugNames) {
        try {
            const response = await axios.get(`${apiUrl}/check-formulary`, {
                params: {
                    plan: insurancePlan,
                    drug: drug
                }
            });
            results.push({
                drug,
                ...response.data
            });
        } catch (error) {
            console.error(`Error checking formulary for ${drug}:`, error);
            results.push({
                drug,
                error: 'Failed to check coverage'
            });
        }
    }
    
    return results;
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
            try {
                const results = await fetchFormularyData(insurancePlan, drugNames);
                console.log("RESULTS", results);
                const hasErrors = results.some(r => r.error);
                if (hasErrors) {
                    failAgentTask();
                } else {
                    succeedAgentTask();
                }
                
                addAgentTask("Tidying up results...");
                await new Promise((resolve) => setTimeout(resolve, 1000));
                succeedAgentTask();

                setAgentTasks((agentTasks) => [
                    ...agentTasks,
                    {
                        title: "Research Complete!",
                        final: true,
                        loading: false,
                        success: true,
                        body: {
                            insurancePlan,
                            drugNames,
                            results
                        },
                    },
                ]);

                await new Promise((resolve) => setTimeout(resolve, 1000));
                setFinishedTasks(true);
            } catch (error) {
                console.error('Error in main:', error);
                failAgentTask();
            }
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
