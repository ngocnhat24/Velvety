import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-[#f7f5f4] py-5 px-2.5 mt-5" style={{ boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.1)" }}>

      {/* Tiêu đề chính */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-normal tracking-tight">Let's Stay Social</h2>
      </div>

      {/* Mạng xã hội */}
      <div className="flex justify-center space-x-6 mb-8">
        <div className="w-10 h-10 bg-[url(@/assets/images/facebook-temp.png)] bg-cover"></div>
        <div className="w-10 h-10 bg-[url(@/assets/images/instagram-temp.png)] bg-cover"></div>
        <div className="w-10 h-10 bg-[url(@/assets/images/twitter-temp.png)] bg-cover"></div>
        <div className="w-10 h-10 bg-[url(@/assets/images/youtube-temp.png)] bg-cover"></div>
      </div>

      {/* Grid 4 cột */}
      <div className="max-w-6xl mx-auto grid grid-cols-4 gap-10 text-center">
        {/* Cột Extras */}
        <div>
          <h3 className="text-xl font-bold">Extras</h3>
          <ul className="mt-2 space-y-1">
            <li>Store Locator</li>
            <li>Events</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Cột About */}
        <div>
          <h3 className="text-xl font-bold">About</h3>
          <ul className="mt-2 space-y-1">
            <li>Our Story</li>
            <li>Our People</li>
            <li>Our News</li>
            <li>Mentions</li>
          </ul>
        </div>

        {/* Cột Results */}
        <div>
          <h3 className="text-xl font-bold">Results</h3>
          <ul className="mt-2 space-y-1">
            <li>Testimonials</li>
            <li>Nature + Science</li>
            <li>Skincare Trusted</li>
            <li>For Generations</li>
          </ul>
        </div>

        {/* Cột What's New */}
        <div>
          <h3 className="text-xl font-bold">What's New</h3>
          <ul className="mt-2 space-y-1">
            <li>2024 Catalog</li>
            <li>Reviva's Reward Points</li>
            <li>Reviva's Newest Products</li>
          </ul>
        </div>
      </div>

      {/* Chia cắt bằng đường line */}
      <div className="w-full max-w-6xl mx-auto h-px bg-gray-300 my-8"></div>

      {/* Thông tin dưới cùng */}
      <div className="max-w-6xl mx-auto text-center text-gray-700">
        <p>No Parabens, Phthalates, Sulfates, Mineral Oil, Petroleum, or Other Harmful Ingredients - We Promise!</p>
        <p className="mt-4 text-lg">
          © 2025 <span className="font-bold">Velvety</span> - The Natural Skin Care Authority®
        </p>
        <p className="mt-2">1788 South Metro Pkwy | Dayton, Ohio 45459 | Toll-Free: 800.257.7774 | Phone: 856.428.3885</p>
      </div>
    </div>
  )
}

export default Footer;