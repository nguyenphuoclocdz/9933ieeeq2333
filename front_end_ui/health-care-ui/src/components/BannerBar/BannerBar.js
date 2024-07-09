import React from 'react';

const BannerBar = () => {
    return (
        <div className=' tw-w-full tw-bg-[#062126] tw-h-[338px] tw-flex tw-items-center tw-justify-center' >
            <div className='tw-h-[198px] tw-w-[400px] tw-flex tw-items-center tw-justify-center tw-border-r tw-border-slate-400' >
                <div className='tw-block '>
                     <h4 className='tw-font-extrabold tw-text-6xl tw-leading-[72px] tw-text-white tw-px-6'>99%</h4>
                    <span className='tw-font-medium tw-text-2xl tw-leading-7 tw-text-[#12CCF4] '> Positive Feedback</span>
                </div>
            </div>
            <div className='tw-h-[198px] tw-w-[400px] tw-flex tw-items-center tw-justify-center tw-border-r tw-border-slate-400 ' > 
                <div className='tw-block'>
                    <h4 className='tw-font-extrabold tw-text-6xl tw-leading-[72px] tw-text-white tw-px-5'>2,300+</h4>
                    <span className='tw-font-medium tw-text-2xl tw-leading-7 tw-text-[#12CCF4]'>Happy Patients a week</span>
                </div>
            </div>
            <div className='tw-h-[198px] tw-w-[400px] tw-flex tw-items-center tw-justify-center'>
                <div className='block'>
                     <h4 className='tw-font-extrabold tw-text-6xl tw-leading-[72px] tw-text-white tw-px-10'>43</h4>
                     <span className='tw-font-medium tw-text-2xl tw-leading-7 tw-text-[#12CCF4]'>Professional Doctors</span>
                </div>
            </div>
            
        </div>
    );
};

export default BannerBar;
