import Displaylisting from '@/components/DisplayListing'
import React from 'react'
import Image from 'next/image'

function page() {
  return (
    <div>
      <Displaylisting />
      <div>
        {/* Top Agents and Brokers Section */}

        <div className="mt-10">
        <h3 className="font-bold text-xl mb-4 text-center text-gray-800">
          Featured Properties
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Property 1 */}
          <div className="p-4 rounded-lg shadow bg-white border border-gray-300">
            <img src="/Screenshot 2025-05-15 170420.jpg" alt="Property" width={550} height={250} />
            <h5 className= "text-gray-700 mt-2 font-bold text-xl text-center">Luxury Villa</h5>
            <p className="text-green-500 font-bold text-xl text-center">Price: ₹1.5 Cr</p>
            <p className="text-gray-500 font-bold text-xl text-center">Location: Mumbai</p>
          </div>

          {/* Property 2 */}
          <div className="p-4 rounded-lg shadow bg-white border border-gray-300">
            <img src="/Screenshot 2025-05-15 170731.jpg" alt="Property" width={600} height={200} />
            <h5 className="font-bold text-xl text-gray-700 mt-2 text-center">Modern Apartment</h5>
            <p className="text-green-500 font-bold text-xl text-center">Price: ₹90 Lakh</p>
            <p className="text-gray-500 font-bold text-xl text-center">Location: Bangalore</p>
          </div>

          {/* Property 3 */}
          <div className="p-4 rounded-lg shadow bg-white border border-gray-300">
            <img src="/Screenshot 2025-05-15 170854.jpg" alt="Property" width={600} height={200} />
            <h5 className="font-bold text-xl text-center text-gray-700 mt-2">Beach House</h5>
            <p className="text-green-500 font-bold text-xl text-center">Price: ₹2 Cr</p>
            <p className="text-gray-500 font-bold text-xl text-center">Location: Goa</p>
          </div>
        </div>
      </div>
        <div className="mt-10">
          <h3 className="font-bold text-xl mb-4 text-center text-gray-800">
            Top Agents and Brokers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {/* Box 1 */}
            <div className="p-2 rounded-lg shadow bg-white border border-gray-300 text-center">
              <h5 className="font-medium text-xs text-gray-600 mb-1">Company: Home Realty</h5>

              <div className="mb-1 p-1 bg-gray-200 rounded">
                <h5 className="text-xs text-gray-500">Experience</h5>
                <p className="text-sm font-bold text-gray-700">5 years</p>
              </div>

              <div className="mb-1 p-1 bg-gray-200 rounded">
                <h5 className="text-xs text-gray-500">Properties Managed</h5>
                <p className="text-sm font-bold text-gray-700">53</p>
              </div>

              <div className="p-1 bg-gray-200 rounded">
                <h5 className="text-xs text-gray-500">Number of Cities</h5>
                <p className="text-sm font-bold text-gray-700">12</p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="p-2 rounded-lg shadow bg-white border border-gray-300 text-center">
              <h5 className="font-medium text-xs text-gray-600 mb-1">Company: Realty Experts</h5>

              <div className="mb-1 p-1 bg-gray-200 rounded">
                <h5 className="text-xs text-gray-500">Experience</h5>
                <p className="text-sm font-bold text-gray-700">7 years</p>
              </div>

              <div className="mb-1 p-1 bg-gray-200 rounded">
                <h5 className="text-xs text-gray-500">Properties Managed</h5>
                <p className="text-sm font-bold text-gray-700">45</p>
              </div>

              <div className="p-1 bg-gray-200 rounded">
                <h5 className="text-xs text-gray-500">Number of Cities</h5>
                <p className="text-sm font-bold text-gray-700">14</p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="p-2 rounded-lg shadow bg-white border border-gray-300 text-center">
              <h5 className="font-medium text-xs text-gray-600 mb-1">Company: Urban Brokers</h5>

              <div className="mb-1 p-1 bg-gray-200 rounded">
                <h5 className="text-xs text-gray-500">Experience</h5>
                <p className="text-sm font-bold text-gray-700">6 years</p>
              </div>

              <div className="mb-1 p-1 bg-gray-200 rounded">
                <h5 className="text-xs text-gray-500">Properties Managed</h5>
                <p className="text-sm font-bold text-gray-700">30</p>
              </div>

              <div className="p-1 bg-gray-200 rounded">
                <h5 className="text-xs text-gray-500">Number of Cities</h5>
                <p className="text-sm font-bold text-gray-700">20</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4">
          {/* Company Section */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-300 mb-4"> Real-Estate Managment</h2>
            <p className="text-sm text-gray-400">Building dreams, one property at a time.</p>
          </div>

          {/* States Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">States We Serve</h3>
              <ul className="text-sm text-gray-400">
                <li>Andhra Pradesh</li>
                <li>Arunachal Pradesh</li>
                <li>Assam</li>
                <li>Bihar</li>
                <li>Chhattisgarh</li>
                <li>Goa</li>
                <li>Gujarat</li>
                <li>Haryana</li>
                <li>Himachal Pradesh</li>
                <li>Jharkhand</li>
              </ul>
            </div>
            <div>
              <ul className="text-sm text-gray-400 mt-6 md:mt-0">
                <li>Karnataka</li>
                <li>Kerala</li>
                <li>Madhya Pradesh</li>
                <li>Maharashtra</li>
                <li>Manipur</li>
                <li>Meghalaya</li>
                <li>Mizoram</li>
                <li>Nagaland</li>
                <li>Odisha</li>
                <li>Punjab</li>
              </ul>
            </div>
            <div>
              <ul className="text-sm text-gray-400 mt-6 md:mt-0">
                <li>Rajasthan</li>
                <li>Sikkim</li>
                <li>Tamil Nadu</li>
                <li>Telangana</li>
                <li>Tripura</li>
                <li>Uttar Pradesh</li>
                <li>Uttarakhand</li>
                <li>West Bengal</li>
                <li>Andaman and Nicobar Islands</li>
                <li>Chandigarh</li>
              </ul>
            </div>
            <div>
              <ul className="text-sm text-gray-400 mt-6 md:mt-0">
                <li>Dadra and Nagar Haveli</li>
                <li>Daman and Diu</li>
                <li>Delhi</li>
                <li>Lakshadweep</li>
                <li>Puducherry</li>
              </ul>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-white mb-4">Connect with Us</h3>
            <div className="flex justify-center space-x-6">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/instagram.svg" alt="Instagram" className="w-6 h-6 hover:opacity-75" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-6 h-6 hover:opacity-75" />
              </a>
              <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/whatsapp.svg" alt="WhatsApp" className="w-6 h-6 hover:opacity-75" />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/facebook.svg" alt="Facebook" className="w-6 h-6 hover:opacity-75" />
              </a>
              <a href="mailto:urrealestate@gmail.com">
                <img src="/icons/gmail.svg" alt="Gmail" className="w-6 h-6 hover:opacity-75" />
              </a>
            </div>
          </div>

          {/* Experience Section */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-white mb-4">Our Experience</h3>
            <p className="text-sm text-gray-400">Over 15 years of expertise in real estate, managing 10,000+ properties across India.</p>
          </div>

          {/* Bottom Section */}
          <div className="text-center">
            <p className="text-sm text-gray-500">© 2025 UR Real-Estate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>

  )
}

export default page
