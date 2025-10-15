 
function Landing(){
    return(
        <div>

        <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-4 shadow-md bg-white">
  {/* Logo + Title */}
  <div className="flex items-center gap-2">
    <img src="/LOGO.png" alt="Inventory Logo" className="h-10 w-10 object-contain" />
    <span className="text-xl font-bold text-gray-800">Invento</span>
  </div>

  {/* Navbar */}
  <header>
    <nav>
      <ul className="flex items-center gap-6 text-gray-700 font-medium">
        <li>
          <a href="#services" className="hover:text-blue-600 transition">Services</a>
        </li>
        <li>
          <a href="#" className="hover:text-blue-600 transition">Contact</a>
        </li>
        <li>
          <a href="/register">
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
              Register
            </button>
          </a>
        </li>
      </ul>
    </nav>
  </header>
</div>


        <main className="bg-gray-50 pt-20">
  {/* Hero Section */}
  <section className="relative h-screen flex items-center justify-center text-white  from-blue-500 to-blue-700 bg-[url('/accounting.jpg')] bg-cover bg-center">
  <img
    src="/accounting.jpg"
    alt="Dashboard"
    className="absolute inset-0 w-full h-full object-cover opacity-30"
  />
  <div className="relative z-10 max-w-lg text-center space-y-6">
    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
      Streamline your Inventory <br /> Maximize Your Profits
    </h1>
    <a href="/register">
        <button className="px-6 py-3 mt-4 rounded-lg bg-white text-blue-600 font-semibold shadow-md hover:bg-gray-200 transition">
      Get Started
    </button>
    </a>
  </div>
</section>

  <section className=" px-10 py-16 bg-blue-300 text-center">
  <h2 className="text-3xl font-bold text-gray-800 mb-4">Invento</h2>
  <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
At Invento, we offer a complete solution for managing your stock with ease
 and efficiency. Our system allows you to track items in real time, add or update
  products seamlessly, and generate detailed sales and profit reports. With smart 
  alerts for low stock, demand forecasting, and powerful business analytics, you can
   reduce costs, prevent waste, and make informed decisions. Whether you run a small
    shop or a large enterprise, our secure, cloud-based platform is designed to scale
     with your business and give you the tools you need to maximize profits and stay organized.
  </p>
</section>


  {/* Features Section */}
<section className="grid md:grid-cols-3 gap-8 px-10 py-16 bg-blue-200">
  {/* Item Management */}
  <div className="flex flex-col items-center text-center p-6 rounded-xl shadow hover:shadow-lg transition">
    <img
      src="/inventory.jpg"
      alt="Item Management"
      className="w-4/5 h-64 object-cover rounded-lg mb-6"
    />
    <h3 className="text-lg font-semibold text-gray-800">Effortless Item Management</h3>
    <p className="text-sm text-gray-600 mt-2">
      Add new items, delete old ones, update stock seamlessly.
    </p>
  </div>

  {/* Sales Reporting */}
  <div className="flex flex-col items-center text-center p-6 rounded-xl shadow hover:shadow-lg transition">
    <img
      src="/sales.jpg"
      alt="Sales Report"
      className="w-4/5 h-64 object-cover rounded-lg mb-6"
    />
    <h3 className="text-lg font-semibold text-gray-800">Insightful Sales Reporting</h3>
    <p className="text-sm text-gray-600 mt-2">
      View clear graphs and charts to make informed decisions.
    </p>
    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
      Generate Report
    </button>
  </div>

  {/* Business Analysis */}
  <div className="flex flex-col items-center text-center p-6 rounded-xl shadow hover:shadow-lg transition">
    <img
      src="/systemanalysis.jpg"
      alt="Analysis"
      className="w-4/5 h-64 object-cover rounded-lg mb-6"
    />
    <h3 className="text-lg font-semibold text-gray-800">Business Analysis</h3>
    <p className="text-sm text-gray-600 mt-2">
      Analyze your business, know profit returns and market prices.
    </p>
  </div>
</section>


    {/* Services */}

<section id="services" className="px-10 py-20 bg-blue-100 text-center">
  <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Invento?</h2>
  <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed mb-8">
    Our inventory management system helps businesses stay organized, save time, 
    and make smarter decisions. Whether you run a small shop or a large company, 
    we provide the tools you need to scale with confidence.
  </p>
  <div className="flex flex-wrap justify-center gap-6">
    <div className="bg-white shadow-md rounded-xl p-6 w-72 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-blue-600 mb-2">Save Time</h3>
      <p className="text-gray-600">Automate stock tracking and reporting to cut down manual work.</p>
    </div>
    <div className="bg-white shadow-md rounded-xl p-6 w-72 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-blue-600 mb-2">Reduce Costs</h3>
      <p className="text-gray-600">Avoid overstocking and prevent losses with accurate forecasting.</p>
    </div>
    <div className="bg-white shadow-md rounded-xl p-6 w-72 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-blue-600 mb-2">Boost Profits</h3>
      <p className="text-gray-600">Track sales trends and maximize your business performance.</p>
    </div>
  </div>
</section>


</main>
<footer className="bg-blue-900 text-gray-300 px-10 py-8">
  <div className="grid md:grid-cols-4 gap-8">
    {/* Company Info */}
    <div>
      <h3 className="text-xl font-semibold text-white mb-3">Invento</h3>
      <p className="text-sm">
        Streamline your business with smarter inventory management.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
      <ul className="space-y-2">
        <li><a href="#" className="hover:text-white transition">Home</a></li>
        <li><a href="#" className="hover:text-white transition">Services</a></li>
        <li><a href="#" className="hover:text-white transition">Contact</a></li>
        <li><a href="#" className="hover:text-white transition">FAQs</a></li>
      </ul>
    </div>

    {/* Contact Info */}
    <div>
      <h4 className="text-lg font-semibold text-white mb-3">Contact</h4>
      <p>Email: support@inventory.com</p>
      <p>Phone: +234 814 301 8363</p>
      <p>Address: Lagos, Nigeria</p>
    </div>

    {/* Social Media */}
    <div>
      <h4 className="text-lg font-semibold text-white mb-3">Follow Us</h4>
      <div className="flex gap-4">
        <a href="#" className="hover:text-white">Facebook</a>
        <a href="#" className="hover:text-white">Twitter</a>
        <a href="#" className="hover:text-white">LinkedIn</a>
      </div>
    </div>
  </div>

  <div className="text-center text-sm text-gray-500 mt-8">
    © {new Date().getFullYear()} Inventory. All rights reserved.
  </div>
</footer>


        </div>
    )
}
export default Landing;