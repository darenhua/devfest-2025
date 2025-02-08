from fastapi import APIRouter, Depends, HTTPException
from app.services.research import ResearchService
from typing import Dict

router = APIRouter()

@router.post("/research")
async def conduct_research(query: Dict[str, str]):
    """
    Conduct research using GPT Researcher
    """
    try:
        research_service = ResearchService()
        result = await research_service.conduct_research(query["query"])
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 