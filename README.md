# DealPulse

**DealPulse** is an AI-powered bot that finds and shares the best online deals in real-time directly to your Telegram channel.

---

## Features

- Automatically fetches and posts top deals.
- Sends instant notifications to your Telegram channel.
- Easy setup with GitHub Actions for 24/7 operation.
- Support DealPulse via PayPal: [paypal.me/dealpulse](https://paypal.me/dealpulse)

---

## Setup Instructions

### 1. Telegram Bot & Channel Setup
- Create a Telegram bot with [BotFather](https://t.me/BotFather) and get your bot token.
- Create a Telegram channel and add your bot as an admin with **post permissions**.
- Obtain your channel's chat ID:
  - If public, use `@channelusername`.
  - If private, get the numeric ID by forwarding a message to [@RawDataBot](https://t.me/RawDataBot).

### 2. Configure GitHub Secrets
- In your GitHub repo, go to **Settings > Secrets and variables > Actions**.
- Add the following secrets:
  - `TG_BOT_TOKEN` — your bot token.
  - `TG_CHAT_ID` — your channel chat ID (`@channelusername` or numeric).
  - `VIP_LINK` — your PayPal.Me link (e.g., `https://paypal.me/dealpulse`).

### 3. Customize `index.html`
- Update PayPal and VIP links in the JavaScript section to your PayPal.Me link.

### 4. Deployment
- GitHub Actions workflow will automatically run the deal-fetching and notification script.
- To test manually, run the Python or JavaScript notification script locally.

---

## Usage

Once set up, the bot will automatically post deals to your Telegram channel as per schedule.

---

## Support

If you like DealPulse, please consider supporting it via PayPal: [paypal.me/dealpulse](https://paypal.me/dealpulse)

---

## License

MIT License — free to use and modify.

---

*Built with ❤️ to help you save!*
