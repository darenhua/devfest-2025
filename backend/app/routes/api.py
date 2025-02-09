from flask import Blueprint, request, jsonify
from gpt_researcher import GPTResearcher
from app.utils import find_drug_in_plan
import os
import asyncio

api_bp = Blueprint("api", __name__)


def set_mydocs(provider):
    cwd = os.getcwd()
    src_folder = f"{cwd}/all-plan-data/{provider}"
    dst_folder = f"{cwd}/my-docs"

    for f in os.listdir(src_folder):
        src_path = f"{src_folder}/{f}"
        dst_path = f"{dst_folder}/{f}"
        os.rename(src_path, dst_path)


def reset_mydocs(provider):
    cwd = os.getcwd()
    src_folder = f"{cwd}/my-docs"
    dst_folder = f"{cwd}/all-plan-data/{provider}"

    for f in os.listdir(src_folder):
        src_path = f"{src_folder}/{f}"
        dst_path = f"{dst_folder}/{f}"
        os.rename(src_path, dst_path)


@api_bp.route("/report", methods=["POST"])
def get_report():
    try:
        print("Starting report generation...")
        data = request.get_json()
        print("Received data:", data)
        
        provider = data.get("provider")
        drug_results = data.get("drug_results", [])
        
        if not provider or not drug_results:
            return jsonify({"error": "Missing provider or drug_results"}), 400
            
        # Construct a research query based on the drug coverage data
        drug_info = []
        for result in drug_results:
            if result.get('found'):
                for match in result.get('matches', []):
                    drug_info.append(
                        f"{result['drug']}: Tier {match.get('tier', 'Unknown')}, "
                        f"Dosage: {match.get('dosage', 'Not specified')}, "
                        f"Notes: {match.get('notes', 'No additional notes')}"
                    )

        # Create a comprehensive query for the GPT Researcher
        research_query = f"""
        Analyze the following drug coverage information for {provider} insurance plan:

        {' '.join(drug_info)}

        Please provide:
        1. A summary of drug coverage and tier classifications
        2. Cost implications based on tier levels
        3. Any notable restrictions or requirements
        4. Recommendations for cost savings
        5. Key takeaways for the patient
        """

        set_mydocs(provider)
        researcher = GPTResearcher(
            research_query,
            report_type="research_report",
            report_source="local",
        )
        print("Starting research...")
        research_result = asyncio.run(researcher.conduct_research())
        print("Research completed, writing report...")
        report = asyncio.run(researcher.write_report())
        print("Report generated successfully")
    except Exception as e:
        print("Fatal error in get_report:", str(e))
        return jsonify({"error": str(e)}), 500
    finally:
        reset_mydocs(provider)

    return jsonify({"report": report})


@api_bp.route("/check-coverage", methods=["POST"])
def check_coverage():
    data = request.get_json()
    plan_name = data.get("plan")
    drug_name = data.get("drug")
    
    if not plan_name or not drug_name:
        return jsonify({"error": "Missing plan or drug name"}), 400
        
    result = find_drug_in_plan(plan_name, drug_name)
    return jsonify(result)

@api_bp.route('/check-formulary', methods=['GET', 'OPTIONS'])
def check_formulary():
    if request.method == 'OPTIONS':
        return jsonify({'success': True}), 200
    # Get parameters from query string
    plan_name = request.args.get('plan')
    drug_name = request.args.get('drug')
    
    # Validate required parameters
    if not plan_name or not drug_name:
        return jsonify({
            'success': False,
            'error': 'Missing required parameters. Please provide both plan and drug.'
        }), 400
    
    try:
        # Use the utility function to search for the drug
        result = find_drug_in_plan(plan_name, drug_name)
        return jsonify(result)
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Error checking formulary: {str(e)}'
        }), 500
    # return jsonify(
    #     {
    #         "report": report,
    #         # "source_urls": source_urls,
    #         # "research_costs": research_costs,
    #         # "num_images": len(research_images),
    #         # "num_sources": len(research_sources),
    #     }
    # )
