from flask import Blueprint, request, jsonify
from app.services.research import ResearchService

api_bp = Blueprint('api', __name__)
research_service = ResearchService()

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