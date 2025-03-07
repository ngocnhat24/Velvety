import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="main-container w-full h-auto bg-[#f9faef] relative mx-auto my-0">
      <Navbar />
      <div className="w-full h-[50vh] bg-[url(/images/about_1.png)] bg-cover bg-no-repeat relative z-[1] "
        style={{
          backgroundAttachment: "fixed"
        }}
      >
        <span className="flex w-full h-auto justify-center items-start pacifico-regular text-[10vw] font-bold leading-[220px] font-outline-2 -smooth text-[#ffffff] tracking-[-2.23px] absolute top-[20%] left-[50%] transform -translate-x-1/2 text-center whitespace-nowrap z-[1]">
          Our Story
        </span>
      </div>
      <div className="w-[1490.387px] h-[562.21px] font-['Libre_Franklin'] text-[20px] font-bold leading-[43px] tracking-[1px] relative text-center z-[8] mt-[40px] text-center mx-auto">
        <span className="font-['Lato'] text-[30px] font-normal leading-[57.282px] text-[#000] tracking-[1px] relative text-center  mx-auto">
          <span className="text-[50px]">S</span>ince our founding in 1973, Velvety has had one goal – To create
          safe, effective skin treatments that produce visible results… at a
          reasonable price.
          <br />
          <br />
          <span className="text-[50px]">G</span>
          reat {" "}
        </span>
        <span className="font-['Lato'] text-[30px] font-normal leading-[57.282px] text-[#c86c79] tracking-[1px] relative text-center  ">
          natural skin care {" "}
        </span>
        <span className="font-['Lato'] text-[30px] font-normal leading-[57.282px] text-[#000] tracking-[1px] relative text-center  ">
          that’s affordable and works! that’s why generations of {" "}
        </span>
        <span className="font-['Lato'] text-[30px] font-normal leading-[57.282px] text-[#000] tracking-[1px] relative text-center  ">

        </span>
        <span className="font-['Lato'] text-[30px] font-normal leading-[57.282px] text-[#c86c79] tracking-[1px] relative text-center  ">
          skin care enthusiasts {" "}
        </span>
        <span className="font-['Lato'] text-[30px] font-normal leading-[57.282px] text-[#000] tracking-[1px] relative text-center ">
          have fallen in love with our skin care over the last five decades. it
          makes us smile when we hear from families who are using our products
          –  grandmothers, daughters, and grand daughters too. {" "}
        </span>
      </div>
      <span className="flex w-[10%] h-[30px] justify-center items-center font-['Lato'] text-[2vw] font-normal leading-[30px] text-[#000] tracking-[1.43px] relative text-center  whitespace-nowrap z-[9] mx-auto">
        -------------
      </span>
      <div className="w-full max-w-[1500px] h-[937.456px] relative mx-auto my-0 overflow-hidden">
        <div className="w-[840.663px] h-[224px] font-['Libre_Franklin'] text-[18px] font-normal leading-[31.823px] tracking-[0.8px] absolute top-0 left-[2.647px] text-left z-10">
          <span className="font-['Lato'] text-[18px] font-light leading-[31.823px] text-[#000] tracking-[0.8px] relative text-left ">
            <span className="text-[50px]">T</span>
            hroughout its history Velvety has been a unique skin care
            brand. from its inception, {" "}
          </span>
          <span className="font-['Lato'] text-[18px] font-light leading-[31.823px] text-[#000] tracking-[0.8px] relative text-left  underline">
            Stephen Strassler  {" "}
          </span>
          <span className="font-['Lato'] text-[18px] font-light leading-[31.823px] text-[#000] tracking-[0.8px] relative text-left ">
            and {" "}
          </span>
          <span className="font-['Lato'] text-[18px] font-light leading-[31.823px] text-[#000] tracking-[0.8px] relative text-left  underline">
            Judith Strassler {" "}
          </span>
          <span className="font-['Lato'] text-[18px] font-light leading-[31.823px] text-[#000] tracking-[0.8px] relative text-left ">
            – our founders – were resolute that Velvety would do {" "}
          </span>
          <span className="font-['Lato'] text-[18px] font-light leading-[31.823px] text-[#000] tracking-[0.8px] relative text-left  underline">
            Natural  {" "}
          </span>
          <span className="font-['Lato'] text-[18px] font-light leading-[31.823px] text-[#000] tracking-[0.8px] relative text-left ">
            skin care better. under their guidance Velvety established itself
            within the emerging skin-salon market, creating skin care
            professionals desired, and almost single-handedly ushered skin care
            into the health food industry. {" "}
          </span>
        </div>

        <span className="flex w-[630px] h-[256px] justify-start items-center font-['Lato'] text-[18px] font-light leading-[31.823px] text-[#000] tracking-[0.8px] absolute top-0 left-[868.506px] text-left  z-[11]">
          But within our walls, visitors quickly discover our ”family” also
          includes other families who have worked here for so long that
          generations spanning mothers and daughters, aunts, nieces, nephews,
          and cousins now work side by side. but what we’re most amazed by and
          proud of is the acknowledgement we hear from our customers that Velvety
          now extends within their families too. mothers have been sharing their
          “secret for beautiful skin” with their daughters, and now with their
          granddaughters as well. {" "}
        </span>
        <div className="w-[804.862px] h-[692.155px] bg-[url(/images/about_2.png)] bg-cover bg-no-repeat absolute top-[245.302px] left-0 z-[23]">
          <div className="w-[648.398px] h-[637.79px] relative overflow-hidden z-[22] mt-0 mr-0 mb-0 ml-[78.233px]" />
        </div>
        <span className="flex w-[600px] h-[115.359px] justify-start items-center font-['Lato'] text-[18px] font-light leading-[31.823px] text-[#000] tracking-[0.8px] absolute top-[278.445px] left-[90px] text-left  z-[17]">
          It’s almost overwhelming for “us” to recognize Velvety has become
          a natural brand trusted and shared from one generation to the next. {" "}
        </span>
        <div className="w-[600px] h-[160px] font-['Libre_Franklin'] text-[18px] font-light leading-[31.823px] tracking-[0.8px] absolute top-[417.676px] left-[868.506px] text-left z-[18]">
          <span className="font-['Lato'] text-[18px] font-light leading-[31.823px] text-[#000] tracking-[0.8px] relative text-left ">
            It’s almost overwhelming for “us” to recognize  {" "}
          </span>
          <span className="font-['Lato'] text-[18px] font-light leading-[31.823px] text-[#000] tracking-[0.8px] relative text-left  underline">
            Velvety {" "}
          </span>
          <span className="font-['Lato'] text-[18px] font-light leading-[31.823px] text-[#000] tracking-[0.8px] relative text-left ">
            has become a natural brand trusted and shared from one generation
            to the next. but Stephen’s dream found him planting the seed – four
            and half decades ago – that has since blossomed into a brand loved
            and trusted across generations and around the world. {" "}
          </span>
        </div>
        <span className="flex h-[36px] justify-start items-center font-['Lato'] text-[22.541440963745117px] font-medium leading-[36px] text-[#000] tracking-[0.9px] absolute top-[615.245px] left-[868.506px] text-left  whitespace-nowrap z-[12]">
          We’re continuing to develop great natural skin care {" "}
        </span>
        <div className="w-[600px] h-[224px] font-['Libre_Franklin'] text-[18px] font-light leading-[31.823px] tracking-[0.8px] absolute top-[690.828px] left-[868.506px] text-left z-[19]">
          <span className="font-['Lato'] text-[18px] font-light leading-[31.823px] text-[#000] tracking-[0.8px] relative text-left ">
            Velvety has been creating superior natural skin care for nearly
            half a century – and we’re just getting started. as we enter our
            46th year, we’ve renewed our commitment to being a leader in the
            natural skin care industry, and we’ll continue to keep Stephen’s
            vision growing by creating unsurpassed natural skin care he’d be
            proud of – and that our customers love. and for the next decades
            Velvety will work to be  {" "}
          </span>
          <span className="font-['Lato'] text-[18px] font-light leading-[31.823px] text-[#c86c79] tracking-[0.8px] relative text-left ">
            The Natural Skin Care Authority {" "}
          </span>
          <span className="font-['Lato'] text-[18px] font-light leading-[31.823px] text-[#c86c79] tracking-[0.8px] relative text-left ">
            ®
          </span>
          <span className="font-['Lato'] text-[18px] font-light leading-[31.823px] text-[#000] tracking-[0.8px] relative text-left ">
            {" "}
            for generations to come. {" "}
          </span>
        </div>
      </div>
      <span className="block h-[27px] font-['Lato'] text-[22.541440963745117px] font-normal leading-[27px] text-[#000] relative text-left whitespace-nowrap z-[24] mt-[13.26px] mr-0 mb-0 ml-[217.455px]">
        Stephen Strassler applying Velvety skin care to a model {" "}
      </span>
      <div className="flex w-[600px] h-[80.884px] justify-between items-center relative z-[21] mt-[0.84px] mr- mb-auto ml-[900px]">
        <span className="flex w-[600px] h-[64px] justify-start items-center shrink-0 font-['Lato'] text-[18px] font-light leading-[31.823px] text-[#000] tracking-[0.8px] relative text-left  z-[21]">
          Velvety has been creating superior natural skin care for nearly
          <br></br>half a century – and we’re just getting started. {" "}
        </span>
      </div>
      <div className="flex w-full max-w-[1085px] h-[37.33px] justify-between items-center relative z-[14] mt-[58.341px] mx-auto">
        <span className="h-[36px] shrink-0 font-['Lato'] text-[22.5px] font-medium leading-[36px] text-[#000] tracking-[0.9px] relative text-left  whitespace-nowrap z-[13]">
          Velvety’s skin care spans generations {" "}
        </span>
        <span className="h-[36px] shrink-0 font-['Lato'] text-[22.5px] font-medium leading-[36px] text-[#000] tracking-[0.9px] relative text-left  whitespace-nowrap z-[14]">
          Get to know us {" "}
        </span>
      </div>

      <div className="w-full max-w-[1499px] h-[192px] relative z-[25] mt-[13.063px] mx-auto">
        <div className="w-full max-w-[803px] h-[192px] font-['Libre_Franklin'] text-[18px] font-light leading-[31.823px] tracking-[0.8px] absolute top-0 left-0 text-left z-20">
          <span className="font-['Lato'] text-[18px] font-light leading-[31.823px] text-[#000] tracking-[0.8px] relative text-left ">
            Velvety has become a multi-generational natural skin care line in many ways. {" "}
          </span>
          <span className="font-['Lato'] text-[18px] font-light leading-[31.823px] text-[#c86c79] tracking-[0.8px] relative text-left ">
            Stephen Strassler {" "}
          </span>
          <span className="font-['Lato'] text-[18px] font-light leading-[31.823px] text-[#000] tracking-[0.8px] relative text-left ">
            passed away in late 2016 leaving the company in the capable hands of his wife Judy – who has trusted its stewardship to a talented team – Velvety’s newest generation of leadership. sadly, Velvety lost {" "}
          </span>
          <span className="font-['Lato'] text-[18px] font-light leading-[31.823px] text-[#c86c79] tracking-[0.8px] relative text-left ">
            Judith Strassler {" "}
          </span>
          <span className="font-['Lato'] text-[18px] font-light leading-[31.823px] text-[#000] tracking-[0.8px] relative text-left ">
            in early 2020 and so Velvety is held in a family trust. {" "}
          </span>
        </div>
        <div className="w-full max-w-[632px] h-[160px] font-['Libre_Franklin'] text-[18px] font-medium leading-[31.823px] tracking-[0.8px] absolute top-0 left-[867px] text-left z-[25] px-4">
          <span className="font-['Lato'] text-[18px] font-[250] leading-[31.823px] text-[#000] tracking-[0.8px] relative text-left ">
            Get to know the new Velvety – the natural skin care authority.
            Call your sales rep, visit our website, or reach out to us on social media. or if all else fails, contact Velvety for more information: call 800.257.7774 or visit {" "}
          </span>
          <span className="font-['Lato'] text-[18px] font-[250] leading-[31.823px] text-[#ffc0cb] tracking-[0.8px] relative text-left ">
          </span>
          <span className="font-['Lato'] text-[18px] font-[250] leading-[31.823px] text-[#ffc0cb] tracking-[0.8px] relative text-left  underline">
            velvety.com
          </span>
          <span className="font-['Lato'] text-[18px] font-[250] leading-[31.823px] text-[#000] tracking-[0.8px] relative text-left ">
            .
          </span>
        </div>
        {/* Booking Now Button */}
        <button
          onClick={() => navigate('/services')}
          className="fixed bottom-4 right-4 px-6 py-3 bg-green-500 text-white rounded-full shadow-lg transition transform focus:outline-none focus:ring-4 focus:ring-green-300 pacifico-regular"
          style={{
            background: 'linear-gradient(135deg, #6B8E23, #32CD32)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease-in-out',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #32CD32, #6B8E23)';
            e.currentTarget.style.transform = 'scale(1.1) rotate(3deg)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #6B8E23, #32CD32)';
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
          }}
        >
          Book Now
        </button>
      </div>
      <Footer />
    </div>

  );
}


