require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());


const UNLEASH_API_KEY = process.env.UNLEASH_API_KEY;

// 📊 Analytics Endpoint (for MarketStatsCard)
app.get('/api/api/v2/nft/collection/analytics', async (req, res) => {
  try {
    const { blockchain, contract_address } = req.query;

    const response = await axios.get(
      `https://api.unleashnfts.com/api/v2/nft/collection/analytics`,
      {
        headers: {
          accept: 'application/json',
          'x-api-key': UNLEASH_API_KEY,
        },
        params: {
          blockchain,
          contract_address,
          offset: 0,
          limit: 30,
          sort_by: 'sales',
          time_range: '24h',
          sort_order: 'desc',
        },
      }
    );

    const dataArray = response.data?.data;
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
      return res.status(404).json({ message: 'No analytics data found' });
    }

    const item = dataArray[0];

    const formatted = {
      total_volume: Number(item.volume) || 0,
      trade_count: Number(item.sales) || 0,
      asset_count: Number(item.assets) || 0,
      transaction_count: Number(item.transactions) || 0,
      transfer_count: Number(item.transfers) || 0,
      floor_price_usd_count: Number(item.floor_price_usd) || 0,
    };

    console.log('Sending stats:', formatted);
    res.json(formatted);
  } catch (err) {
    console.error('Analytics fetch error:', {
      message: err.message,
      response: err.response?.data || 'No response data',
    });

    const status = err.response?.status || 500;
    const errorMsg = err.response?.data || { error: 'Internal Server Error' };
    res.status(status).json(errorMsg);
  }
});

//Market Score Trend Endpoint 
app.get('/api/api/v2/nft/collection/trend', async (req, res) => {
  try {
    const { blockchain, contract_address, time_range } = req.query;

    const response = await axios.get(
      'https://api.unleashnfts.com/api/v2/nft/collection/analytics',
      {
        headers: {
          accept: 'application/json',
          'x-api-key': UNLEASH_API_KEY,
        },
        params: {
          blockchain,
          contract_address,
          offset: 0,
          limit: 30,
          sort_by: 'sales',
          time_range: time_range || '24h',
          sort_order: 'desc',
        },
      }
    );

    const dataArray = response.data?.data;
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
      return res.status(404).json({ message: 'No analytics data found' });
    }

    const item = dataArray[0];
    res.json({ data: [item] });
  } catch (err) {
    console.error('Analytics fetch error:', {
      message: err.message,
      response: err.response?.data || 'No response data',
    });

    const status = err.response?.status || 500;
    const errorMsg = err.response?.data || { error: 'Internal Server Error' };
    res.status(status).json(errorMsg);
  }
});


// 👤 Profile Data Endpoint (for Risk & Anomaly prediction)
app.get('/api/api/v2/nft/collection/profile', async (req, res) => {
  try {
    const { blockchain, contract_address } = req.query;

    const response = await axios.get(
      'https://api.unleashnfts.com/api/v2/nft/collection/profile',
      {
        headers: {
          accept: 'application/json',
          'x-api-key': UNLEASH_API_KEY,
        },
        params: {
          blockchain,
          contract_address,
          time_range: 'all',
          offset: 0,
          limit: 30,
          sort_by: 'collection_score',
          sort_order: 'desc',
        },
      }
    );

    const data = response.data?.data;
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(404).json({ message: 'No profile data found' });
    }

    res.json(data[0]); // return only the top item
  } catch (err) {
    console.error('Profile fetch error:', {
      message: err.message,
      response: err.response?.data || 'No response data',
    });

    const status = err.response?.status || 500;
    const errorMsg = err.response?.data || { error: 'Internal Server Error' };
    res.status(status).json(errorMsg);
  }
});

//Holder APi Collection
app.get('/api/api/v2/nft/collection/holders', async (req, res) => {
  try {
    const { blockchain, contract_address, time_range = '24h' } = req.query;

    const response = await axios.get('https://api.unleashnfts.com/api/v2/nft/collection/holders', {
      headers: {
        accept: 'application/json',
        'x-api-key': UNLEASH_API_KEY,
      },
      params: {
        blockchain,
        contract_address,
        time_range, // <-- dynamic based on frontend input
        offset: 0,
        limit: 30,
        sort_by: 'holders',
        sort_order: 'desc',
      },
    });

    res.json(response.data?.data?.[0] || {});
  } catch (error) {
    console.error('Error fetching holders data:', error.message);
    res.status(500).json({ error: 'Failed to fetch holders data' });
  }
});

// Proxy route for collection scores
app.get('/api/api/v2/nft/collection/scores', async (req, res) => {
  try {
    const { blockchain, contract_address, time_range, sort_by, sort_order } = req.query;

    const response = await axios.get('https://api.unleashnfts.com/api/v2/nft/collection/scores', {
      headers: {
        accept: 'application/json',
        'x-api-key': UNLEASH_API_KEY,
      },
      params: {
        blockchain,
        contract_address,
        time_range: time_range || '24h',
        offset: 0,
        limit: 1,
        sort_by: sort_by || 'marketcap',
        sort_order: sort_order || 'desc',
      },
    });

res.json({ data: response.data?.data || [] });
  } catch (error) {
    console.error('Error fetching collection scores:', error.message);
    res.status(500).json({ error: 'Failed to fetch scores data' });
  }
});

// Washtrade api call ke liye

app.get('/api/api/v2/nft/collection/washtrade', async (req, res) => {
  try {
    const { blockchain, contract_address } = req.query;

    const response = await axios.get('https://api.unleashnfts.com/api/v2/nft/collection/washtrade', {
      headers: {
        accept: 'application/json',
        'x-api-key': UNLEASH_API_KEY,
      },
      params: {
        blockchain,
        contract_address,
        time_range: '90d',
        offset: 0,
        limit: 30,
        sort_by: 'washtrade_assets',
        sort_order: 'desc',
      },
    });

    res.json(response.data?.data?.[0] || {});
  } catch (error) {
    console.error('Error fetching washtrade data:', error.message);
    res.status(500).json({ error: 'Failed to fetch washtrade data' });
  }
});

// Collections Whales

app.get('/api/api/v2/nft/collection/whales', async (req, res) => {
  try {
    const { blockchain, contract_address } = req.query;

    const response = await axios.get('https://api.unleashnfts.com/api/v2/nft/collection/whales', {
      headers: {
        accept: 'application/json',
        'x-api-key': UNLEASH_API_KEY,
      },
      params: {
        blockchain,
        contract_address,
        time_range: '24h',
        offset: 0,
        limit: 30,
        sort_by: 'nft_count',
        sort_order: 'desc',
      },
    });

    res.json(response.data?.data?.[0] || {});
  } catch (error) {
    console.error('Error fetching whale data:', error.message);
    res.status(500).json({ error: 'Failed to fetch whale data' });
  }
});


// Categories collection

app.get('/api/api/v2/nft/collection/categories', async (req, res) => {
  try {
    const response = await axios.get('https://api.unleashnfts.com/api/v2/nft/collection/categories', {
      headers: {
        accept: 'application/json',
        'x-api-key': UNLEASH_API_KEY,
      },
      params: {
        blockchain: 'ethereum',
        time_range: 'all',
        offset: 0,
        limit: 30,
        sort_by: 'volume',
        sort_order: 'desc',
      },
    });

    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching collection categories:', error.message);
    res.status(500).json({ error: 'Failed to fetch collection categories' });
  }
});

// 📈 Gemini Expert Insight Route

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

app.post('/api/gemini/insight', async (req, res) => {
  try {
    const { blockchain, contract_address, time_range = '24h' } = req.body;

    console.log('[🔍] Gemini Insight Requested');
    console.log('   📌 Blockchain:', blockchain);
    console.log('   🧾 Contract Address:', contract_address);
    console.log('   ⏳ Time Range:', time_range);

    const endpoints = ["analytics","profile", "holders", "scores", "washtrade", "whales"];
    const headers = {
      accept: 'application/json',
      'x-api-key': UNLEASH_API_KEY,
    };

    const fetchData = async (endpoint) => {
  const url = `https://api.unleashnfts.com/api/v2/nft/collection/${endpoint}`;

  let params = {
    blockchain,
    contract_address,
    offset: 0,
    limit: 30,
    sort_order: 'desc',
  };

  // Customize parameters per endpoint
  switch (endpoint) {
  case 'analytics':
    params = { ...params, time_range: time_range || 'all', sort_by: 'sales' };
    break;
  case 'profile':
    params = { ...params, time_range: time_range || 'all', sort_by: 'collection_score' };
    break;
  case 'holders':
    params = { ...params, time_range: time_range || 'all', sort_by: 'holders' };
    break;
  case 'scores':
    params = { ...params, time_range: time_range || 'all', sort_by: 'marketcap' };
    break;
  case 'washtrade':
    params = { ...params, time_range: time_range || '90d', sort_by: 'washtrade_assets' };
    break;
  case 'whales':
    params = { ...params, time_range: time_range || 'all', sort_by: 'nft_count' };
    break;
}


  try {
    const response = await axios.get(url, { headers, params });
    console.log(`   ✅ Fetched ${endpoint} data`);
    return response.data?.data?.[0] || {};
  } catch (error) {
    console.warn(`   ❌ Failed to fetch ${endpoint}:`, error.response?.data || error.message);
    return { error: `Could not fetch ${endpoint}` };
  }
};


    // Fetch all API data
    const allData = {};
    for (const endpoint of endpoints) {
      allData[endpoint] = await fetchData(endpoint);
      await sleep(1000); 
    }


    // Prepare Gemini prompt
    const today = new Date().toISOString().split('T')[0];

const geminiPrompt = `
📅 Date of Analysis: ${today}

You are a world-class NFT expert and trader. Based on the structured data below from an NFT collection, perform a comprehensive and modular analysis.

--- 📊 RAW DATA SOURCES ---

1. 📈 Analytics:
${JSON.stringify(allData.analytics, null, 2)}

2. 📇 Profile:
${JSON.stringify(allData.profile, null, 2)}

3. 👥 Holders:
${JSON.stringify(allData.holders, null, 2)}

4. 🧮 Scores:
${JSON.stringify(allData.scores, null, 2)}

5. 🚫 Wash Trading:
${JSON.stringify(allData.washtrade, null, 2)}

6. 🐋 Whale Activity:
${JSON.stringify(allData.whales, null, 2)}

--- 🔍 ANALYSIS TASK ---

Using the structured data above, deliver an expert-level NFT collection insight with the following breakdown. Each section should be strictly based on its corresponding data source.

### 🧠 Overall Insight
Use **all six data sources** to:
- Summarize the overall health, potential, and uniqueness of the NFT collection.
- Provide a 360° view combining trading, holder, risk, and metadata signals.

### 📈 Analytics-Based Insight (Use Dataset #1: Analytics)
- Analyze trading volume, transaction count, sales changes, floor price trends, and liquidity signals.
- Comment on short-term vs long-term activity and any anomalies.

### 📇 Profile-Based Insight (Use Dataset #2: Profile)
- Interpret metadata like launch date, verification, team info, Twitter/follower count, Discord presence, and links.
- Discuss branding strength, trustworthiness, and project maturity.

### 👥 Holder-Based Insight (Use Dataset #3: Holders)
- Assess distribution across wallets, whale concentration, and decentralization.
- Detect any red flags like a few wallets holding most supply.

### 🧮 Scores-Based Insight (Use Dataset #4: Scores)
- Review marketcap, average price, price ceiling/floor, and trend of these metrics.
- Interpret the meaning of scores in terms of market confidence and performance.

### 🚫 Wash Trading Insight (Use Dataset #5: Wash Trading)
- Identify if the collection shows signs of fake volume through repetitive trades or 0-profit loops.
- If wash trades are present, explain the magnitude and distortion caused.

### 🐋 Whale Activity Insight (Use Dataset #6: Whale Activity)
- Review how many whales exist, how dominant they are, and whether they’re buying or selling.
- Mention risk of price manipulation or signs of confidence depending on whale behavior.

### 🧠 Expert Summary & Final Verdict
- Give a concise recommendation based on the full analysis.
- Include actionable advice (e.g., safe to trade, wait-and-watch, high-risk, long-term hold).
- End with a one-liner (20–30 words) final verdict on the collection.

💡 Be objective, professional, and evidence-driven. Do not fabricate or assume missing information. Your insights must be grounded only in the data provided above.
`;



    // Send to Gemini
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const geminiRes = await axios.post(geminiURL, {
      contents: [
        {
          role: 'user',
          parts: [{ text: geminiPrompt }],
        },
      ],
    });

    const summary = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!summary) {
      console.warn('⚠️ Gemini returned no insight.');
      return res.status(200).json({ summary: 'No insight returned by Gemini.' });
    }

    console.log('✅ Gemini insight generated successfully.');
    console.log('📝 Gemini Summary:\n', summary);
    res.json({ summary });
  } catch (error) {
    console.error('🚨 Gemini Insight Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate insight' });
  }
});


// 🛡️ Generic Fallback Proxy
app.use('/api', async (req, res) => {
  try {
    const targetUrl = `https://api.unleashnfts.com${req.originalUrl.replace('/api', '')}`;

    const response = await axios({
      method: req.method,
      url: targetUrl,
      headers: {
        accept: 'application/json',
        'x-api-key': UNLEASH_API_KEY,
        'Content-Type': 'application/json',
      },
      params: req.query,
      data: req.body,
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Proxy error:', {
      message: error.message,
      response: error.response?.data || 'No response body',
    });

    const status = error.response?.status || 500;
    const errorMsg = error.response?.data || { error: 'Failed to fetch from UnleashNFTs API' };
    res.status(status).json(errorMsg);
  }
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 3001}`);
});
