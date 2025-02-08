class CoverageService:
    def check_coverage(self, plan_info: str, medication_name: str) -> dict:
        """
        Check if a medication is covered under the specified insurance plan.
        For MVP, this will use a simple mock response.
        """
        # TODO: Implement actual coverage check logic
        # This is a mock response for demonstration
        return {
            'is_covered': True,
            'tier': 2,
            'copay': 25.00,
            'prior_authorization_required': False,
            'alternatives': ['generic_version'],
            'notes': 'Coverage information is subject to change'
        } 