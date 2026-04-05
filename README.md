# Liquid Glass Refraction Engine 1.2

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.2-orange.svg)
![React](https://img.shields.io/badge/React-18+-61DAFB.svg)

A high-fidelity, physically-inspired refraction rendering engine for the web. Built with SVG filters and a custom displacement map generator to simulate realistic glass thickness, bevels, and refractive indices in real-time.

## ✨ Features

- **Physical Refraction**: Simulates how light bends through glass based on its thickness and curvature.
- **Dynamic Bevels**: Customizable squircle-based rounding with smooth refraction transitions.
- **High Performance**: 60fps real-time rendering using hardware-accelerated SVG primitives.
- **Aesthetic Excellence**: Premium Apple-inspired design language with pill-shaped components and soft highlights.
- **Real-time Tuning**: Interactive control panel to adjust thickness, blur, refraction index, and specular highlights.

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/liquid-glass-filter-demo.git

# Install dependencies
npm install

# Run the development server
npm run dev
```

## 🛠️ Technology Stack

- **Framework**: React 18+ / Vite
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Styling**: Tailwind CSS
- **Core Engine**: Custom SVG Filter Pipeline + Canvas Displacement Bake

## 📖 How it Works

The engine operates on a three-stage pipeline:

1. **Bake Stage**: A custom displacement map is generated on a hidden canvas. It encodes refractive offsets into the Red and Green channels of an RGBA texture.
2. **Filter Stage**: The texture is passed to an SVG `<feDisplacementMap>` primitive, which distorts the blurred background content.
3. **Composite Stage**: Specular highlights, saturation adjustments, and inner glows are blended on top to create the final "Glass" look.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by the LiquidGlass Laboratory.
