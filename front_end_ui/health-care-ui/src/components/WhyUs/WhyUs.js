import React from 'react';
import images from '@/assests/images';

function WhyUs() {
    return (
        <div className='tw-bg-[#e4eef0] tw-h-[1000px] tw-w-full tw-flex tw-justify-center'>
        <div className='tw-w-[1200px]'>
            <h3 className='tw-font-bold tw-text-5xl tw-leading-[54px] tw-my-40'>Why Us</h3>
            <div className='tw-flex tw-flex-wrap tw-gap-[42px]' >
                <div className='tw-w-[372px] tw-h-[304px] hover:tw-bg-slate-100 tw-rounded-[30px] tw-p-8 tw-ease-in-out tw-duration-300'>
                    <div className='tw-w-[100px] tw-h-[100px] tw-rounded-full tw-bg-[#24bee01a] tw-items-center tw-justify-center tw-flex tw-mb-[20px]'>
                        <img src={images.whyus1} alt="01"/>
                    </div>
                        <h4 className='tw-font-semibold tw-text-4xl tw-text-[#062126] tw-mb-[20px]'> DNA Diagnostics</h4>
                        <p className='tw-font-normal tw-text-2xl tw-text-[#062126b3]'>We are proud to announce that we provide high quality diagnostics for DNA</p>
                </div>
                <div className='tw-w-[372px] tw-h-[304px] hover:tw-bg-slate-100 tw-rounded-[30px] tw-p-8 tw-ease-in-out tw-duration-300'>
                <div className='tw-w-[100px] tw-h-[100px] tw-rounded-full tw-bg-[#24bee01a] tw-items-center tw-justify-center tw-flex tw-mb-[20px]'>
                        <img src={images.whyus2} alt="01"/>
                    </div>
                        <h4 className='tw-font-semibold tw-text-4xl tw-text-[#062126] tw-mb-[20px]'> Insurance</h4>
                        <p className='tw-font-normal tw-text-2xl tw-text-[#062126b3]'>You can get our insurance to not care of any financial difficulties in future.</p>
                </div>
                <div className='tw-w-[372px] tw-h-[304px] hover:tw-bg-slate-100 tw-rounded-[30px] tw-p-8 tw-ease-in-out tw-duration-300'>
                <div className='tw-w-[100px] tw-h-[100px] tw-rounded-full tw-bg-[#24bee01a] tw-items-center tw-justify-center tw-flex tw-mb-[20px]'>
                        <img src={images.whyus3} alt="01"/>
                    </div>
                        <h4 className='tw-font-semibold tw-text-4xl tw-text-[#062126] tw-mb-[20px]'> Medical Support</h4>
                        <p className='tw-font-normal tw-text-2xl tw-text-[#062126b3]'>We have a huge amount of high quality medicine from Germany</p>
                </div>
                <div className='tw-w-[372px] tw-h-[304px] hover:tw-bg-slate-100 tw-rounded-[30px] tw-p-8 tw-ease-in-out tw-duration-300'>
                <div className='tw-w-[100px] tw-h-[100px] tw-rounded-full tw-bg-[#24bee01a] tw-items-center tw-justify-center tw-flex tw-mb-[20px]'>
                        <img src={images.whyus4} alt="01"/>
                    </div>
                        <h4 className='tw-font-semibold tw-text-4xl tw-text-[#062126] tw-mb-[20px]'> Lab Achievements</h4>
                        <p className='tw-font-normal tw-text-2xl tw-text-[#062126b3]'>iMedical has 12 laboratory achievements that have world level impact in medicine.</p>
                </div>
                <div className='tw-w-[372px] tw-h-[304px] hover:tw-bg-slate-100 tw-rounded-[30px] tw-p-8 tw-ease-in-out tw-duration-300'>
                <div className='tw-w-[100px] tw-h-[100px] tw-rounded-full tw-bg-[#24bee01a] tw-items-center tw-justify-center tw-flex tw-mb-[20px]'>
                        <img src={images.whyus5} alt="01"/>
                    </div>
                        <h4 className='tw-font-semibold tw-text-4xl tw-text-[#062126] tw-mb-[20px]'> 24/7 Clean</h4>
                        <p className='tw-font-normal tw-text-2xl tw-text-[#062126b3]'>We care about having a clean and safe rooms for our patients</p>
                </div>
                <div className='tw-w-[372px] tw-h-[304px] hover:tw-bg-slate-100 tw-rounded-[30px] tw-p-8 tw-ease-in-out tw-duration-300'>
                <div className='tw-w-[100px] tw-h-[100px] tw-rounded-full tw-bg-[#24bee01a] tw-items-center tw-justify-center tw-flex tw-mb-[20px]'>
                        <img src={images.whyus6} alt="01"/>
                    </div>
                        <h4 className='tw-font-semibold tw-text-4xl tw-text-[#062126] tw-mb-[20px]'> Training Routine</h4>
                        <p className='tw-font-normal tw-text-2xl tw-text-[#062126b3]'>Our doctors will help you get personal training routine to get the best results</p>
                </div>
                
            </div>
        </div>
            
        </div>
    );
};

export default WhyUs;