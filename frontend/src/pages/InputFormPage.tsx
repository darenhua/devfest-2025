import { useState } from "react";
import { FancyMultiSelect } from "../components/fancy-multiselect";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Loader2Icon, Microscope } from "lucide-react";

export default function InputFormPage({
    insurancePlan,
    setInsurancePlan,
    drugNames,
    setDrugNames,
    nextPage,
}: {
    insurancePlan: string;
    setInsurancePlan: React.Dispatch<React.SetStateAction<string>>;
    drugNames: string[];
    setDrugNames: React.Dispatch<React.SetStateAction<string[]>>;
    nextPage: () => void;
}) {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <div className="flex flex-col min-h-screen justify-center items-center gap-16 grid-background">
            <div className="flex flex-col items-center gap-8">
                <h3 className="scroll-m-20 text-2xl font-normal tracking-tight">
                    Enter the name of your insurance plan and we'll{" "}
                    <span className="font-semibold">demystify</span> it.
                </h3>
                <Input
                    placeholder="UnitedHealthcare Compass Bronze ST 3PCP"
                    onChange={(e) => setInsurancePlan(e.target.value)}
                    value={insurancePlan}
                />
            </div>
            <div className="flex flex-col items-center gap-8">
                <h3 className="scroll-m-20 text-2xl font-normal tracking-tight">
                    Optionally, enter prescription drugs you want to get
                    covered.
                </h3>
                <FancyMultiSelect
                    selected={drugNames}
                    setSelected={setDrugNames}
                />
            </div>
            <Button
                size="lg"
                onClick={async () => {
                    setIsLoading(true);
                    await new Promise((resolve) => setTimeout(resolve, 300));
                    setIsLoading(false);
                    nextPage();
                }}
                disabled={insurancePlan.length === 0 || isLoading}
            >
                <Microscope className="w-4 h-4 mr-2" />
                Research
                {isLoading && (
                    <Loader2Icon className="animate-spin w-4 h-4 ml-3" />
                )}
            </Button>
            <div className="fixed bottom-6 text-muted-foreground text-sm">
                Made by Kien, Daren, and Brian at DevFest '25
            </div>
        </div>
    );
}
