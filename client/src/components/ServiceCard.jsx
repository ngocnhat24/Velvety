import React from 'react';

const ServiceCard = ({ image, name, description, price, onChoose }) => {
  return (
    <div className="flex flex-col items-center justify-between w-[300px] h-[400px] relative font-['Lato'] bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      {/* Image */}
      <div
        className="w-[200px] h-[200px] bg-cover bg-no-repeat rounded-full"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
      {/* Title */}
      <span className="text-[18px] font-bold leading-[20px] text-[#AB152A] text-center mt-4">
        {name}
      </span>
      {/* Description */}
      <span className="text-[14px] font-light leading-[20px] text-[#000] text-center">
        {description} <br></br>
      </span>
      {/* Price */}
      <span className="text-[16px] font-normal leading-[19px] text-[#000] mt-2">
        {price} VNĐ
      </span>
      {/* Choose Button */}
      <button
        className="w-[169px] h-[44px] bg-[#ffc0cb] rounded-full border-solid border-[1.333px] flex items-center justify-center hover:bg-[#ff8a8a] transition duration-300 mt-[10px]"
        onClick={onChoose}
      >
        <span className="text-[20px] font-bold leading-[24px] text-[#C54759]">
          Choose
        </span>
      </button>
    </div>
  );
};

export default ServiceCard;
