import UserSidebar from "./UserSidebar";

const FAQs = () => {
  return (
    <>
      <div className="h-screen bg-gray-100 font-mono lg:flex">
        <UserSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6 overflow-auto">
            <p className="text-gray-600 text-xl font-bold mt-2 mb-5 p-4">
              | Frequently Asked Questions
            </p>
            <hr />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
              <div className="bg-white p-4 rounded-lg shadow-xl">
                {/* About Evacuation Center */}
                <h2 className="text-lg font-semibold text-txt mb-4">
                  About Evacuation Center
                </h2>
                <ul className="space-y-3">
                  <li>
                    <div className="collapse collapse-arrow border border-gray-300 bg-white rounded-lg">
                      <input type="checkbox" />
                      <div className="collapse-title text-base font-medium text-gray-700">
                        How to plan for evacuation center?
                      </div>
                      <div className="collapse-content text-sm text-gray-500">
                        <p>
                          You can look for your designated evacuation center
                          that was assign to your Barangay. The Barangay has
                          more than one evacuation center make sure to find
                          another evacuation center if others are not available
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="collapse collapse-arrow border border-gray-300 bg-white rounded-lg">
                      <input type="checkbox" />
                      <div className="collapse-title text-base font-medium text-gray-700">
                        What to do if there is no available evacuation center?
                      </div>
                      <div className="collapse-content text-sm text-gray-500">
                        <p>
                          Details about: What to do if there is no available
                          evacuation center?
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="collapse collapse-arrow border border-gray-300 bg-white rounded-lg">
                      <input type="checkbox" />
                      <div className="collapse-title text-base font-medium text-gray-700">
                        Who to contact when you need help with the evacuation
                        center?
                      </div>
                      <div className="collapse-content text-sm text-gray-500">
                        <p>
                          Details about: Who to contact when you need help with
                          the evacuation center?
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="collapse collapse-arrow border border-gray-300 bg-white rounded-lg">
                      <input type="checkbox" />
                      <div className="collapse-title text-base font-medium text-gray-700">
                        When to start planning for early evacuation plan?
                      </div>
                      <div className="collapse-content text-sm text-gray-500">
                        <p>
                          Details about: When to start planning for early
                          evacuation plan?
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* About Disaster Assistance Form */}
              <div className="bg-white p-4 rounded-lg shadow-xl">
                <h2 className="text-lg font-semibold text-txt mb-4">
                  About Disaster Assistance Form
                </h2>
                <ul className="space-y-3">
                  <li>
                    <div className="collapse collapse-arrow border border-gray-300 bg-white rounded-lg">
                      <input type="checkbox" />
                      <div className="collapse-title text-base font-medium text-gray-700">
                        What are disaster assistance forms?
                      </div>
                      <div className="collapse-content text-sm text-gray-500">
                        <p>
                          Details about: What are disaster assistance forms?
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="collapse collapse-arrow border border-gray-300 bg-white rounded-lg">
                      <input type="checkbox" />
                      <div className="collapse-title text-base font-medium text-gray-700">
                        Where can I obtain disaster assistance forms?
                      </div>
                      <div className="collapse-content text-sm text-gray-500">
                        <p>
                          Details about: Where can I obtain disaster assistance
                          forms?
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="collapse collapse-arrow border border-gray-300 bg-white rounded-lg">
                      <input type="checkbox" />
                      <div className="collapse-title text-base font-medium text-gray-700">
                        What information do I need to complete a disaster
                        assistance form?
                      </div>
                      <div className="collapse-content text-sm text-gray-500">
                        <p>
                          Details about: What information do I need to complete
                          a disaster assistance form?
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="collapse collapse-arrow border border-gray-300 bg-white rounded-lg">
                      <input type="checkbox" />
                      <div className="collapse-title text-base font-medium text-gray-700">
                        How do I submit a disaster assistance form?
                      </div>
                      <div className="collapse-content text-sm text-gray-500">
                        <p>
                          Details about: How do I submit a disaster assistance
                          form?
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="collapse collapse-arrow border border-gray-300 bg-white rounded-lg">
                      <input type="checkbox" />
                      <div className="collapse-title text-base font-medium text-gray-700">
                        What kind of assistance can I apply for with these
                        forms?
                      </div>
                      <div className="collapse-content text-sm text-gray-500">
                        <p>
                          Details about: What kind of assistance can I apply for
                          with these forms?
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default FAQs;
