import base64
import hashlib
import os

# Generate a secure random code verifier
code_verifier = base64.urlsafe_b64encode(os.urandom(40)).rstrip(b'=').decode('utf-8')
print("Code Verifier:", code_verifier)

# Generate a code challenge using SHA256
code_challenge = base64.urlsafe_b64encode(hashlib.sha256(code_verifier.encode('utf-8')).digest()).rstrip(b'=').decode('utf-8')
print("Code Challenge:", code_challenge)
