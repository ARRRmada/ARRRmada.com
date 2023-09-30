# Coming Soon
## * This is a test fork of ARRRmada, offering a different theme and some extras.


<img src="https://raw.githubusercontent.com/PirateNetwork/mediakit/main/ARRRaccepted/pirateacceptedhere.png" style="width: 300px;margin:40px auto 60px;display:block;" />

---

# ARRRmada.com
This is a **open source version of ARRRmada.com**. This concept makes the website static, facilitating hosting on Github, enhancing transparency, and shifting control of this crucial Pirate Chain asset to the community.

* Open-source
* Community-maintained
* Anybody can submit a PR to improve the website
* Visitors can submit Issues to alert maintainers to problems
* No database or server expenses required
* Can be forked and hosted anywhere
* Listings can be designed by the merchants using the listing tool
    * *(users with commit access to this repository will manually add the listing)*
* Listings can be submitted anonymously
* Access controls, version control, changelog, and commit history due to GitHub hosting
* Portable and lightweight
* Jekyll for templating and automation (pure HTML in `_site` directory)

### Access the website here: [https://quirkyrobots.github.io/arrrmada)](https://quirkyrobots.github.io/arrrmada).

---

# User Guide

## Add new Merchant Listing
To create a listing, appending the listing details to `merchants.yml` and uploading the listing image is all that's required. The rest is automated once Jekyll builds. This process relies on a listing code, which the merchant generates and submits for approval. The process is decribed below. 

* **DESIGN A LISTING** - Merchants will create their own listing using the listing tool located at [https://ARRRmada.com/listing_tool](https://ARRRmada.com/listing_tool)

* **SUBMIT LISTING CODE** - After designing a listing, the merchants will generate a listing code. This code will be submitted for review via a GitHub issue form. This process also allows anonymous submissions. If a valid listing code is recieved, regardless of platform, the listing can be added. For example, the code could even be sent in a sapling transaction memo. The listing code is meant to be portable and submitted in any method. 

Link to Github [Issue form](https://github.com/ARRRmada/ARRRmada.com/issues/new?assignees=&labels=&projects=&template=merchant_listing_submission.yaml)

  * Note: Submission via Github is prefered so that the submitter can be contacted should there be any issue with the listing*  

---

#  Maintainers Guide

* **DECODE LISTING CODE** - Once the listing code and listing image are received, use the listing decoder tool to make the code human-readable. [https://ARRRmada.com/listing_decoder](https://ARRRmada.com/listing_decoder)

* **APPEND MERCHANTS LIST** Verify the provided information is correct, and the listing meets any approval requirements. Once listing is approved, a user with commit access may append the listing to the end of: 
[https://github.com/ARRRmada/ARRRmada.com/edit/main/_data/merchants.yml](https://github.com/ARRRmada/ARRRmada.com/edit/main/_data/merchants.yml)

* **UPLOAD IMAGE** - Ensure the uploaded image filename matches the filename in the listing. Once approved, a user with commit access will upload the image here:
[https://github.com/ARRRmada/ARRRmada.com/upload/main/assets/img/merchants](https://github.com/ARRRmada/ARRRmada.com/upload/main/assets/img/merchants)

Instructions are clearly provided at each step on the website. Once the commits are made, jekyll will automatically build which can take a few minutes before the listing will appear on the live website.

## Add a Payment Gateway
A Payment gateway can be added by appending the gateway listing to the gateways list, and uploading the gateway listing image.

* **ADD LISTING** - Open `_data/gateways.yml` and add the new gateway listing to the YAML list. 
[https://github.com/ARRRmada/ARRRmada.com/edit/main/_data/gateways.yml](https://github.com/ARRRmada/ARRRmada.com/edit/main/_data/gateways.yml) 

* **UPLOAD IMAGE** - Upload the gateway image into:
[https://github.com/ARRRmada/ARRRmada.com/upload/main/assets/img/gateways](https://github.com/ARRRmada/ARRRmada.com/upload/main/assets/img/gateways) 

Each listing must include a `name`, `desc`, `img`, and `url`.

Example:
```yaml
- name: PiratePay
  desc: 'PiratePay is an open-source decentralized payment gateway that allows you to accept $ARRR on your websites and stores. PiratePay eliminates the need for a middleman and is built with the highest level of privacy and security in mind.'
  img: piratepay.svg
  url: https://cryptocurrencycheckout.com/guides/piratepay
```

**NAME** - The name can be any name

**DESC** - Description must be 160 characters or fewer. Multiline descriptions must be encased in single quotes.

**IMG and listing image** - The listing image should be 400px x 150px. The image filename (img) must include the extension and match the image that must be placed in `assets/img/gateways/`.

**URL** - the site url is the complete URL of where the link should redirect the browser.

---

## Add a new Tag
To create a new tag, it must be added manually to the YAML list. Open `_data/tags.yml` and add the new entry. The entry must include a unique ID and a unique tag name. Order and ID otherwise do not matter.
[https://github.com/ARRRmada/ARRRmada.com/edit/main/_data/tags.yml](https://github.com/ARRRmada/ARRRmada.com/edit/main/_data/tags.yml)

Example:
```yaml
- id: 12
  name: Crypto
```

**ID** - Typically the ID can be incremented by one from the last entry, but ensure it does not already exist in the list.

**NAME** - Use a unique tag name that does not yet exist. Consider carefully if a tag should be added. Too many tags may worsen the user experience, so only add if there is no other existing tag that will suffice. To ensure formatting is not broken, the tag name should be as short and concise as possible, and not to excede 20 characters.

---

## Change an Existing Tag
Tag names can be altered as long as the ID remains the same. **DO NOT CHANGE** an existing ID. Doing so will create a new tag and break existing listings.
[https://github.com/ARRRmada/ARRRmada.com/edit/main/_data/tags.yml](https://github.com/ARRRmada/ARRRmada.com/edit/main/_data/tags.yml)

---

## Add Donation Buttons
Donation Button can be added by appending the filename to the buttons list and uploading the image

* **ADD TO LIST** - Add the filename to the YAML list in `_data/buttons.yml`
[https://github.com/ARRRmada/ARRRmada.com/edit/main/_data/buttons.yml](https://github.com/ARRRmada/ARRRmada.com/edit/main/_data/buttons.yml)

* **UPLOAD IMAGE** - Upload an image to the `/button` directory: 
[https://github.com/ARRRmada/ARRRmada.com/upload/main/button](https://github.com/ARRRmada/ARRRmada.com/upload/main/button)

---


