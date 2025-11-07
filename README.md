# CloudOptimize AI Dashboard

AI-powered cloud storage optimization dashboard with real-time monitoring and performance analytics.

## ✨ Features

- 📊 **Real-time Metrics**: Monitor storage, costs, requests, and latency
- 🌩️ **Multi-Provider Support**: AWS S3, Google Cloud Storage, Azure Blob, DigitalOcean Spaces
- 📈 **Performance Analytics**: Track provider performance and reliability
- 🎨 **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- 🌙 **Dark Mode**: Full dark mode support
- ⚡ **Fast**: Built with Vite for lightning-fast development

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/danyasreens05-web/cloud-optimize-ai-dashboard.git
cd cloud-optimize-ai-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will start at `http://localhost:5173`

## 📦 Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Charts**: Recharts (ready to add)

## 📁 Project Structure

```
cloud-optimize-ai-dashboard/
├── src/
│   ├── api/
│   │   └── cloudStorageClient.js   # API client for cloud providers
│   ├── components/
│   │   └── ui/
│   │       └── card.jsx             # Reusable Card component
│   ├── pages/
│   │   ├── layout.jsx               # Main layout with sidebar
│   │   └── Dashboard.jsx            # Dashboard page
│   ├── App.jsx                      # App component with routing
│   ├── main.jsx                     # Entry point
│   ├── index.css                    # Global styles
│   └── utils.js                     # Utility functions
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🛠️ Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Features Implemented

- ✅ Responsive sidebar navigation
- ✅ Dashboard with metrics cards
- ✅ Cloud providers table with status indicators
- ✅ Mock API client for development
- ✅ Dark mode support
- ✅ Tailwind CSS styling
- ✅ React Router navigation

## 🔜 Upcoming Features

- [ ] Real-time latency charts
- [ ] Cost breakdown visualizations
- [ ] Provider comparison analytics
- [ ] API integration with actual cloud providers
- [ ] Export reports functionality
- [ ] Notifications and alerts

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📄 License

MIT License - feel free to use this project for learning and development.

## 👤 Author

**danyasreens05-web**
- GitHub: [@danyasreens05-web](https://github.com/danyasreens05-web)

---

Built with ❤️ using React and Tailwind CSS
