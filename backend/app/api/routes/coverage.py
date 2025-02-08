from fastapi import APIRouter, Depends, HTTPException
from app.schemas.coverage import CoverageRequest, CoverageResponse
from app.services.coverage import CoverageService

router = APIRouter()

@router.post("/coverage-check", response_model=CoverageResponse)
async def check_coverage(request: CoverageRequest):
    """
    Check if a medication is covered under the specified insurance plan
    """
    try:
        coverage_service = CoverageService()
        result = await coverage_service.check_coverage(
            plan_info=request.plan_info,
            medication_name=request.medication_name
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 