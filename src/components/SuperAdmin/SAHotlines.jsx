import SASidebar from "./SASidebar";

const SAHotlines = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 font-mono xl:flex">
        <div className="sticky top-0 h-screen w-72">
          <SASidebar />
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto">
          <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
            <p className="text-gray-600 text-lg sm:text-xl font-bold mt-2 mb-5 p-4">
              | Emergency Hotlines
            </p>
            <hr />
            <div className="max-w-6xl mx-auto p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-blue-800 mb-4">
                    <a href="#" className="hover:underline">
                      Butuan city Police Station
                    </a>
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold">Main office:</h3>
                        <div className="space-y-1">
                          <p className="text-sm">TnT/ Smart:</p>
                          <p className="text-sm text-gray-600">0938-386-3057</p>
                          <p className="text-sm text-gray-600">0998-598-7292</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold">Station 1:</h3>
                        <div className="space-y-1">
                          <p className="text-sm">TnT/ Smart:</p>
                          <p className="text-sm text-gray-600">0998-598-7293</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold">Station 2:</h3>
                        <div className="space-y-1">
                          <p className="text-sm">TnT/ Smart:</p>
                          <p className="text-sm text-gray-600">0998-598-7296</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold">Station 3:</h3>
                        <div className="space-y-1">
                          <p className="text-sm">TnT/ Smart:</p>
                          <p className="text-sm text-gray-600">0998-598-7297</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold">Station 4:</h3>
                        <div className="space-y-1">
                          <p className="text-sm">TnT/ Smart:</p>
                          <p className="text-sm text-gray-600">0998-598-7300</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold">Station 5:</h3>
                        <div className="space-y-1">
                          <p className="text-sm">TnT/ Smart:</p>
                          <p className="text-sm text-gray-600">0998-598-7302</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold">BCMFC:</h3>
                      <div className="space-y-1">
                        <p className="text-sm">TnT/ Smart:</p>
                        <p className="text-sm text-gray-600">0930-297-0041</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-blue-800 mb-4">
                    <a href="#" className="hover:underline">
                      Bureau of Fire Protection
                    </a>
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold">TNT:</h3>
                      <p className="text-sm text-gray-600">0931-721-8876</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Landlines:</h3>
                      <p className="text-sm text-gray-600">(085) 225-0500</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">TM:</h3>
                      <p className="text-sm text-gray-600">(085) 342-8217</p>
                      <p className="text-sm text-gray-600">0955-214-8542</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Chinese Volunteer:</h3>
                      <p className="text-sm text-gray-600">0912-362-1333</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-blue-800 mb-4">
                    <a href="#" className="hover:underline">
                      Butuan CDRRMO
                    </a>
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold">Smart:</h3>
                      <p className="text-sm text-gray-600">0921-768-7287</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Globe:</h3>
                      <p className="text-sm text-gray-600">0956-133-3998</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Landlines:</h3>
                      <p className="text-sm text-gray-600">(085) 815-2607</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Radio Freq:</h3>
                      <p className="text-sm text-gray-600">155.570Mhz</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-blue-800 mb-4">
                    <a href="#" className="hover:underline">
                      BCWD
                    </a>
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold">Smart:</h3>
                      <p className="text-sm text-gray-600">0918-930-4234</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Globe:</h3>
                      <p className="text-sm text-gray-600">0917-188-8726</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Landline:</h3>
                      <p className="text-sm text-gray-600">(085) 342-3145</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-blue-800 mb-4">
                  <a href="#" className="hover:underline">
                    LTTMO - Butuan
                  </a>
                </h2>
                <div>
                  <h3 className="font-semibold">Landline:</h3>
                  <p className="text-sm text-gray-600">(085) 342-3886</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Coast Guard Card */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-blue-800 mb-4">
                    <a href="#" className="hover:underline">
                      Philippines Coast Guard - Butuan
                    </a>
                  </h2>
                  <div>
                    <h3 className="font-semibold">Smart:</h3>
                    <p className="text-sm text-gray-600">0951-091-4297</p>
                  </div>
                </div>

                {/* Aneco Card */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-blue-800 mb-4">
                    <a href="#" className="hover:underline">
                      Aneco
                    </a>
                  </h2>
                  <div>
                    <h3 className="font-semibold">TNT:</h3>
                    <p className="text-sm text-gray-600">0909-266-8777</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default SAHotlines;
