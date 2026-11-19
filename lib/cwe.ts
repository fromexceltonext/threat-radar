// Short names for the weaknesses that show up most in KEV (source: cwe.mitre.org)
const CWE_NAMES: Record<string, string> = {
  "CWE-20": "Improper Input Validation",
  "CWE-22": "Path Traversal",
  "CWE-77": "Command Injection",
  "CWE-78": "OS Command Injection",
  "CWE-79": "Cross-site Scripting",
  "CWE-94": "Code Injection",
  "CWE-119": "Memory Buffer Error",
  "CWE-122": "Heap Buffer Overflow",
  "CWE-269": "Improper Privilege Management",
  "CWE-287": "Improper Authentication",
  "CWE-306": "Missing Authentication",
  "CWE-416": "Use After Free",
  "CWE-434": "Unrestricted File Upload",
  "CWE-502": "Unsafe Deserialization",
  "CWE-787": "Out-of-bounds Write",
  "CWE-843": "Type Confusion",
  "CWE-863": "Incorrect Authorization",
  "CWE-918": "Server-Side Request Forgery",
};

export const cweLabel = (id: string): string => (CWE_NAMES[id] ? `${id} · ${CWE_NAMES[id]}` : id);