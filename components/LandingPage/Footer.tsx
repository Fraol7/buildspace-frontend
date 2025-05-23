import { Mail, Phone, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative bg-blue-100 py-16">
      {/* Curved top section */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-12"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-white"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="fill-white"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-white"
          ></path>
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Newsletter Section */}
        <div className="text-center mb-16 pt-8">
          <h2 className="text-lg text-slate-700 mb-6">
            Subscribe for innovation news, exclusive launches,
            <br />
            and platform updates.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your Email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About Us */}
          <div>
            <h3 className="font-medium text-slate-800 mb-4">About Us</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-600 hover:text-slate-800 transition-colors">
                  How are we different?
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-slate-800 transition-colors">
                  Career
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-slate-800 transition-colors">
                  Collaborate
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-medium text-slate-800 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-600 hover:text-slate-800 transition-colors">
                  Startup Matchmaking
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-slate-800 transition-colors">
                  Pathways
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-slate-800 transition-colors">
                  Knowledge Hub
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-medium text-slate-800 mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-600 hover:text-slate-800 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-slate-800 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-slate-800 transition-colors">
                  Terms & Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium text-slate-800 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-slate-600">
                <Mail className="h-4 w-4" />
                <a href="mailto:getintouch@bizgrow.com" className="hover:text-slate-800 transition-colors">
                  getintouch@bizgrow.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-600">
                <Phone className="h-4 w-4" />
                <a href="tel:+251-900-000-000" className="hover:text-slate-800 transition-colors">
                  +251-900-000-000
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-slate-200">
          <div className="text-slate-600 text-sm mb-4 sm:mb-0">© Biz-Grow 2024 | All rights reserved</div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
