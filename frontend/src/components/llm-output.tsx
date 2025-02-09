import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { type LLMOutputComponent } from "@llm-ui/react";
import { markdownLookBack } from "@llm-ui/markdown";
import { useLLMOutput, useStreamExample } from "@llm-ui/react";

const example = `
# Comprehensive Report on Anthem Health Insurance Plan Features


## Introduction


Health insurance can be a complex topic, especially for newcomers. This report aims to break down the features of the Anthem health insurance plan in a beginner-friendly manner. We will focus on key aspects such as **prescription drug copays**, the **out-of-pocket maximum**, the **coinsurance rate**, and the **network type**. Additionally, we will compare these features to standard industry values to provide context and help you better understand the plan.


The information in this report is based on the documents provided, including "anthem-1.pdf" and "anthem-2.pdf." The goal is to provide an objective, detailed, and easy-to-understand explanation of the plan.


---


## 1. **Prescription Drug Copays**


### What Are Prescription Drug Copays?

A copay is a fixed amount you pay for a prescription drug. This amount is usually lower for generic drugs and higher for brand-name or specialty medications.


### Breakdown of Anthem's Prescription Drug Copays

The Anthem plan categorizes prescription drugs into tiers, with different copays for each:


- **Tier 2 (Preferred Brand & Non-Preferred Generic Drugs):**

  - $35 per prescription for retail (in-person pickup at a pharmacy).

  - $87.50 per prescription for home delivery.

  - Not covered for out-of-network providers ([Source: anthem-2.pdf](https://eoc.anthem.com/eocdps/9P6AIND01012024)).


- **Tier 3 (Non-Preferred Brand and Generic Drugs):**

  - $70 per prescription for retail.

  - $175 per prescription for home delivery.

  - Not covered for out-of-network providers ([Source: anthem-2.pdf](https://eoc.anthem.com/eocdps/9P6AIND01012024)).


### Comparison to Standard Values

- **Industry Standard Copays:** For Tier 2 drugs, copays typically range from $20–$50 for retail and $50–$100 for home delivery. Anthem's copays for Tier 2 drugs are within the standard range.

- **Tier 3 Comparison:** Anthem's Tier 3 copays ($70 retail, $175 home delivery) are slightly higher than average, as many plans charge $50–$100 for retail Tier 3 drugs.


---


## 2. **Out-of-Pocket Maximum**


### What Is the Out-of-Pocket Maximum?

The out-of-pocket maximum is the most you will pay in a year for covered services, including deductibles, copays, and coinsurance. Once you reach this limit, the insurance plan covers 100% of the costs for covered services.


### Anthem's Out-of-Pocket Maximum

- **Individual:** $9,450 per year.

- **Family:** $18,900 per year ([Source: anthem-2.pdf](https://eoc.anthem.com/eocdps/9P6AIND01012024)).


### What Is Not Included in the Out-of-Pocket Maximum?

- Premiums (the monthly cost of the plan).

- Balance-billing charges (when an out-of-network provider charges more than the plan pays).

- Services not covered by the plan ([Source: anthem-2.pdf](https://eoc.anthem.com/eocdps/9P6AIND01012024)).


### Comparison to Standard Values

- **Industry Standard:** The Affordable Care Act (ACA) sets a maximum limit for out-of-pocket costs, which was $9,100 for individuals and $18,200 for families in 2024. Anthem's out-of-pocket maximum is slightly above this threshold, making it higher than average.


---


## 3. **Coinsurance Rate**


### What Is Coinsurance?

Coinsurance is the percentage of costs you pay for a covered service after meeting your deductible. For example, if your coinsurance is 20%, you pay 20% of the service cost, and the insurance covers the remaining 80%.


### Anthem's Coinsurance Rate

- For **durable medical equipment**, the coinsurance is **50%** ([Source: anthem-2.pdf](https://eoc.anthem.com/eocdps/9P6AIND01012024)).

- Other services may have fixed copays instead of coinsurance.


### Comparison to Standard Values

- **Industry Standard:** Coinsurance rates typically range from 10%–30%. Anthem's 50% coinsurance for durable medical equipment is significantly higher than average, which could result in higher out-of-pocket costs for these items.


---


## 4. **Network Type**


### What Is a Network?

A network is a group of doctors, hospitals, and other healthcare providers that have agreed to provide services at discounted rates for plan members. Using in-network providers will save you money, while out-of-network providers usually cost more.


### Anthem's Network Type

The Anthem plan uses an **HMO (Health Maintenance Organization)** network. Here’s what that means:

- **In-Network Providers:** You must use doctors and hospitals within the plan’s network to get coverage. Anthem provides a directory of in-network providers ([Source: anthem-2.pdf](https://eoc.anthem.com/eocdps/9P6AIND01012024)).

- **Out-of-Network Providers:** Services from out-of-network providers are generally **not covered**, except in emergencies.

- **Referrals Required:** You need a referral from your primary care doctor to see a specialist ([Source: anthem-2.pdf](https://eoc.anthem.com/eocdps/9P6AIND01012024)).


### Comparison to Standard Values

- **HMO vs. PPO:** HMO plans like Anthem's are more restrictive than PPO (Preferred Provider Organization) plans, which allow you to see out-of-network providers at a higher cost. However, HMO plans often have lower premiums.

- **Industry Standard:** HMO plans are common and typically offer lower costs for in-network care. Anthem's requirement for referrals is standard for HMO plans.


---


## 5. **Premium Prices**


### What Are Premiums?

Premiums are the monthly payments you make to maintain your health insurance coverage. The Anthem plan does not specify premium prices in the provided documents, but premiums vary based on factors like age, location, and coverage level.


### Industry Standard Premiums

- **Bronze Plans:** Average $329/month for individuals and $1,041/month for families in 2024 ([Source: Kaiser Family Foundation](https://www.kff.org)).

- Anthem's plan is a **Bronze HMO**, so its premiums are likely in this range.


---


## 6. **Additional Features**


### Preventive Care

The plan covers preventive services, such as vaccinations and screenings, at no cost to you, even before meeting your deductible ([Source: anthem-2.pdf](https://eoc.anthem.com/eocdps/9P6AIND01012024)).


### Excluded Services

Certain services are not covered by the plan, including:

- Acupuncture.

- Long-term care ([Source: anthem-2.pdf](https://eoc.anthem.com/eocdps/9P6AIND01012024)).


---


## Conclusion


The Anthem health insurance plan offers comprehensive coverage with some notable features:


1. **Prescription Drug Copays:** Copays for Tier 2 drugs are reasonable, but Tier 3 copays are higher than average.

2. **Out-of-Pocket Maximum:** The maximum is slightly above the ACA threshold, which could result in higher costs for individuals and families.

3. **Coinsurance Rate:** The 50% coinsurance for durable medical equipment is higher than standard rates, which may lead to significant expenses.

4. **Network Type:** The HMO network provides cost savings for in-network care but limits flexibility with out-of-network providers.


### Pros:

- Preventive care is fully covered.

- Reasonable copays for Tier 2 drugs.

- Lower premiums typical of HMO plans.


### Cons:

- High out-of-pocket maximum.

- Limited flexibility due to the HMO network.

- High coinsurance for durable medical equipment.


For individuals or families looking for a cost-effective plan and willing to stay within a network, this Anthem plan could be a good option. However, those who need frequent out-of-network care or durable medical equipment may face higher costs.


---


## References


1. Anthem-1.pdf  

2. Anthem-2.pdf  

3. Kaiser Family Foundation. (2024). Average Premiums for Bronze Plans. Retrieved from https://www.kff.org  

`;

export default function LlmOutput() {
    const { isStreamFinished, output } = useStreamExample(example, {
        delayMultiplier: 0.001,
    });

    const { blockMatches } = useLLMOutput({
        llmOutput: output,
        fallbackBlock: {
            component: MarkdownComponent, // from Step 1
            lookBack: markdownLookBack(),
        },
        isStreamFinished,
    });

    return (
        <div>
            {/* Template string part */}
            {blockMatches.map((blockMatch, index) => {
                const Component = blockMatch.block.component;
                return <Component key={index} blockMatch={blockMatch} />;
            })}
            {/* Ai generated report part */}
        </div>
    );
}

// Customize this component with your own styling
const MarkdownComponent: LLMOutputComponent = ({ blockMatch }) => {
    const markdown = blockMatch.output;
    return (
        <ReactMarkdown className="markdown" remarkPlugins={[remarkGfm]}>
            {markdown}
        </ReactMarkdown>
    );
};
