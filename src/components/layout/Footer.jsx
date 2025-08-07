import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Image
                  src="/world-across-logo-and-name-without-bg.png"
                  alt="World Across Logo"
                  width={160}
                  height={48}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              </div>
              <div>
                <p className="text-sm text-gray-400">Your Gateway to Adventure</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Welcome to World Across, your gateway to extraordinary travel experiences. 
              We specialize in providing seamless booking services and personalized travel 
              solutions to destinations around the globe.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-200">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Packages
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Membership Plans
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Popular Destinations</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/destinations/goa" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Goa
                </Link>
              </li>
              <li>
                <Link href="/destinations/kerala" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Kerala
                </Link>
              </li>
              <li>
                <Link href="/destinations/rajasthan" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Rajasthan
                </Link>
              </li>
              <li>
                <Link href="/destinations/himachal" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Himachal Pradesh
                </Link>
              </li>
              <li>
                <Link href="/destinations/dubai" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Dubai
                </Link>
              </li>
              <li>
                <Link href="/destinations/thailand" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Thailand
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    123 Travel Street, Gateway Plaza<br />
                    Mumbai, Maharashtra 400001<br />
                    India
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">+91 9876543210</p>
                  <p className="text-gray-400 text-xs">(Toll Free)</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-blue-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">info@worldacross.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Policies */}
        <div className="border-t border-gray-800 pt-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/terms" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/refund" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                      Refund Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about-us" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Destinations</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/destinations/domestic" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                      Domestic
                    </Link>
                  </li>
                  <li>
                    <Link href="/destinations/international" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                      International
                    </Link>
                  </li>
                  <li>
                    <Link href="/destinations" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                      All Destinations
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/packages" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                      Travel Packages
                    </Link>
                  </li>
                  <li>
                    <Link href="/membership" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                      Membership Plans
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                      Custom Tours
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <h5 className="text-sm font-semibold text-white mb-2">Secure Payment Methods</h5>
              <div className="flex space-x-4">
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-blue-600 font-bold text-xs">VISA</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-red-600 font-bold text-xs">MC</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-blue-800 font-bold text-xs">AMEX</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-green-600 font-bold text-xs">UPI</span>
                </div>
                <div className="bg-blue-600 rounded px-2 py-1">
                  <span className="text-white font-bold text-xs">Razorpay</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-xs text-gray-400">
                <div>
                  <span className="font-semibold">GST No:</span> 19AFIPN5026Q2ZR
                </div>
                <div>
                  <span className="font-semibold">CIN:</span> U63040WB2022PTC257837
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} World Across. All rights reserved.
            </p>
            <div className="flex space-x-6 text-xs">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms & Conditions
              </Link>
              <Link href="/refund" className="text-gray-400 hover:text-white transition-colors duration-200">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
