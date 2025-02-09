from flask import Blueprint, request, jsonify
from gpt_researcher import GPTResearcher
from app.utils import find_drug_in_plan
import os

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
async def get_report():
    data = request.get_json()
    query = data.get("query")
    provider = data.get("provider")
    report = ""

    set_mydocs(provider)
    try:
        researcher = GPTResearcher(
            query,
            report_type="research_report",
            # report_type="outline_report",
            report_source="local",
        )
        research_result = await researcher.conduct_research()
        report = await researcher.write_report()
    except:
        pass
    reset_mydocs(provider)
    return {"report": report}

    # source_urls = researcher.get_source_urls()
    # research_costs = researcher.get_costs()
    # research_images = researcher.get_research_images()
    # research_sources = researcher.get_research_sources()

    return jsonify(
        {
            "report": report,
            # "source_urls": source_urls,
            # "research_costs": research_costs,
            # "num_images": len(research_images),
            # "num_sources": len(research_sources),
        }
    )

@api_bp.route("/check-coverage", methods=["POST"])
def check_coverage():
    data = request.get_json()
    plan_name = data.get("plan")
    drug_name = data.get("drug")
    
    if not plan_name or not drug_name:
        return jsonify({"error": "Missing plan or drug name"}), 400
        
    result = find_drug_in_plan(plan_name, drug_name)
    return jsonify(result)

@api_bp.route('/check-formulary', methods=['GET'])
def check_formulary():
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
