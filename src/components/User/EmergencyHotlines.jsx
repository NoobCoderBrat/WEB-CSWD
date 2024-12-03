import UserSidebar from "./UserSidebar";

const EmergencyHotline = () => {
  const policeStations = [
    {
      name: "MAIN OFFICE",
      contacts: [
        { provider: "SMART", number: "09300134533" },
        { provider: "GLOBE", number: "09300134533" },
      ],
    },
    {
      name: "STATION 1",
      contacts: [{ provider: "SMART", number: "09300134533" }],
    },
    {
      name: "STATION 2",
      contacts: [{ provider: "GLOBE", number: "09300134533" }],
    },
    {
      name: "STATION 3",
      contacts: [{ provider: "SMART", number: "09300134533" }],
    },
    {
      name: "STATION 4",
      contacts: [{ provider: "GLOBE", number: "09300134533" }],
    },
    {
      name: "STATION 5",
      contacts: [{ provider: "SMART", number: "09300134533" }],
    },
    {
      name: "BCMFC",
      contacts: [{ provider: "GLOBE", number: "09300134533" }],
    },
  ];

  const fireProtection = [
    {
      name: "MAIN OFFICE",
      contacts: [
        { provider: "TNT", number: "09300134533" },
        { provider: "TM", number: "09300134533" },
      ],
    },
    {
      name: "LAND LINES",
      contacts: [
        { provider: "", number: "(085) 225-0500" },
        { provider: "", number: "(085) 342-8217" },
      ],
    },
    {
      name: "CHINESSE VOLUNTER",
      contacts: [{ provider: "TNT", number: "09300134533" }],
    },
  ];

  const cdrrmo = [
    {
      name: "CDRRMO",
      contacts: [
        { provider: "SMART", number: "09217687287" },
        { provider: "GLOBE", number: "09561333998" },
      ],
    },
    {
      name: "LAND LINES",
      contacts: [{ provider: "", number: "(085) 815-2607" }],
    },
    {
      name: "RADIO FREQUENCY",
      contacts: [{ provider: "", number: "155.570Mhz" }],
    },
  ];

  const coastGuard = [
    {
      name: "COAST GUARD",
      contacts: [{ provider: "SMART", number: "09510914297" }],
    },
  ];

  const waterDistrict = [
    {
      name: "WATER DISTRICT",
      contacts: [
        { provider: "SMART", number: "09189304234" },
        { provider: "GLOBE", number: "09171888726" },
      ],
    },
    {
      name: "LAND LINES",
      contacts: [{ provider: "", number: "(085) 342-3145" }],
    },
  ];

  const aneco = [
    {
      name: "ANECO",
      contacts: [{ provider: "TNT", number: "09092668777" }],
    },
  ];

  const ContactCard = ({ title, data }) => (
    <div className="mb-8">
      <p className="text-gray-600 text-xl font-bold mb-3 tracking-wider">
        | {title}
      </p>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 mb-5">
        {data.map((station, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="bg-bttn text-white p-3 font-bold">
              {station.name}
            </div>
            {station.contacts.map((contact, idx) => (
              <div key={idx} className="flex justify-between items-center p-3">
                <span className="font-semibold">{contact.provider}</span>
                <span className="text-txt">{contact.number}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gray-100 font-mono lg:flex">
      <UserSidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 overflow-auto">
          <div className="mt-8 px-4">
            <ContactCard
              title="BUTUAN CITY POLICE STATION"
              data={policeStations}
            />
            <ContactCard
              title="BUREAU OF FIRE PROTECTION"
              data={fireProtection}
            />
            <ContactCard title="BUTUAN CDRRMO" data={cdrrmo} />
            <ContactCard
              title="PHILIPPINES COAST GUARD - BUTUAN"
              data={coastGuard}
            />
            <ContactCard
              title="BUTUAN CITY WATER DISTRICT"
              data={waterDistrict}
            />
            <ContactCard title="ANECO" data={aneco} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmergencyHotline;
