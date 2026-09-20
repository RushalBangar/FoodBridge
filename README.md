<div align="center">
  <img src="https://lh3.googleusercontent.com/aida/AEtjO1Xz2bwctCCBTGIMQmH80qFSvboetyKJlhPjZS3OjgM3G-SeLVPzdIqO06PsEZ363WV4suji8GtJjqtnCmz-A4og5AXLm6-mdNuVHd7Gs_4EQtVieVhK9HK2RV9WBRKMpI4yo9LhW8GXgsaafPAIvIYvNxapD6ib6JnVuQ9e2u5k9QPADkIMWe4dVDjzKX9AJyAdVjaxbI4W1dJjthyzHRvjkJq5sasOJ7HvTfeM1yO7Ww" alt="FoodBridge Logo" width="150" height="150" />
  
  # FoodBridge
  ### No Plate Left Empty.
  
  **An AI-powered, hyper-local food rescue platform that connects commercial food surplus directly to community pantries and shelters in real-time.**

  [![Live Demo](https://img.shields.io/badge/Live_Demo-foodbridge26.vercel.app-1F7A54?style=for-the-badge&logo=vercel)](https://foodbridge26.vercel.app/)
</div>

---

## 🌍 The Problem

We are solving the devastating paradox of commercial food waste and food insecurity coexisting in the exact same neighborhoods. 

Globally, millions of tons of perfectly edible, high-quality food are sent to landfills by restaurants, bakeries, and event caterers every single day—generating massive methane greenhouse gas emissions. At the exact same time, local emergency kitchens and shelters constantly struggle to secure reliable food sources. 

Commercial kitchen managers find the logistics and paperwork of donating perishable food too burdensome at the end of a busy shift, while local NGOs lack the real-time visibility to rescue that food before it spoils.

## 🚀 Our Solution

FoodBridge solves the problem of commercial food waste by treating food rescue as an on-demand, hyper-local logistics challenge. We completely remove the operational friction of donation for busy kitchens.

1. **Snap a Photo:** A restaurant manager with end-of-day surplus snaps a quick photo of the food. 
2. **AI Magic:** The **Google Gemini AI Vision** model analyzes the image, automatically predicting the food category, quantity, and a safe consumption expiry window. 
3. **Live Broadcast:** The listing is instantly published to our "Live Rescue Radar."
4. **Instant Claim:** Verified local shelters receive the alert based on a geospatial matching algorithm (prioritizing proximity and urgency) and claim the food for immediate pickup.

## ✨ Key Features & Uniqueness

* **Zero-Friction AI Intake:** Reduces a tedious 5-minute manual entry form to a 5-second photo upload using Google Gemini Vision.
* **Smart Urgency Matching:** Dynamically routes highly perishable items to the closest available pantries before they spoil using GeoFire.
* **Public Transparency Ledger:** A real-time analytics dashboard that tracks ecological impact, giving donors a clear, verifiable view of how many meals they rescued and the exact kilograms of CO2-equivalent greenhouse gases they diverted.

Unlike existing solutions that rely on rigid recurring schedules or tedious spreadsheets, FoodBridge enables spontaneous, decentralized community responses to food surplus, gamified through verifiable ESG metrics.

## 🛠️ Technology Stack

- **Frontend:** React.js, Vite, Tailwind CSS (Glassmorphism & High-fidelity UI)
- **Backend & Database:** Firebase (Authentication, Firestore for real-time NoSQL data synchronization)
- **AI / ML:** Google Gemini API (Multimodal Vision for automated food parsing)
- **Geospatial Intelligence:** GeoFire (Fast radius-based spatial queries)
- **Deployment:** Vercel (CI/CD and global edge network hosting)

## 💻 Local Development

To run this project locally:

```bash
# 1. Clone the repository
git clone https://github.com/RushalBangar/FoodBridge.git

# 2. Navigate into the directory
cd FoodBridge

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

> **Note:** You will need to configure your own `.env` file with your Firebase config and Gemini API keys for the full AI and real-time features to work locally.

---
*Built with ❤️ to intercept waste and feed communities.*
