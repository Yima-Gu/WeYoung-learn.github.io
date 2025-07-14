import re

# Define the file path
file_path = "/mnt/d/University Documents/Weyoung-learn.github.io/docs/courses/professional/computing/formal_language/index.md"

# Read the content of the file
with open(file_path, "r", encoding="utf-8") as file:
    content = file.read()

# Define the regex pattern for matching mathematical text
math_pattern = re.compile(r"(\b[a-zA-Z]+\b|\d+|\S+)")

# Replace mathematical text with standard Markdown syntax
def standardize_math(match):
    text = match.group(1)
    return f"${text}$"

updated_content = math_pattern.sub(standardize_math, content)

# Write the updated content back to the file
with open(file_path, "w", encoding="utf-8") as file:
    file.write(updated_content)

print("Mathematical text has been standardized.")
