import os

def check_file_encoding(file_path):
    """Check if the file at file_path is UTF-8 encoded."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            f.read()
        return True
    except UnicodeDecodeError:
        return False

def main(directory):
    """Iterate through all files in directory and print out those not in UTF-8 encoding."""
    for root, _, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            if not check_file_encoding(file_path):
                print(f"Non-UTF-8 encoded file found: {file_path}")

if __name__ == "__main__":
    directory_to_check = '.'  # Current directory
    main(directory_to_check)
