# GPA Tracker for KTU AIS

This is a lightweight Google Chrome extension designed for students of Kaunas University of Technology (KTU) to track and calculate their GPA using data from the AIS system.

---

## 📦 Features

- Parses student data from the AIS website (`uais.cr.ktu.lt`)
- Displays all current modules and their average mark
- Dynamically calculates weighted GPA
- Allows inserting missing marks via "MIN", "MAX", or "Calculate GPA" buttons
- Fully editable list of modules in the config window
- Add, edit, or remove modules manually
- GPA output is clean and styled
- Config page for full control of input

---

## 🚀 Installation (Google store)



## 🚀 Installation (Developer Mode)

1. **Download the extension**  
   Either:
   - Clone this repo, or  
   - [Download the ZIP](https://github.com/yourname/ktu-gpa-extension/archive/refs/heads/main.zip) and extract it.

2. **Open Chrome Extension Settings**  
   Navigate to:  
   `chrome://extensions/`

3. **Enable Developer Mode**  
   Toggle the switch at the top right.

4. **Load the unpacked extension**  
   Click `Load unpacked` and select the folder you downloaded/extracted.

5. **Done!**  
   Open `https://uais.cr.ktu.lt` and click the extension icon to begin.

---

## 📁 Project Structure
EXTENDAIS/
├── icons/               # All icon assets
├── info/                # Docs, planning (optional)
├── pages/               # HTML views for each window
│   ├── main.html
│   ├── config.html
│   ├── add_module.html
│   └── edit_module.html
├── scripts/             # JavaScript logic per view
│   ├── main.js
│   ├── config.js
│   ├── add_module.js
│   ├── edit_module.js
│   ├── logic.js
│   ├── content.js
│   └── background.js
├── styles/              # Shared CSS styles
│   └── styles.css
├── manifest.json        # Chrome extension manifest
└── README.md            # This file

## 🛠 Development Notes

- Make sure you reload the extension from `chrome://extensions` after every code change.
- All paths in HTML must be relative (e.g., `scripts/main.js`, not just `main.js`).
- You can tweak popup size by changing the container size in `styles.css`.


