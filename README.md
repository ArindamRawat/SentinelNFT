# 🛡️ SentinelNFT Intelligence Dashboard

A lean, cyberpunk-themed NFT intelligence dashboard designed for deep NFT market analytics, powered by AI and real-time data.  
This project merges live NFT market insights with anomaly detection and risk analysis, using both custom-trained AI models and Gemini (Google GenAI).

---

### 🧬 LOGO

<img width="1024" height="1024" alt="ChatGPT Image Aug 4, 2025, 03_12_29 AM" src="https://github.com/user-attachments/assets/cfe8bf4c-eb34-4ed3-a7de-12230ea037d1" />

---

## 🎥 Demo Video

[![Watch Demo Video](https://img.youtube.com/vi/IlkfOEHp2hg/0.jpg)](https://youtu.be/IlkfOEHp2hg)

---

## 🖼️ Dashboard Screenshots

<img width="1884" height="891" alt="Dashboard Image 1" src="https://github.com/user-attachments/assets/7b4a0eae-7a49-487c-8aaf-b342ddc57c75" />

---

<img width="1919" height="896" alt="Dashboard Image 2" src="https://github.com/user-attachments/assets/e61ebdee-84f7-48ea-a0e8-b5456f78fe6a" />

---

<img width="1917" height="888" alt="Dashboard Image 3" src="https://github.com/user-attachments/assets/4e9ea1b2-9287-48a7-a36d-af07bf8d33d3" />

---

## 🚀 Features
- 🔍 **NFT Collection Search** by contract address & blockchain
- 📊 **Market Stats Overview** (price, volume, transactions, sales)
- 🧠 **AI-Powered Risk Analysis** using custom ML model
- 🚨 **Anomaly Detection** (wash trading, unusual activity)
- 📈 **Interactive Trend Graphs** (15m–90d range)
- 🧬 **Holder Statistics** with time filters and line toggles
- 🎯 **Score Metrics**: Marketcap, average price, ceiling price, etc.
- 🌐 **Real-time Gemini AI insights** (Google GenAI) per time range
- 💡 **Sentiment rating**: Famous / Recommended / Average / Not Recommended
- 🎨 **Cyberpunk UI** with neon effects and responsive layout

---

## 🧩 Tech Stack

| Frontend | Backend | AI/ML | APIs |
|----------|---------|-------|------|
| React + TailwindCSS + Vite | Express.js (Node.js) | TensorFlow, Scikit-Learn, Gemini (GenAI) | UnleashNFTs API, Google Gemini |

---

## 🧠 AI Models Used

### 1. **Risk Analysis Model**
- **Purpose**: Predicts NFT collection investment risk based on marketcap, floor price, volume trends, and sales volatility.
- **Type**: Supervised Classification Model
- **Framework**: Scikit-Learn + TensorFlow
- **Input Features**:
  - Marketcap
  - Floor price USD
  - Volume & sales trends
  - Whale concentration
- **Output**: Risk category → `High`, `Medium`, `Low`

### 2. **Anomaly Detection Model**
- **Purpose**: Detects suspicious trading patterns, wash trading, or manipulation attempts.
- **Type**: Unsupervised model (Isolation Forest + custom LSTM)
- **Framework**: Scikit-Learn, TensorFlow (LSTM time-series)
- **Trained on**: Historical NFT collection behavior and flagged wash trade datasets
- **Output**: Boolean flag + anomaly description

---

## 🔮 Gemini (Google GenAI) Integration

### 📡 Used For:
- Real-time **AI-generated insights** based on UnleashNFTs data
- Intelligent summarization of trends, whale behavior, holder shifts, anomalies

### 🔧 How it works:
1. Client requests `/api/gemini/insight` with:
   - contract address
   - chain ID
   - selected time range (24h, 7d, 30d, all)
2. Server fetches data from **6 endpoints**:
   - `/analytics`
   - `/profile`
   - `/holders`
   - `/scores`
   - `/washtrade`
   - `/whales`
3. Server constructs a prompt:
   - Structures all data into sections
   - Adds date, insight goals, expert tone
4. Sends prompt to **Google Gemini Pro**
5. Response is rendered as an **ExpertInsightCard**

---

## 🔗 APIs Used

### 🧠 UnleashNFTs API

- `GET /api/v2/nft/collection/metadata`  
  → Metadata info (name, symbol, image, description)

- `GET /api/v2/nft/collection/analytics`  
  → Market stats like:
  - floor_price_usd
  - volume_usd
  - transactions
  - sales
  - marketcap
  - holder count

- `GET /api/v2/nft/collection/scores`  
  → Score metrics: price_avg, price_ceiling, volume score

- `GET /api/v2/nft/collection/profile`  
  → Collection category, chain stats

- `GET /api/v2/nft/collection/trend`  
  → Time series for assets, volume, transactions, sales

- `GET /api/v2/nft/collection/washtrade`  
  → Wash trade scores and risk factors

- `GET /api/v2/nft/collection/holders`  
  → Unique holders, whales, retail, retention %

- `GET /api/v2/nft/collection/whales`  
  → Whale activity and control concentration

---

## 🧪 Getting Started Locally

### 📁 Prerequisites

- Node.js (v18+)
- Python 3.8+ (for AI model testing)
- GitHub CLI (optional)
- UnleashNFTs API Key (get from https://www.unleashnfts.com)
- Gemini API Key (from https://aistudio.google.com)

---

### ⚙️ Setup Instructions

1. **Clone the Repo**
   ```bash
   git clone https://github.com/ArindamRawat/SentinelNFT.git
   cd SentinelNFT\ Intelligence\ Dashboard
# 🚀 Project Setup

## 📦 Install Dependencies

```bash
cd client && npm install
cd ../server && npm install
```

## ⚙️ Configure Environment

Create a `.env` file in `server/`:

```ini
UNLEASH_API_KEY=your_unleash_api_key
GEMINI_API_KEY=your_google_gemini_key
```

## 🧠 Run the Backend

```bash
cd server
node index.js
```

## 🎨 Run the Frontend

```bash
cd client
npm run dev
```

---

## 🧑‍🔬 Future Enhancements

- Wallet connect and real-time portfolio risk analysis  
- Alerts for collection anomalies (email/webhook)  
- Deploy as SaaS with API key registration  
- Dark/light mode toggle (currently fixed neon cyberpunk)

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 👨‍💻 Author

**Arindam Rawat**  
GitHub
