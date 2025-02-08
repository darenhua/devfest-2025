from flask import Blueprint, request, jsonify
from gpt_researcher import GPTResearcher

api_bp = Blueprint("api", __name__)


@api_bp.route("/report", methods=["POST"])
async def get_report():
    data = request.get_json()
    query = data.get("query")

    researcher = GPTResearcher(
        query,
        report_type="research_report",
        report_source="local",
    )
    research_result = await researcher.conduct_research()
    report = await researcher.write_report()

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
