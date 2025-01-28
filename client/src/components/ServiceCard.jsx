import React from 'react';

const ServiceCard = ({ image, name, description, price, onChoose }) => {
  return (
    <div className="flex flex-col items-center justify-between w-[420.667px] h-[400px] relative">
      {/* Image */}
      <div
        className="w-[300.667px] h-[500.667px] bg-cover bg-no-repeat rounded-[200.333px]"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
      {/* Title */}
      <span className="font-['Newsreader'] text-[16px] font-bold leading-[20px] text-[#000] text-center mt-4">
        {name}
      </span>
      {/* Description */}
      <span className="font-['Newsreader'] text-[16px] font-light leading-[20px] text-[#000] text-center ">
       {description} <br></br>
      </span>
      {/* Price */}
      <span className="font-['Inter'] text-[16px] font-normal leading-[19px] text-[#000] mt-2">
        {price} $
      </span>
      {/* Choose Button */}
      <button
        className="w-[169.333px] h-[44px] bg-[#f7f5f4] rounded-[162.667px] border-solid border-[1.333px] border-[#000] mt-4"
        onClick={onChoose}
      >
        <span className="font-['Lato'] text-[20px] font-normal leading-[24px] text-[#000]">
          Choose
        </span>
      </button>
    </div>
  );
};

export default ServiceCard;
