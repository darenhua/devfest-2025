import { useState } from "react";
import InputFormPage from "./pages/InputFormPage";
import ResearchPage from "./pages/ResearchPage";

export default function App() {
    const [startResearching, setStartResearching] = useState(false);
    const [drugNames, setDrugNames] = useState<string[]>([]);
    const [insurancePlan, setInsurancePlan] = useState("");

    if (!startResearching) {
        return (
            <InputFormPage
                nextPage={() => setStartResearching(true)}
                insurancePlan={insurancePlan}
                setInsurancePlan={setInsurancePlan}
                drugNames={drugNames}
                setDrugNames={setDrugNames}
            />
        );
    }

    return <ResearchPage insurancePlan={insurancePlan} drugNames={drugNames} />;
}
