from gpt_researcher import GPTResearcher

class ResearchService:
    def conduct_research(self, query: str) -> dict:
        """
        Conduct research using GPT Researcher
        """
        researcher = GPTResearcher(
            query=query,
            report_type="research_report",
            report_source="web"
        )
        
        research_result = researcher.conduct_research()
        report = researcher.write_report()
        
        return {
            'research_result': research_result,
            'report': report
        } 