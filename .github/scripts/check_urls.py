#!/usr/bin/env python3
import yaml
import requests
from datetime import datetime
import sys
import re

def is_valid_url(url):
    """Validate URL format"""
    pattern = re.compile(
        r'^https?://'  # http:// or https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?|'  # domain
        r'localhost|'  # localhost
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # or IP
        r'(?::\d+)?'  # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    return url and pattern.match(url) is not None

def check_url(url, timeout=10):
    """Check if URL is accessible and return status"""
    if not is_valid_url(url):
        return 'inactive'
    
    try:
        # Use GET instead of HEAD for better compatibility
        response = requests.get(
            url, 
            timeout=timeout, 
            allow_redirects=True,
            headers={'User-Agent': 'ARRRmada-URL-Checker/1.0'}
        )
        if response.status_code < 400:
            return 'active'
        else:
            return 'warning'
    except requests.exceptions.SSLError:
        return 'warning'  # SSL issues = warning, not inactive
    except requests.exceptions.Timeout:
        return 'warning'  # Timeout = warning, might be temporary
    except requests.exceptions.ConnectionError:
        return 'inactive'  # Can't connect = inactive
    except Exception as e:
        print(f"  Error: {str(e)}")
        return 'inactive'

def main():
    merchants_file = '_data/merchants.yml'
    
    # Load merchants with safe_load (prevents code execution)
    try:
        with open(merchants_file, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)
    except yaml.YAMLError as e:
        print(f"Error loading YAML: {e}")
        return 1
    
    # Handle both formats: list or dict with 'merchants' key
    if isinstance(data, list):
        merchants = data
    else:
        merchants = data.get('merchants', [])
    
    changes_made = False
    
    print(f"Checking {len(merchants)} merchant URLs...")
    
    for merchant in merchants:
        url = merchant.get('url', '')
        if not url:
            continue
        
        name = merchant.get('name', 'Unknown')
        print(f"Checking {name}: {url}")
        
        new_status = check_url(url)
        old_status = merchant.get('url_status', 'active')
        
        if new_status != old_status:
            print(f"  Status changed: {old_status} -> {new_status}")
            changes_made = True
        
        # Always update status and last checked date
        merchant['url_status'] = new_status
        merchant['url_last_checked'] = datetime.now().strftime('%Y-%m-%d')
    
    # Save back to file with safe_dump
    try:
        with open(merchants_file, 'w', encoding='utf-8') as f:
            yaml.safe_dump(
                data, 
                f, 
                default_flow_style=False, 
                allow_unicode=True, 
                sort_keys=False
            )
    except yaml.YAMLError as e:
        print(f"Error saving YAML: {e}")
        return 1
    
    if changes_made:
        print("\n✓ Changes detected and saved to merchants.yml")
    else:
        print("\n✓ No status changes detected")
    
    return 0

if __name__ == '__main__':
    sys.exit(main())
