

export default function StoreInfo(){
      return (
            <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Main Branch</h3>
                  <div className="space-y-4 text-gray-600">
                        <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        </div>
                        <div>
                        <p className="font-semibold text-gray-900">Address</p>
                        <p>123 Bakery Street, Quezon City</p>
                        <p>Manila, Philippines 1100</p>
                        </div>
                        </div>

                        <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        </div>
                        <div>
                        <p className="font-semibold text-gray-900">Phone</p>
                        <p>(02) 8123-4567</p>
                        <p>+63 917 123 4567</p>
                        </div>
                        </div>

                        <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        </div>
                        <div>
                        <p className="font-semibold text-gray-900">Email</p>
                        <p>info@pandesalnijack.com</p>
                        <p>orders@pandesalnijack.com</p>
                        </div>
                        </div>

                        <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        </div>
                        <div>
                        <p className="font-semibold text-gray-900">Hours</p>
                        <p>Monday - Sunday: 5:00 AM - 8:00 PM</p>
                        <p className="text-sm text-amber-600 font-semibold mt-1">Open Daily! Fresh bread every morning at 5 AM</p>
                        </div>
                        </div>
                  </div>
            </div>
      );
}