const products = [
  {
    name: "Wireless Earbuds",
    description:
      "High-quality Bluetooth wireless earbuds with noise-cancelling technology.",
    price: 49.99,
    countInStock: 150,
    imageURL:
      "https://img.freepik.com/free-photo/wireless-earbuds-with-neon-cyberpunk-style-lighting_23-2151074246.jpg?ga=GA1.1.1648891514.1708859492&semt=ais_hybrid",
  },
  {
    name: "Smart Watch",
    description:
      "Water-resistant smartwatch with heart-rate monitor and GPS tracking.",
    price: 99.99,
    countInStock: 80,
    imageURL:
      "https://img.freepik.com/free-photo/rendering-smart-home-device_23-2151039302.jpg?ga=GA1.1.1648891514.1708859492&semt=ais_hybrid",
  },
  {
    name: "4K Ultra HD TV",
    description: "55-inch 4K Ultra HD smart TV with HDR and voice control.",
    price: 499.99,
    countInStock: 30,
    imageURL:
      "https://img.freepik.com/free-photo/view-computer-monitor-display_23-2150757537.jpg?ga=GA1.1.1648891514.1708859492&semt=ais_hybrid",
  },
  {
    name: "Gaming Laptop",
    description:
      "Powerful gaming laptop with Intel i7 processor and NVIDIA GTX 1660 Ti graphics.",
    price: 1099.99,
    countInStock: 25,
    imageURL:
      "https://img.freepik.com/premium-photo/laptop-with-video-game-screen-fire-screen_1277297-29001.jpg?ga=GA1.1.1648891514.1708859492&semt=ais_hybrid",
  },
  {
    name: "Wireless Mouse",
    description:
      "Ergonomic wireless mouse with adjustable DPI and programmable buttons.",
    price: 29.99,
    countInStock: 200,
    imageURL:
      "https://img.freepik.com/free-photo/purple-computer-mouse_1260-12.jpg?ga=GA1.1.1648891514.1708859492&semt=ais_hybrid",
  },
  {
    name: "Mechanical Keyboard",
    description:
      "RGB backlit mechanical keyboard with Cherry MX Blue switches.",
    price: 89.99,
    countInStock: 100,
    imageURL:
      "https://img.freepik.com/free-photo/blue-keyboard-with-lights-high-angle_23-2149680222.jpg?ga=GA1.1.1648891514.1708859492&semt=ais_hybrid",
  },
  {
    name: "iPhone 13 pro",
    description:
      "Latest model smartphone with 5G connectivity and a 108MP camera.",
    price: 799.99,
    countInStock: 50,
    imageURL:
      "https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437088.jpg?ga=GA1.1.1648891514.1708859492&semt=ais_hybrid",
  },
  {
    name: "Portable Bluetooth Speaker",
    description:
      "Compact Bluetooth speaker with 12-hour battery life and waterproof design.",
    price: 59.99,
    countInStock: 120,
    imageURL:
      "https://img.freepik.com/free-photo/view-horizontal-bluetooth-speaker-with-simple-minimal-modern-design_23-2150807997.jpg?ga=GA1.1.1648891514.1708859492&semt=ais_hybrid",
  },
  {
    name: "Drone with 4K Camera",
    description:
      "High-performance drone with 4K camera, GPS, and automated flight modes.",
    price: 299.99,
    countInStock: 40,
    imageURL:
      "https://img.freepik.com/premium-photo/black-drone-with-orange-black-wings-sits-grey-surface-generate-ai-image_594430-7503.jpg?ga=GA1.1.1648891514.1708859492&semt=ais_hybrid",
  },
  {
    name: "Fitness Tracker",
    description:
      "Waterproof fitness tracker with heart-rate monitor and sleep tracking.",
    price: 39.99,
    countInStock: 170,
    imageURL:
      "https://img.freepik.com/free-vector/realistic-design-fitness-trackers_23-2148509775.jpg?ga=GA1.1.1648891514.1708859492&semt=ais_hybrid",
  },

  {
    name: "iPad Pro 2020",
    description:
      "This is the newest generation of iPad pro with the latest and the fastest chipset ever produced, M1 Ultra based on 3nm technology.",
    price: 1399,
    quantity: 15,
    imageURL:
      "https://img.freepik.com/free-psd/ipad-pro-mockup_1332-60665.jpg?ga=GA1.1.1648891514.1708859492&semt=ais_hybrid",
  },

  {
    name: "Bluetooth Headphones",
    description:
      "Over-ear Bluetooth headphones with deep bass and long battery life.",
    price: 89.99,
    countInStock: 75,
    imageURL:
      "https://img.freepik.com/free-photo/black-headphones-digital-device_53876-97302.jpg?ga=GA1.1.1648891514.1708859492&semt=ais_hybrid", // Empty image URL
  },
  {
    name: "Gaming Monitor",
    description:
      "27-inch gaming monitor with 144Hz refresh rate and 1ms response time.",
    price: 299.99,
    countInStock: 20,
    imageURL:
      "https://img.freepik.com/free-photo/view-computer-video-display-monitor_23-2150757345.jpg?ga=GA1.1.1648891514.1708859492&semt=ais_hybrid", // Empty image URL
  },
  {
    name: "Action Camera",
    description: "Compact action camera with 4K video and waterproof casing.",
    price: 199.99,
    countInStock: 60,
    imageURL:
      "https://img.freepik.com/free-photo/top-view-photo-camera-still-life_23-2150630667.jpg?ga=GA1.1.1648891514.1708859492&semt=ais_hybrid", // Empty image URL
  },
  {
    name: "Smart Home Hub",
    description:
      "Central hub for controlling smart home devices with voice commands.",
    price: 129.99,
    countInStock: 40,
    imageURL:
      "https://img.freepik.com/free-photo/devices-arrangement-desk_23-2148994217.jpg?ga=GA1.1.1648891514.1708859492&semt=ais_hybrid", // Empty image URL
  },
  {
    name: "Portable SSD",
    description: "Fast and compact portable SSD with 1TB storage capacity.",
    price: 129.99,
    countInStock: 85,
    imageURL:
      "https://img.freepik.com/free-photo/man-using-external-storage-used_23-2149388499.jpg?ga=GA1.1.1648891514.1708859492&semt=ais_hybrid", // Empty image URL
  },
  {
    name: "Wireless Charging Pad",
    description:
      "Qi-certified wireless charging pad for quick charging of smartphones.",
    price: 29.99,
    countInStock: 100,
    imageURL:
      "https://img.freepik.com/free-photo/wireless-charger-digital-device_53876-97322.jpg?ga=GA1.1.1648891514.1708859492&semt=ais_hybrid", // Empty image URL
  },
  {
    name: "Smart Light",
    description: "Wi-Fi-enabled smart light that can be controlled remotely.",
    price: 19.99,
    countInStock: 200,
    imageURL:
      "https://img.freepik.com/free-photo/side-view-hand-with-smartphone-smart-light_23-2150671605.jpg?ga=GA1.1.1648891514.1708859492&semt=ais_hybrid", // Empty image URL
  },
  {
    name: "Electric Kettle",
    description: "Fast-boiling electric kettle with temperature control.",
    price: 49.99,
    countInStock: 90,
    imageURL:
      "https://img.freepik.com/free-photo/electric-kettle-dark-background_23-2148728729.jpg?ga=GA1.1.1648891514.1708859492&semt=ais_hybrid", // Empty image URL
  },
  {
    name: "Smart Thermostat",
    description: "Programmable smart thermostat with energy-saving features.",
    price: 199.99,
    countInStock: 30,
    imageURL:
      "https://img.freepik.com/free-photo/smart-device-that-controls-house-s-warmth_60438-3625.jpg?ga=GA1.1.1648891514.1708859492&semt=ais_hybrid", // Empty image URL
  },
  {
    name: "Apple Vision Pro",
    description: "Immersive VR headset for gaming and entertainment by Apple.",
    price: 2999.99,
    countInStock: 50,
    imageURL:
      "https://img.freepik.com/free-photo/high-tech-futuristic-gaming-virtual-reality-headset_23-2151133169.jpg?ga=GA1.1.1648891514.1708859492&semt=ais_hybrid", // Empty image URL
  },
];
module.exports = products;
