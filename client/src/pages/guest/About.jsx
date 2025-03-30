import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia } from "@mui/material";

export default function About() {
  const [popularServices, setServices] = useState([]);
  const [consultants, setConsultants] = useState([]); // State for consultants
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch popular services
    axios
      .get("/api/services/")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });

    // Fetch consultants
    axios
      .get("/api/consultants/")
      .then((response) => {
        setConsultants(response.data);
      })
      .catch((error) => {
        console.error("Error fetching consultants:", error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const consultantSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box sx={{ bgcolor: "#f9faef" }}>
      <Navbar />
      <Box
        sx={{
          width: "100%",
          height: "50vh",
          backgroundImage: "url(/images/about_1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundAttachment: "fixed",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            position: "absolute",
            fontFamily: "'Pacifico', cursive", // Pacifico font
            fontSize: "90px", // text-[90px]
            WebkitFontSmoothing: "antialiased", // smooth text
            MozOsxFontSmoothing: "grayscale",
          }}
        >
          Our Story
        </Typography>
      </Box>

      <Container sx={{ textAlign: "center", py: 5 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Since our founding in 1973, Velvety has had one goal – To create safe, effective skin treatments that produce visible results… at a reasonable price.
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Great <span style={{ color: "#c86c79" }}>natural skin care</span> that’s affordable and works!
        </Typography>
      </Container>

      <Container>
        <Slider {...settings}>
          {popularServices.map((service, index) => (
            <Box key={index} sx={{ p: 2, textAlign: "center" }}>
              <img src={service.image} alt={service.name} style={{ width: "100%", borderRadius: "10px" }} />
              <Typography variant="h6" sx={{ mt: 2 }}>{service.name}</Typography>
            </Box>
          ))}
        </Slider>
      </Container>

      <Container sx={{ textAlign: "center", py: 5 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Velvety’s skin care spans generations
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Get to know us and experience our legacy of quality natural skincare.
        </Typography>
      </Container>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative flex flex-row items-center justify-center py-10"
      >
        {/* Nội dung bên trái */}
        <div className="flex flex-col items-start max-w-[550px] text-left mr-6">
          <motion.span
            className="text-3xl font-semibold text-gray-900 leading-snug"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            But within our walls, visitors quickly discover our "family" also includes other families who have worked here for so long...
          </motion.span>

          <motion.span
            className="text-xl text-gray-700 mt-2 leading-snug"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            It’s almost overwhelming for "us" to recognize Velvety has become a natural brand trusted and shared from one generation to the next.
          </motion.span>
        </div>

        {/* Hình ảnh bên phải */}
        <motion.div
          className="w-[420px] h-[370px] bg-cover bg-no-repeat rounded-lg shadow-lg"
          style={{ backgroundImage: "url(/images/about_2.png)" }}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        ></motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="w-full max-w-[1499px] flex justify-between items-start mx-auto px-6 space-x-10"
      >
        {/* Đoạn văn bản bên trái */}
        <div className="max-w-[803px] text-left text-[18px] font-light leading-[32px] tracking-[0.8px] text-gray-900">
          <span>
            Velvety has become a multi-generational natural skin care line in many ways.{" "}
          </span>
          <span className="text-[#c86c79] font-medium">Stephen Strassler{" "}</span>
          <span>
            passed away in late 2016 leaving the company in the capable hands of his wife Judy – who has trusted its stewardship to a talented team – Velvety’s newest generation of leadership. Sadly, Velvety lost{" "}
          </span>
          <span className="text-[#c86c79] font-medium">Judith Strassler{" "}</span>
          <span>in early 2020 and so Velvety is held in a family trust.</span>
        </div>

        {/* Đoạn văn bản bên phải */}
        <div className="max-w-[500px] text-left text-[18px] font-medium leading-[32px] tracking-[0.8px] text-gray-900">
          <span>
            Get to know the new Velvety – the natural skin care authority.
            Call your sales rep, visit our website, or reach out to us on social media. If all else fails, contact Velvety for more information: call{" "}
          </span>
          <span className="text-[#c86c79] font-semibold">800.257.7774</span>
          <span>{" "}or visit{" "}</span>
          <span className="text-[#ffc0cb] underline">velvety.com</span>.
        </div>
      </motion.div>


      <div className="flex flex-col items-center justify-center bg-gray-100 text-gray-900 py-20 mt-10 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl text-center mx-auto p-6"
        >
          <motion.h1
            className="text-5xl font-extrabold text-green-700 mb-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            About Us
          </motion.h1>

          <motion.p
            className="text-xl text-gray-800 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            We are committed to providing top-notch services to our customers.
            Our team of experts ensures quality and reliability in every project we undertake.
            Join us on our journey to excellence.
          </motion.p>

          <motion.div
            className="mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <button
              className="px-6 py-3 bg-green-600 text-white rounded-full text-lg font-semibold shadow-lg 
               hover:bg-green-700 transition duration-300"
              onClick={() => navigate("/services")}
            >
              Explore Our Services
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Booking Now Button */}
      <div className="fixed bottom-4 right-4">
        {/* Ping effect */}
        <span className="absolute -inset-1 inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>

        {/* Animated Button */}
        <motion.button
          onClick={() => navigate("/services")}
          className="relative px-6 py-3 text-white rounded-full shadow-lg pacifico-regular focus:outline-none focus:ring-4 focus:ring-green-300"
          style={{
            background: "linear-gradient(135deg, #6B8E23, #32CD32)",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          }}
          animate={{
            y: [0, -5, 5, -5, 0], // Floating animation
            transition: {
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)" }}
          whileTap={{ scale: 0.95 }}
        >
          Book Now
        </motion.button>
      </div>

      {/* New section for consultants */}
      <Box sx={{ bgcolor: "#f9faef" }}>
        <Container sx={{ py: 5, textAlign: "center" }}>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Meet Our Consultants
          </Typography>
          <Slider {...consultantSettings}>
            {consultants.map((consultant) => (
              <Box key={consultant._id} sx={{ px: 2, textAlign: "center", position: "relative" }}>
                <Card sx={{ maxWidth: 240, mx: "auto", minHeight: 320, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <CardMedia
                    component="img"
                    image={consultant.image || "/images/default-avatar.png"}
                    alt={consultant.firstName}
                    sx={{
                      height: 250, // Đảm bảo chiều cao đồng đều
                      objectFit: "cover", // Tránh méo ảnh
                      borderRadius: "10px",
                    }}
                  />
                  <CardContent sx={{ textAlign: "center", minHeight: 70 }}> {/* Canh giữa nội dung */}
                    <Typography variant="h6" fontWeight={600}>
                      {consultant.firstName} {consultant.lastName}
                    </Typography>
                  </CardContent>
                </Card>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    bgcolor: "rgba(0, 0, 0, 0.7)",
                    color: "#fff",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    opacity: 0,
                    transition: "opacity 0.3s ease-in-out",
                    pointerEvents: "none",
                  }}
                  className="consultant-info"
                >
                  <Typography variant="body2">
                    {consultant.note || "No additional information available."}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Slider>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
