#!/usr/bin/env python3
import yaml
from datetime import datetime

def prepare_merchants():
    merchants_file = '_data/merchants.yml'
    
    # Load merchants
    with open(merchants_file, 'r', encoding='utf-8') as f:
        data = yaml.safe_load(f)
    
    merchants = data.get('merchants', [])
    
    print(f"Preparing {len(merchants)} merchants with status fields...")
    
    for merchant in merchants:
        # Add url_status if not exists
        if 'url_status' not in merchant:
            merchant['url_status'] = 'active'
            print(f"Added url_status to {merchant['name']}")
        
        # Add url_last_checked if not exists
        if 'url_last_checked' not in merchant:
            merchant['url_last_checked'] = datetime.now().strftime('%Y-%m-%d')
            print(f"Added url_last_checked to {merchant['name']}")
    
    # Save back to file
    with open(merchants_file, 'w', encoding='utf-8') as f:
        yaml.dump(data, f, default_flow_style=False, allow_unicode=True, sort_keys=False)
    
    print("\n✓ merchants.yml prepared successfully!")

if __name__ == '__main__':
    prepare_merchants()
