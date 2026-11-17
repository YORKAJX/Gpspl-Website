import json, re, glob

def validate_schema(data, source):
    issues = []
    if not isinstance(data, dict):
        return [f"Root is not dict: {type(data)}"]
    
    context = data.get('@context', '')
    if 'schema.org' not in context:
        issues.append(f"Missing or invalid @context: {context}")
        
    stype = data.get('@type')
    if not stype and '@graph' not in data:
        issues.append("Missing @type and @graph")
        
    if '@graph' in data:
        for item in data['@graph']:
            sub_issues = validate_single_entity(item, source)
            issues.extend(sub_issues)
    else:
        issues.extend(validate_single_entity(data, source))
    return issues

def validate_single_entity(item, source):
    issues = []
    t = item.get('@type')
    if not t:
        return [f"Item in {source} missing @type"]
    
    if t == 'FAQPage':
        entities = item.get('mainEntity', [])
        if not entities:
            issues.append(f"FAQPage in {source} has empty mainEntity")
        for q in entities:
            if q.get('@type') != 'Question' or not q.get('name'):
                issues.append(f"FAQPage Question missing name in {source}")
            ans = q.get('acceptedAnswer', {})
            if ans.get('@type') != 'Answer' or not ans.get('text'):
                issues.append(f"FAQPage Answer missing text in {source}")
                
    elif t == 'Product':
        if not item.get('name'):
            issues.append(f"Product missing 'name' in {source}")
        if not item.get('description'):
            issues.append(f"Product missing 'description' in {source}")
        # Note: offers and image are recommended by Google for Product rich results
        if not item.get('offers'):
            issues.append(f"Product '{item.get('name')}' missing 'offers' (recommended for Google merchant/product snippets)")
            
    elif t in ['LocalBusiness', 'AVIntegrator']:
        if not item.get('name'):
            issues.append(f"LocalBusiness missing 'name' in {source}")
        if not item.get('address'):
            issues.append(f"LocalBusiness missing 'address' in {source}")
        if not item.get('telephone'):
            issues.append(f"LocalBusiness missing 'telephone' in {source}")
            
    elif t == 'Service':
        if not item.get('name'):
            issues.append(f"Service missing 'name' in {source}")
        if not item.get('provider'):
            issues.append(f"Service missing 'provider' in {source}")
            
    return issues

test_files = [
    'index.html',
    'conference-room-solutions.html',
    'interactive-display-solutions.html',
    'active-led-wall-solutions.html',
    'digital-signage-solutions.html',
    'auditorium-av-solutions.html',
    'professional-audio-solutions.html',
    'amc-maintenance-services.html',
    'av-system-integrator-delhi-ncr.html',
    'av-system-integrator-gurgaon.html',
    'av-system-integrator-noida.html',
    'active-led-wall-supplier-noida.html',
    'samsung-business-tv-befx-h2.html',
    'samsung-commercial-display-qbc.html',
    'samsung-commercial-display-qmc.html',
    'lg-createboard-tr3er.html',
    'lg-commercial-tv-nu88c.html',
    'lg-commercial-tv-ua831c.html'
]

all_issues = {}
for f in test_files:
    try:
        content = open(f, 'r', encoding='utf-8').read()
        schemas = re.findall(r'<script\s+type=[\"\']application/ld\+json[\"\']>(.*?)</script>', content, re.DOTALL)
        file_issues = []
        for i, s in enumerate(schemas):
            try:
                parsed = json.loads(s.strip())
                iss = validate_schema(parsed, f"{f}#schema{i+1}")
                file_issues.extend(iss)
            except Exception as e:
                file_issues.append(f"Syntax error in schema {i+1}: {e}")
        all_issues[f] = file_issues
    except Exception as e:
        all_issues[f] = [f"File read error: {e}"]

with open('data/schema_validation_report.json', 'w', encoding='utf-8') as fp:
    json.dump(all_issues, fp, indent=2)

print("Schema validation complete. Summary:")
for f, iss in all_issues.items():
    print(f"{f}: {len(iss)} issues/warnings")
    for isstxt in iss[:3]:
        print(f"   -> {isstxt}")
