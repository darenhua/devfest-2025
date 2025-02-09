# Product Requirements Document

## 1. Overview

**Product Name:** Health Insurance Advisor  
**Primary Goal:** Provide users with quick information about whether their medications are covered under their insurance plan, along with any relevant cost or coverage details.

This project is a prototype built with:
- **Backend:** Node.js + Express
- **Frontend:** React

We aim for a functional Minimum Viable Product (MVP) at a hackathon scale, focusing on **speedy development** and **basic coverage lookup**.

---

## 2. Background / Motivation

Many people find it challenging to determine if a given medication is covered by their specific insurance plan—and if so, how much it will cost them. Often, they must:
1. Search confusing PDF formularies on their insurer's website.
2. Call the insurance company for coverage details.
3. Ask a pharmacist to run the prescription to see the cost.

**Pain Points**  
- **Complex Data:** Different plans, coverage tiers, and prior authorization rules.  
- **Time-Consuming:** Checking coverage often involves wait times or manual searching.  
- **Limited User Awareness:** Patients may not know about generics or alternatives.

We want to build an **AI-driven** tool that can ease these pain points by centralizing coverage data and returning quick, easy-to-read answers.

---

## 3. Project Scope

### In Scope
1. **Medication Coverage Check**  
   - Users can input their plan details and medication name.
   - System returns whether the medication is covered.

2. **Basic Cost Estimation (if available)**  
   - Provide a rough idea of copay/coinsurance or coverage tier.
   - Suggest cheaper alternatives or generics (if data permits).

3. **Data Input Sources**  
   - Hard-coded or semi-scraped formulary examples.
   - Minimal or no authentication for hackathon simplicity.
   - Local DB or JSON-based approach for storing plan data.

4. **AI Assistance**  
   - Potentially integrate an LLM or rules-based logic to interpret plan PDFs or web-scraped content.
   - Provide disclaimers and next-step guidance.

### Out of Scope (for now)
1. **Full Production Security & Authentication**  
   - No advanced OAuth or identity systems. (We'll store minimal user info, if any.)
2. **Comprehensive Coverage Across All Insurers**  
   - For the MVP, we'll focus on a small dataset or a single insurer as a proof-of-concept.
3. **Highly Accurate Real-Time Pricing**  
   - We can only approximate or rely on test data. Real-time claims processing is beyond scope.
4. **Regulatory Compliance**  
   - We'll implement basic security measures but won't fully comply with HIPAA/PHI regulations at this stage.

---

## 4. Functional Requirements

1. **User Plan & Medication Input**  
   - **Requirement:** User can provide insurance plan info and medication name via a React frontend.  
   - **Detail:** A form field for the plan (dropdown or text) and a medication text field.

2. **Coverage Determination**  
   - **Requirement:** The system should determine if the medication is covered.  
   - **Detail:** The backend will query a local database / file containing a simplified formulary or coverage data.

3. **Cost Estimation / Tiers**  
   - **Requirement (If data available):** Display coverage tier or approximate copay.  
   - **Detail:** Possibly use a simple mapping from a test dataset: e.g., Tier 1: \$10, Tier 2: \$25, Tier 3: \$50.

4. **Alternative Suggestions**  
   - **Requirement (Optional "Nice-to-have"):** Offer cheaper or generic alternatives.  
   - **Detail:** If the medication is brand name and a generic exists in the database, suggest it.

5. **AI Explanation / "Thinking"**  
   - **Requirement (Optional "Nice-to-have"):** Provide a short explanation of how coverage was determined (like a short AI-generated summary).  
   - **Detail:** Could be a small LLM prompt: "Summarize how coverage was found."

6. **Disclaimers / Next Steps**  
   - **Requirement:** Show disclaimers about accuracy, "Please verify with official insurer docs," and contact or pharmacy references if coverage is not definitive.  
   - **Detail:** This is essential for legal reasons and user trust.

---

## 5. Non-Functional Requirements

1. **Data Accuracy / Up-to-date**  
   - Must refresh coverage data frequently (even if manually) to reflect changes in plan documents.

2. **Security & Privacy**  
   - Though we're not storing extensive PHI, encrypt any plan or user ID info at rest if stored.  
   - Use HTTPS for data transfer.

3. **Low Latency**  
   - Aim for responses within **~2 seconds** on typical queries.  
   - Minimize blocking calls; consider caching or storing relevant plan data locally.

4. **Maintainability**  
   - Codebase should be easy to understand and extend, as we may add new insurers or coverage data sources later.

5. **Scalability (Future)**  
   - While the hackathon version can be lightweight, we should keep the code modular in case we expand to multiple insurers or larger datasets.

---

## 6. Technical Approach

### 6.1 Architecture

**Frontend (React)**  
- Presents a simple form to collect insurance plan data and medication name.  
- Displays coverage details and disclaimers.  
- Potentially uses a small library or custom components for UI.

**Backend (Node.js + Express)**  
- Endpoints for:
  - **POST** `/api/coverage-check` – receives `{planInfo, medicationName}`, returns coverage details.  
  - **GET** `/api/formulary` (optional) – returns available plan coverage data or static JSON for reference.

- **Data layer**:  
  - A mock or minimal database (e.g., an in-memory JSON or a lightweight store like SQLite) containing coverage data.  
  - Possibly a separate file for plan info if we're faking multiple insurers.

**(Optional) AI / LLM Integration**  
- If time allows:
  - Use an LLM endpoint (OpenAI or local) to interpret coverage documents or parse PDF text (or a simplified chunk of text).
  - Summarize coverage rules or disclaimers back to the user.

### 6.2 Data Sources

- **Local Coverage Data**: A small, hand-curated or scraped JSON listing:  
  ```json
  [
    {
      "planName": "Sample Plan A",
      "drugCoverage": [
        {"drug": "Codeine", "covered": true, "tier": 2, "copay": 15}
      ]
    }
  ]
```

## 7. Available Test Data

### Insurance Plans
The following insurance plans are available for testing the API:

1. **Anthem Gatekeeper X**
   - Plan ID: `anthem-gatekeeper-x`
   - Year: 2025
   - Type: HMO

2. **Healthfirst Bronze Leaf Premier**
   - Plan ID: `healthfirst-bronze-leaf-premier`
   - Year: 2025
   - Type: HMO
   - Network: NYSOH

3. **Oscar Bronze Classic**
   - Plan ID: `oscar-bronze-classic`
   - Year: 2025
   - Type: EPO

### API Parameters
When making requests to the coverage check endpoints, use these plan IDs:
```json
{
    "plan": "anthem-gatekeeper-x" | "healthfirst-bronze-leaf-premier" | "oscar-bronze-classic",
    "drug": "drug_name"
}
```

Example API call:
```
GET /api/v1/check-formulary?plan=healthfirst-bronze-leaf-premier&drug=Metformin
```