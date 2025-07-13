import os
import re

# Define the file path and attachments directory
file_path = "/mnt/d/University Documents/Weyoung-learn.github.io/docs/courses/professional/computing/formal_language/index.md"
attachments_dir = "/mnt/d/University Documents/Weyoung-learn.github.io/docs/courses/professional/computing/formal_language/attachments"

# Read the content of the file
with open(file_path, "r", encoding="utf-8") as file:
    content = file.read()

# Define the regex pattern for wiki links
wiki_link_pattern = re.compile(r"!\[\[([^\]]+)\]\]")

# Replace wiki links with Markdown image format
def replace_wiki_links(match):
    link = match.group(1)
    # Extract the filename from the wiki link
    filename = os.path.basename(link.split("|")[0])
    # Construct the new Markdown image format
    return f"![Image](attachments/{filename})"

updated_content = wiki_link_pattern.sub(replace_wiki_links, content)

# Write the updated content back to the file
with open(file_path, "w", encoding="utf-8") as file:
    file.write(updated_content)

print("Wiki links have been updated to Markdown image format.")
