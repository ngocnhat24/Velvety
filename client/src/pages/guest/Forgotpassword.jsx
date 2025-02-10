export default function Forgotpassword() {

    return (
        <div className="main-container w-full h-screen bg-transparent relative mx-auto">
  {/* Header */}
  <div className="w-full h-[121px] bg-[#c86c79] relative z-10">
    <div className="absolute top-[21px] left-[246px] w-[207px] h-[72px] bg-[url(@/assets/images/logo.png)] bg-cover bg-no-repeat" />
    <nav className="flex justify-end items-center h-full pr-[50px] space-x-8 text-[26px] font-black text-[#ffc0cb]">
      <a href="/" className="hover:underline">About</a>
      <a href="/service" className="hover:underline">Services</a>
      <a href="/blog" className="hover:underline">Blog</a>
    </nav>
  </div>

  {/* Background */}
  <div className="absolute inset-0 z-0 bg-[#f9faef]" />
  <div className="absolute top-[121px] left-0 w-full h-[calc(100%-121px)] bg-[url(@/assets/images/forgot-password.png)] bg-cover bg-no-repeat z-1" />
      
  {/* Forgot Password Card */}
  <div className="absolute top-[165px] left-[145px] w-[475px] h-auto bg-[#ffc0cb] bg-opacity-50 rounded-xl shadow-md z-20 p-10">
    <h2 className="text-center text-[34px] font-bold text-[#000] uppercase mb-[40px]">
      Forgot Password
    </h2>

    {/* Input Field */}
    <div>
      <label className="font-bold text-[26px]">Email</label>
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full h-[60px] px-4 border border-black rounded-full mt-4"
      />
    </div>

    {/* Reset Password Button */}
    <div className="flex justify-center mt-[40px]">
      <button className="w-[335px] h-[60px] bg-white text-black text-[26px] font-bold rounded-full shadow hover:bg-gray-100">
        Reset Password
      </button>
    </div>

    {/* Footer */}
    <div className="text-center mt-[20px] text-[17px]">
      <span>Remember your password? </span>
      <a href="/login" className="font-bold text-black hover:underline">
        Login
      </a>
    </div>
  </div>
</div>

    )
}