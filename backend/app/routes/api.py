from flask import Blueprint, request, jsonify
from app.services.coverage import CoverageService
from app.services.research import ResearchService

api_bp = Blueprint('api', __name__)
coverage_service = CoverageService()
research_service = ResearchService()

@api_bp.route('/coverage-check', methods=['POST'])
def check_coverage():
    data = request.get_json()
    
    if not data or 'plan_info' not in data or 'medication_name' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
        
    try:
        result = coverage_service.check_coverage(
            plan_info=data['plan_info'],
            medication_name=data['medication_name']
        )
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api_bp.route('/research', methods=['POST'])
def conduct_research():
    data = request.get_json()
    
    if not data or 'query' not in data:
        return jsonify({'error': 'Missing query field'}), 400
        
    try:
        result = research_service.conduct_research(data['query'])
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500 