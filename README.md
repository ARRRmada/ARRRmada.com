<div align="center">
  <img src="https://raw.githubusercontent.com/PirateNetwork/mediakit/main/ARRRaccepted/pirateacceptedhere.png" width="300" alt="ARRR Accepted Here"/>
  
  # ARRRmada.com
  
  **Community-maintained directory of merchants accepting Pirate Chain (ARRR)**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Jekyll](https://img.shields.io/badge/Jekyll-4.3-red.svg)](https://jekyllrb.com/)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
  
  [🌐 Live Site](https://arrrmada.com) · [📝 Report Bug](https://github.com/ARRRmada/ARRRmada.com/issues) · [✨ Request Feature](https://github.com/ARRRmada/ARRRmada.com/issues)
  
</div>

---

## 📖 About

ARRRmada.com is an **open-source, community-maintained directory** of merchants and service providers accepting Pirate Chain (ARRR) cryptocurrency. Built as a static site with Jekyll, it provides transparency, community control, and zero hosting costs through GitHub Pages.

### ✨ Key Features

- 🔍 **Live Search** - Real-time merchant search by name, description, or services
- 🏷️ **Category Filtering** - Filter merchants by service categories
- 🔗 **Automated URL Checking** - Weekly validation of merchant links via GitHub Actions
- ✅ **Status Badges** - Visual indicators for active, warning, or inactive merchant sites
- 🎨 **Listing Tool** - Interactive merchant listing builder with live preview
- 🔒 **Anonymous Submissions** - Submit listings without GitHub account
- 📊 **Community Governance** - Open-source with version control and full transparency
- 🚀 **Zero Server Costs** - Hosted on GitHub Pages, no database required

---

## 🛠️ Tech Stack

- **Static Site Generator:** [Jekyll 4.3](https://jekyllrb.com/)
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Data Storage:** YAML files (`_data/`)
- **Automation:** GitHub Actions (URL checking, automated builds)
- **Deployment:** GitHub Pages
- **CI/CD:** Python 3.11 (URL validation scripts)

---

## 🚀 Quick Start

### Prerequisites

- Ruby 3.0+
- Bundler
- Git

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/ARRRmada/ARRRmada.com.git
   cd ARRRmada.com
```

2. **Install dependencies**
```bash
   bundle install
```

3. **Run local development server**
```bash
   bundle exec jekyll serve --baseurl ""
```

4. **Open in browser**
```
   http://localhost:4000
```

### Configuration

- **Local development:** `baseurl: ""`
- **GitHub Pages (fork):** `baseurl: "/ARRRmada.com"`
- **Production:** `baseurl: ""`

Edit `_config.yml` accordingly.

---

## 📁 Project Structure
```
ARRRmada.com/
├── _data/
│   ├── merchants.yml      # Merchant listings database
│   ├── tags.yml          # Category tags
│   ├── gateways.yml      # Payment gateway listings
│   └── buttons.yml       # Donation button images
├── _layouts/
│   └── page.html         # Main page template
├── _includes/
│   ├── head.html         # HTML head section
│   └── footer.html       # Site footer
├── assets/
│   ├── css/              # Stylesheets
│   │   ├── global.css    # Global styles
│   │   ├── index.css     # Homepage styles
│   │   ├── merchant.css  # Listing tool styles
│   │   └── footer.css    # Footer styles
│   ├── js/               # JavaScript files
│   │   ├── index.js      # Search & filter logic
│   │   └── merchant.js   # Listing tool logic
│   └── img/
│       ├── merchants/    # Merchant logo images
│       └── gateways/     # Gateway logo images
├── .github/
│   ├── workflows/
│   │   └── check-merchant-urls.yml  # URL checker workflow
│   └── scripts/
│       ├── check_urls.py            # URL validation script
│       └── prepare_merchants.py     # Data preparation script
├── index.html            # Homepage
├── listing_tool.html     # Merchant listing builder
├── listing_decoder.html  # Listing code decoder
└── _config.yml          # Jekyll configuration
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Adding a Merchant Listing

**Option 1: Via Listing Tool (Recommended)**

1. Visit [ARRRmada.com/listing_tool](https://arrrmada.com/listing_tool)
2. Design your listing with live preview
3. Generate listing code
4. Submit via [GitHub Issue Form](https://github.com/ARRRmada/ARRRmada.com/issues/new?assignees=&labels=&projects=&template=merchant_listing_submission.yaml)

**Option 2: Direct PR**

1. Fork the repository
2. Add listing to `_data/merchants.yml`:
```yaml
   - id: unique_id
     name: Your Business Name
     description: Brief description (max 160 chars)
     url: https://yourstore.com
     image: your-logo.png
     tags: [20, 33, 45]  # Category IDs from tags.yml
     url_status: active
     url_last_checked: 2024-12-03
```
3. Upload logo (400x240px) to `assets/img/merchants/`
4. Submit Pull Request

### Adding Payment Gateways

Edit `_data/gateways.yml` and upload logo to `assets/img/gateways/`

### Adding Donation Buttons

Edit `_data/buttons.yml` and upload image to `/button/`

### Code Contributions

1. Fork the repo
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 🤖 Automated URL Checking

A GitHub Action runs **every Monday at 2 AM UTC** to validate all merchant URLs:

- ✅ **Active** - URL responds successfully
- ⚠️ **Warning** - SSL issues or timeouts
- ❌ **Inactive** - Connection failed

Status is stored in `merchants.yml` and displayed via badges on merchant cards.

### Manual Trigger

Navigate to [Actions](https://github.com/ARRRmada/ARRRmada.com/actions) → `Check Merchant URLs` → `Run workflow`

---

## 🏷️ Tag Management

### Adding a New Tag

Edit `_data/tags.yml`:
```yaml
- id: 50  # Unique ID
  name: Your Tag Name  # Max 20 chars
```

⚠️ **Warning:** Never change existing tag IDs - this breaks merchant listings!

### Editing Tag Names

You can rename tags, but **DO NOT change the ID**.

---

## 📝 Listing Code Format

Merchants generate a base64-encoded listing code containing:
- Business name
- Description
- URL
- Image filename
- Selected category tags

Use the [Listing Decoder](https://arrrmada.com/listing_decoder) to decode submissions.

---

## 🚢 Deployment

### Production (arrrmada.com)

Automatic deployment via GitHub Pages on push to `main` branch.

### Fork Deployment

1. Enable GitHub Pages in repo settings
2. Set `baseurl: "/ARRRmada.com"` in `_config.yml`
3. Push changes
4. Access at `https://yourusername.github.io/ARRRmada.com`

---

## 🛡️ Security

- Automated URL validation prevents malicious links
- YAML safe loading prevents code injection
- Community review process for all submissions
- Version control provides full audit trail

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Pirate Chain Community](https://pirate.black)
- All contributing merchants and developers
- Jekyll and GitHub Pages teams

---

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/ARRRmada/ARRRmada.com/issues)
- **Discussions:** [GitHub Discussions](https://github.com/ARRRmada/ARRRmada.com/discussions)
- **Email:** ARRRmada@pirate.black

---

<div align="center">
  
  **Made with ⚓ by the Pirate Chain Community**
  
  [Website](https://arrrmada.com) • [Pirate Chain](https://pirate.black) • [GitHub](https://github.com/ARRRmada)
  
</div>
