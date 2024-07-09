import images from "@/assests/images";
import DoctorItem from "@/components/Doctor/Doctor-content";
import doctorImg from "@/assests/images/doctor.png";


function Doctor(props) {
    const doctorData = [{
        id: 1,
        image : images.doctor1,
        certificates : 32,
        clients: "1200+", 
        doctor: "Antaram",
        position: "Nurse",
        describe: "Meg is a leading dentist in our central hospital. She has made the name in california Silicon Valley when presenting the new technology, today called “anti-cancer”.",

    },
    {
        id: 2,
        image : images.doctor2,
        certificates : 50,
        clients: "1300+", 
        doctor: "Diana",
        position: "Nurse",
        describe: "Meg is a leading dentist in our central hospital. She has made the name in california Silicon Valley when presenting the new technology, today called “anti-cancer”.",

    },
    {
        id: 1,
        image : images.doctor3,
        certificates : 45,
        clients: "1400+", 
        doctor: "Pandora",
        position: "Nurse",
        describe: "Meg is a leading dentist in our central hospital. She has made the name in california Silicon Valley when presenting the new technology, today called “anti-cancer”.",

    },
    {
        id: 1,
        image : images.doctor4,
        certificates : 100,
        clients: "1500+", 
        doctor: "Momo sakura",
        position: "Nurse",
        describe: "Meg is a leading dentist in our central hospital. She has made the name in california Silicon Valley when presenting the new technology, today called “anti-cancer”.",

    },
]
    return (
        <div>
        <div className="tw-relative tw-pb-8 tw-z-[-10]">
            <img src={doctorImg} alt="" className="tw-w-full tw-object-contain"/>
            <div className="tw-absolute tw-w-[170px] tw-h-[70px] tw-rounded-[30px] tw-bg-[rgba(6,33,38,0.7)] tw-flex tw-items-center tw-justify-center tw-top-[90px] tw-left-[495px] tw-gap-3">
                <span className="tw-text-white tw-text-5xl tw-font-semibold">Doctor</span>
            </div>
        </div>   
            {doctorData.map((item) => (
                <DoctorItem
                    key={item.id}
                    images={item.image}
                    certificates={item.certificates}
                    clients={item.clients}
                    doctor={item.doctor}
                    position={item.position}
                    describe={item.describe}
                />
            ))}
        </div>
    );
}

export default Doctor