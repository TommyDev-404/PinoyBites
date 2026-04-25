import { MapPin, Edit2, Package } from "lucide-react";

export default function AddressesTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Delivery Addresses</h2>
        <button className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center gap-1">
          <span className="text-lg leading-none">+</span> Add New
        </button>
      </div>

      <div className="grid gap-4">
        {/* Address 1 */}
        <div className="group relative p-5 bg-white border border-gray-200 rounded-xl hover:border-amber-300 hover:shadow-md transition-all cursor-pointer">
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
              <Edit2 size={16} />
            </button>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <MapPin size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">Home</h3>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wide rounded-full">Default</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">123 Rizal Avenue, Barangay 123</p>
              <p className="text-sm text-gray-500">Quezon City, Metro Manila, Philippines</p>
              <p className="text-sm text-gray-500 mt-1">+63 917 123 4567</p>
            </div>
          </div>
        </div>

        {/* Address 2 */}
        <div className="group relative p-5 bg-white border border-gray-200 rounded-xl hover:border-amber-300 hover:shadow-md transition-all cursor-pointer">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Package size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Office</h3>
              <p className="text-sm text-gray-600 mt-1">Unit 404, Tech Tower</p>
              <p className="text-sm text-gray-500">BGC, Taguig, Metro Manila</p>
              <p className="text-sm text-gray-500 mt-1">+63 918 987 6543</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}