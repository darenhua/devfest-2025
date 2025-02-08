import { FancyMultiSelect } from "./components/fancy-multiselect";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Microscope } from "lucide-react";

export default function App() {
    return (
        <div className="flex flex-col min-h-screen justify-center items-center gap-16">
            <div className="flex flex-col items-center gap-8">
                <h3 className="scroll-m-20 text-2xl font-normal tracking-tight">
                    Enter the name of your insurance plan and we'll{" "}
                    <span className="font-semibold">demystify</span> it.
                </h3>
                <Input />
            </div>
            <div className="flex flex-col items-center gap-8">
                <h3 className="scroll-m-20 text-2xl font-normal tracking-tight">
                    Optionally, enter prescription drugs you want to get
                    covered.
                </h3>
                <FancyMultiSelect />
            </div>
            <Button size="lg">
                <Microscope className="w-4 h-4 mr-2" />
                Research
            </Button>
        </div>
    );
}
