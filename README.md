# Lyra Language Extension for VS Code

**Version:** 0.5.2

**Publisher:** VIGARPAST777

**GitHub:** [VIGARPAST_777-2](https://github.com/VIGARPAST-777-2)

**Marketplace URL:** [Lyra Language on VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=VIGARPAST777.lyra-language)

---

## Overview

The **Lyra Language Extension** allows you to execute `.lyra` files directly in Visual Studio Code using the integrated Lyra interpreter. Lyra is a human-readable programming language that explains code as it writes it.

> ⚠️ **Note:** As of now, the "Run and Debug" feature does **not** work. Use the command palette to run your Lyra files.

---

## Installation

1. Install from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=VIGARPAST777.lyra-language)
2. Alternatively, download the `.vsix` file and install it manually in VS Code:

   * Open VS Code → Extensions → `...` menu → "Install from VSIX..."

---

## Usage

1. Create or open a `.lyra` file (you can also use `.lyra.txt`).
2. Configure your **GROQ API key**:

   * Open Command Palette (`Ctrl + Shift + P`) → search for **Preferences: Open Settings (UI)** → search `lyra.apiKey` → enter your API key from [GROQ Console](https://console.groq.com/home).
3. Run your Lyra file:

   * Open Command Palette (`Ctrl + Shift + P`) → type **Run Lyra File** → press Enter.

The extension will translate your Lyra file to Python using the GROQ API and execute it automatically.

---

## Features

* Recognizes `.lyra` and `.lyra.txt` files.
* Integrated interpreter converts Lyra code to Python.
* Automatic execution of translated code.
* Shows Python translation in the console if `#show` flag is used in the Lyra file.

---

## Notes

* Lyra explains code as it runs, so some output may be descriptive rather than standard Python output.
* Make sure your **GROQ API key** is set in the extension settings, otherwise the extension will not work.

---

## Example Lyra File

```lyra
#show
#run_translated

function add with parameters a, b:
    return a + b

result = add with 3, 5
print "3 + 5 =", result
```

Running this file with the extension will execute the equivalent Python code and show the result in the terminal.

---

## Support & Feedback

If you encounter any issues, please submit them on the [GitHub repository](https://github.com/VIGARPAST-777-2/Lyra-Extension/issues).
