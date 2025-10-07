from pathlib import Path
import subprocess
import sys
import requests
import re
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

if len(sys.argv) < 3:
    print("Usage: python lyra_interpreter.py <file.lyra> <API_KEY>")
    sys.exit(1)

file_path = sys.argv[1]
api_key = sys.argv[2]

API_BASE = "https://api.groq.com/openai/v1"

def gpt_translate_file(content: str) -> str:
    prompt = f"""
You are a Lyra interpreter.
Convert the following complete program written in Lyra into executable Python code, and the libraries that you import with 'import', which are external Python libraries, you must install them using the 'subprocess' library, and its corresponding command..
Return ONLY the Python code, without any explanations or extra text.

Lyra program:
{content}
"""
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    json_data = {
        "model": "gemma2-9b-it",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7,
        "top_p": 0.9,
        "max_tokens": 2000
    }

    response = requests.post(f"{API_BASE}/chat/completions", headers=headers, json=json_data)
    response.raise_for_status()
    answer = response.json()["choices"][0]["message"]["content"]
    answer = re.sub(r"```(?:python)?\n(.*?)```", r"\1", answer, flags=re.DOTALL)
    allowed_chars = (
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        "*/.,!\"§$%_()-`?@#~;:+&|^'=" " \n"
    )
    pattern = f"[^{re.escape(allowed_chars)}]"
    return re.sub(pattern, "", answer).strip()

def execute_python(code: str):
    context = {}
    try:
        exec(code, context)
    except Exception as e:
        print(f"⚠️ Error executing Python: {e}")

def run_lyra_file(file_path: str):
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")

    content = path.read_text(encoding="utf-8")
    print("🔄 Translating Lyra file...")
    translated_code = gpt_translate_file(content)

    print("🧠 Lyra → Python:\n")
    print(translated_code)

    output_file = Path("translated.py")
    output_file.write_text(translated_code, encoding="utf-8")
    print(f"\n💾 Translated code saved to: {output_file.absolute()}")

    print("\n🚀 Running translated.py...\n")
    subprocess.run([sys.executable, str(output_file)])

if __name__ == "__main__":
    run_lyra_file(file_path)
