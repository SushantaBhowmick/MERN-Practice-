import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-3">MyCompany</h2>
          <p className="text-sm text-gray-400">
            Building the future, one line of code at a time.
          </p>
          <div className="flex mt-4 space-x-4">
            <Facebook className="w-5 h-5 hover:text-blue-500" />
            <Twitter className="w-5 h-5 hover:text-blue-400" />
            <Instagram className="w-5 h-5 hover:text-pink-500" />
            <Linkedin className="w-5 h-5 hover:text-blue-600" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Services</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">FAQs</a></li>
            <li><a href="#" className="hover:text-white">Support</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Newsletter</h3>
          <p className="text-sm text-gray-400 mb-4">Get the latest updates.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-md text-black focus:outline-none"
            />
            <button className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-sm text-center text-gray-500">
        © {new Date().getFullYear()} MyCompany. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
