#!/usr/bin/env python3
"""QA screenshots for Nexphoria rebuild — desktop 1440 + mobile 375."""
import os
from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:5000"
OUT_DIR = "/home/user/workspace/nexphoria-site/qa-rebuild-final"
os.makedirs(OUT_DIR, exist_ok=True)

ROUTES = [
    ("gate",           "/"),
    ("women-home",     "/#/women"),
    ("women-peptides", "/#/women/peptides"),
    ("women-peptide-detail", "/#/women/peptides/bpc-157"),
    ("women-protocols", "/#/women/protocols"),
    ("men-home",       "/#/men"),
    ("men-peptides",   "/#/men/peptides"),
    ("men-peptide-detail", "/#/men/peptides/bpc-157"),
    ("men-protocols",  "/#/men/protocols"),
    ("how-it-works",   "/#/how-it-works"),
    ("science",        "/#/science"),
    ("physicians",     "/#/physicians"),
    ("lab-testing",    "/#/lab-testing"),
    ("pricing",        "/#/pricing"),
    ("faq",            "/#/faq"),
    ("about",          "/#/about"),
    ("community",      "/#/community"),
    ("contact",        "/#/contact"),
    ("assessment",     "/#/assessment"),
    ("legal-index",    "/#/legal"),
    ("legal-terms",    "/#/legal/terms"),
    ("not-found",      "/#/this-does-not-exist"),
]

DESKTOP = {"width": 1440, "height": 900}
MOBILE  = {"width": 375, "height": 812}

def take_screenshots():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # Desktop context
        desktop_ctx = browser.new_context(
            viewport=DESKTOP,
            device_scale_factor=1,
        )
        desktop_page = desktop_ctx.new_page()

        # Mobile context
        mobile_ctx = browser.new_context(
            viewport=MOBILE,
            device_scale_factor=2,
        )
        mobile_page = mobile_ctx.new_page()

        for slug, path in ROUTES:
            url = BASE_URL + path
            print(f"[desktop] {slug}: {url}")
            try:
                desktop_page.goto(url, wait_until="networkidle", timeout=15000)
                desktop_page.wait_for_timeout(1200)
                desktop_page.screenshot(
                    path=f"{OUT_DIR}/{slug}_desktop.png",
                    full_page=True,
                )
            except Exception as e:
                print(f"  ERROR desktop {slug}: {e}")

            print(f"[mobile]  {slug}: {url}")
            try:
                mobile_page.goto(url, wait_until="networkidle", timeout=15000)
                mobile_page.wait_for_timeout(1200)
                mobile_page.screenshot(
                    path=f"{OUT_DIR}/{slug}_mobile.png",
                    full_page=True,
                )
            except Exception as e:
                print(f"  ERROR mobile {slug}: {e}")

        browser.close()
    print("\nDone. Screenshots saved to:", OUT_DIR)
    saved = sorted(os.listdir(OUT_DIR))
    print(f"Total files: {len(saved)}")
    for f in saved:
        print(" ", f)

if __name__ == "__main__":
    take_screenshots()
