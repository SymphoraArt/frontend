import re

log_path = "/Users/srthck/.gemini/antigravity/brain/aee7e63e-8bd6-46ea-b0ce-c66a8b4ad869/.system_generated/logs/overview.txt"
with open(log_path, 'r') as f:
    content = f.read()

blocks = content.split("File Path: `file:///Users/srthck/Desktop/frontend/app/editor/algency-editor.css`")

if len(blocks) > 1:
    print(blocks[1][:1000])
