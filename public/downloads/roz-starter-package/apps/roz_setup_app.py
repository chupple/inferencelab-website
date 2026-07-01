#!/usr/bin/env python3
"""Roz local setup app.

Small GUI helper for the Roz starter package. The intended setup is OAuth-style
sign-in for accounts the buyer already has (ChatGPT/OpenAI and Google), plus
Telegram onboarding with a one-time purchase code. It is explicitly not a
marketing-site token-paste flow.
"""

from __future__ import annotations

import json
import subprocess
from pathlib import Path
from tkinter import BOTH, END, LEFT, RIGHT, BooleanVar, StringVar, Tk, Text, filedialog, messagebox
from tkinter import ttk

PACKAGE_ROOT = Path(__file__).resolve().parents[1]
DEMO_DATA = PACKAGE_ROOT / "data" / "pre-canned-workday.json"
LOCAL_STATE = Path.home() / ".roz-starter" / "roz.local.json"


def run_command(command: list[str]) -> str:
    try:
        completed = subprocess.run(command, check=False, capture_output=True, text=True, timeout=60)
    except FileNotFoundError:
        return f"Command not found: {command[0]}"
    except subprocess.TimeoutExpired:
        return f"Timed out: {' '.join(command)}"
    output = (completed.stdout + completed.stderr).strip()
    return output or f"Exit code: {completed.returncode}"


class RozSetupApp:
    def __init__(self, root: Tk) -> None:
        self.root = root
        root.title("Roz OAuth setup")
        root.geometry("900x720")
        root.configure(bg="#020617")

        self.chatgpt_signed_in = BooleanVar(value=False)
        self.google_signed_in = BooleanVar(value=False)
        self.telegram_ready = BooleanVar(value=False)
        self.use_demo = BooleanVar(value=True)
        self.setup_code = StringVar(value="")
        self.telegram_handle = StringVar(value="")
        self.package_path = StringVar(value=str(PACKAGE_ROOT))

        self._build_ui()

    def _build_ui(self) -> None:
        style = ttk.Style()
        style.theme_use("clam")
        style.configure("TFrame", background="#020617")
        style.configure("TLabel", background="#020617", foreground="#e2e8f0")
        style.configure("TButton", padding=10)
        style.configure("TCheckbutton", background="#020617", foreground="#e2e8f0")

        frame = ttk.Frame(self.root, padding=24)
        frame.pack(fill=BOTH, expand=True)

        ttk.Label(frame, text="Roz OAuth setup", font=("Helvetica", 28, "bold")).pack(anchor="w")
        ttk.Label(
            frame,
            text="Use the accounts you already have: ChatGPT/OpenAI, Google, and Telegram. No API-token setup is required on the website.",
            wraplength=820,
        ).pack(anchor="w", pady=(8, 20))

        form = ttk.Frame(frame)
        form.pack(fill="x", pady=(0, 16))

        ttk.Label(form, text="One-time setup code from purchase email").grid(row=0, column=0, sticky="w")
        ttk.Entry(form, textvariable=self.setup_code, width=40, show="•").grid(row=1, column=0, sticky="ew", padx=(0, 16), pady=(4, 12))

        ttk.Label(form, text="Telegram handle or user ID").grid(row=0, column=1, sticky="w")
        ttk.Entry(form, textvariable=self.telegram_handle, width=40).grid(row=1, column=1, sticky="ew", pady=(4, 12))

        ttk.Label(form, text="Package folder").grid(row=2, column=0, sticky="w")
        path_row = ttk.Frame(form)
        path_row.grid(row=3, column=0, columnspan=2, sticky="ew", pady=(4, 12))
        ttk.Entry(path_row, textvariable=self.package_path, width=72).pack(side=LEFT, fill="x", expand=True)
        ttk.Button(path_row, text="Browse", command=self.choose_package).pack(side=RIGHT, padx=(8, 0))

        ttk.Checkbutton(form, text="ChatGPT/OpenAI sign-in completed", variable=self.chatgpt_signed_in).grid(row=4, column=0, sticky="w")
        ttk.Checkbutton(form, text="Google OAuth sign-in completed", variable=self.google_signed_in).grid(row=4, column=1, sticky="w")
        ttk.Checkbutton(form, text="Telegram onboarding bot verified me", variable=self.telegram_ready).grid(row=5, column=0, sticky="w")
        ttk.Checkbutton(form, text="Run with pre-canned demo data first", variable=self.use_demo).grid(row=5, column=1, sticky="w")
        form.columnconfigure(0, weight=1)
        form.columnconfigure(1, weight=1)

        buttons = ttk.Frame(frame)
        buttons.pack(fill="x", pady=(0, 16))
        ttk.Button(buttons, text="Check Hermes", command=self.check_hermes).pack(side=LEFT, padx=(0, 8))
        ttk.Button(buttons, text="Show Hermes install command", command=self.show_install_command).pack(side=LEFT, padx=(0, 8))
        ttk.Button(buttons, text="Open OAuth instructions", command=self.show_oauth_instructions).pack(side=LEFT, padx=(0, 8))
        ttk.Button(buttons, text="Save local setup state", command=self.save_local_state).pack(side=LEFT, padx=(0, 8))
        ttk.Button(buttons, text="Run pre-canned demo", command=self.run_demo).pack(side=LEFT, padx=(0, 8))

        ttk.Label(
            frame,
            text="Security: the setup code verifies purchase; it is not an API token. Do not paste real credentials into screenshots, support messages, package docs, or website source.",
            foreground="#fde68a",
            wraplength=820,
        ).pack(anchor="w", pady=(0, 12))

        self.output = Text(frame, height=20, bg="#0f172a", fg="#e2e8f0", insertbackground="#67e8f9", wrap="word")
        self.output.pack(fill=BOTH, expand=True)
        self.log("Ready. Start with Telegram onboarding, then OAuth sign-in, then run the pre-canned demo.")

    def choose_package(self) -> None:
        chosen = filedialog.askdirectory(initialdir=self.package_path.get())
        if chosen:
            self.package_path.set(chosen)

    def log(self, message: str) -> None:
        self.output.insert(END, message + "\n")
        self.output.see(END)

    def check_hermes(self) -> None:
        self.log("$ hermes doctor")
        self.log(run_command(["hermes", "doctor"]))

    def show_install_command(self) -> None:
        command = "curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash"
        self.log("Install command to run if Hermes is missing:")
        self.log(command)
        messagebox.showinfo("Hermes install command", command)

    def show_oauth_instructions(self) -> None:
        self.log("OAuth setup path:")
        self.log("1. Sign in with your existing ChatGPT/OpenAI account when Roz opens the provider window.")
        self.log("2. Sign in with Google when the browser asks for mail/calendar/files access.")
        self.log("3. Message the Roz Telegram onboarding bot with the one-time setup code from your purchase email.")
        self.log("4. Run the pre-canned demo before connecting real account data.")

    def save_local_state(self) -> None:
        LOCAL_STATE.parent.mkdir(parents=True, exist_ok=True)
        payload = {
            "assistant": "Roz",
            "setup_code_present": bool(self.setup_code.get().strip()),
            "setup_code": "[REDACTED]" if self.setup_code.get().strip() else "",
            "telegram_handle": self.telegram_handle.get().strip(),
            "chatgpt_oauth_complete": self.chatgpt_signed_in.get(),
            "google_oauth_complete": self.google_signed_in.get(),
            "telegram_onboarding_complete": self.telegram_ready.get(),
            "use_pre_canned_demo_data": self.use_demo.get(),
        }
        LOCAL_STATE.write_text(json.dumps(payload, indent=2))
        self.log(f"Saved local setup state: {LOCAL_STATE}")
        self.log("Setup code stored in state as [REDACTED].")

    def run_demo(self) -> None:
        package_root = Path(self.package_path.get()).expanduser()
        data_file = package_root / "data" / "pre-canned-workday.json"
        if not data_file.exists():
            data_file = DEMO_DATA
        payload = json.loads(data_file.read_text())
        self.log("Roz pre-canned demo")
        self.log(f"Scenario: {payload['scenario']}")
        for item in payload["email"]:
            self.log(f"Email: {item['subject']} — {item['priority']}")
        for item in payload["calendar"]:
            self.log(f"Calendar: {item['title']} -> {item['recommended_time']}")
        self.log("Credentials: [REDACTED]")


def main() -> int:
    root = Tk()
    RozSetupApp(root)
    root.mainloop()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
