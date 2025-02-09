import os
import json
import re
from pathlib import Path

def clean_text(text: str) -> str:
    """
    Clean text by removing special characters and normalizing whitespace.
    
    Args:
        text (str): Text to clean
    
    Returns:
        str: Cleaned text
    """
    # Remove special characters but keep basic punctuation
    cleaned = re.sub(r'[^a-zA-Z0-9\s.,()-]', '', text)
    # Remove multiple spaces
    cleaned = re.sub(r'\s+', ' ', cleaned)
    # Remove <br> tags
    cleaned = cleaned.replace('<br>', ' ')
    # Strip leading/trailing whitespace
    cleaned = cleaned.strip()
    return cleaned

def find_drug_in_plan(plan_name: str, drug_name: str) -> dict:
    """
    Search for all instances of a drug in a specific plan's formulary.
    
    Args:
        plan_name (str): Name of the insurance plan
        drug_name (str): Name of the drug to search for
    
    Returns:
        dict: {
            'found': bool,
            'matches': list of {
                'tier': int,
                'notes': str,
                'dosage': str (if available)
            },
            'plan_details': str,
            'error': str (if any)
        }
    """
    current_file = Path(__file__)
    project_root = current_file.parent.parent.parent
    base_path = project_root / 'all-plan-data'
    plan_path = base_path / plan_name
    
    if not plan_path.exists():
        return {
            'found': False,
            'matches': [],
            'error': f'Plan {plan_name} not found'
        }
    
    matches = []
    plan_details = None
    
    for formulary_dir in plan_path.iterdir():
        if formulary_dir.is_dir():
            # Look for any .md file in the directory
            md_files = list(formulary_dir.glob('*.md'))
            if md_files:  # If any .md files found
                formulary_file = md_files[0]  # Take the first .md file
                plan_details = formulary_dir.name
                
                if formulary_file.exists():
                    with open(formulary_file, 'r', encoding='utf-8') as f:
                        content = f.read().lower()
                        # Replace <br> with spaces and normalize table structure
                        content = content.replace('<br>', ' ').replace('|', ' | ')
                        drug_name_lower = drug_name.lower()
                        
                        if drug_name_lower in content:
                            lines = content.split('\n')
                            for i, line in enumerate(lines):
                                if drug_name_lower in line:
                                    # Get context (5 lines before and after)
                                    start_idx = max(0, i - 5)
                                    end_idx = min(len(lines), i + 6)
                                    context = '\n'.join(lines[start_idx:end_idx])
                                    
                                    # Extract tier information
                                    tier = None
                                    # Look for tier in the context, not just the line
                                    context_lower = context.lower()
                                    if 'tier 1' in context_lower or 'tier: 1' in context_lower:
                                        tier = 1
                                    elif 'tier 2' in context_lower or 'tier: 2' in context_lower:
                                        tier = 2
                                    elif 'tier 3' in context_lower or 'tier: 3' in context_lower:
                                        tier = 3
                                    
                                    # Try to extract dosage information using regex
                                    dosage_match = re.search(r'\d+\s*(?:mg|mcg|ml|g)', line, re.IGNORECASE)
                                    dosage = dosage_match.group(0) if dosage_match else None
                                    
                                    matches.append({
                                        'tier': tier,
                                        'notes': clean_text(line.strip()),
                                        'dosage': dosage,
                                        'context': clean_text(context)  # Also include the context in the response
                                    })
    
    return {
        'found': len(matches) > 0,
        'matches': matches,
        'plan_details': plan_details,
        'total_matches': len(matches)
    }

