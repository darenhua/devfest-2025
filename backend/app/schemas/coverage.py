from pydantic import BaseModel
from typing import Optional, List

class CoverageRequest(BaseModel):
    plan_info: str
    medication_name: str

class CoverageResponse(BaseModel):
    is_covered: bool
    tier: Optional[int] = None
    copay: Optional[float] = None
    prior_authorization_required: bool = False
    alternatives: Optional[List[str]] = None
    notes: Optional[str] = None 