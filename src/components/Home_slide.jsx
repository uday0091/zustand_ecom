import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './slide.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Home_slide() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img className='slideimg' src='https://png.pngtree.com/thumb_back/fh260/background/20240913/pngtree-shiny-diamonds-on-black-background-brilliants-sparkle-dark-table-luxury-white-image_16180616.jpg' /></SwiperSlide>
        <SwiperSlide><img className='slideimg' src='https://blingbag.co.in/cdn/shop/files/TurquoiseAbhikhyaBridalJewellerySet_1.jpg?v=1709637996' /></SwiperSlide>
        <SwiperSlide><img className='slideimg' src='https://img.freepik.com/premium-photo/luxury-jewelry-collection-hd-8k-wallpaper-stock-photographic-image_890746-37263.jpg' /></SwiperSlide>
        <SwiperSlide><img className='slideimg' src='https://img.freepik.com/premium-photo/luxury-jewelry-collection-hd-8k-wallpaper-stock-photographic-image_890746-37255.jpg' /></SwiperSlide>
        <SwiperSlide><img className='slideimg' src='https://cdn.augrav.com/online/jewels/2018/05/14192558/Diamond-Rings.jpg' /></SwiperSlide>
        <SwiperSlide><img className='slideimg' src='https://thumbs.dreamstime.com/b/diamond-rings-beautiful-shot-52680244.jpg' /></SwiperSlide>
        
      </Swiper>
    </>
  );
}