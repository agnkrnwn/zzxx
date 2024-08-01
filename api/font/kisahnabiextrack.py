import requests
from bs4 import BeautifulSoup
import json
import os

# Create a folder for the JSON files if it doesn't exist
folder_path = 'nabi'
if not os.path.exists(folder_path):
    os.makedirs(folder_path)

# Read URLs from nabi.txt
file_path = 'nabi.txt'
with open(file_path, 'r') as file:
    urls = file.read().splitlines()

# Function to fetch and extract the story content
def fetch_and_extract_story(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Extract the story content
    article_body = soup.find('div', itemprop='articleBody')
    if article_body:
        paragraphs = article_body.find_all('p')
        story = "\n\n".join(p.get_text(separator="\n", strip=True) for p in paragraphs if p.get_text(strip=True))
    else:
        story = "Content not found"
    
    # Extract the name of the prophet from the title
    title = soup.find('h1', class_='post-title').get_text()
    prophet_name = title.split('Nabi')[1].strip().replace('Lengkap', '').replace('Kisah', '').strip()
    
    return prophet_name, story

# Loop through URLs, fetch and save content to JSON files
for url in urls:
    prophet_name, story = fetch_and_extract_story(url)
    
    # Prepare JSON data
    data = {
        "name": prophet_name,
        "story": story,
        "url": url
    }
    
    # Save to JSON file
    json_filename = os.path.join(folder_path, f"{prophet_name.replace(' ', '_').lower()}.json")
    with open(json_filename, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, ensure_ascii=False, indent=4)

print("JSON files have been created successfully.")
