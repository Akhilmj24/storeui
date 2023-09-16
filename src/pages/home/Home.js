import React, { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import BrandLogoSliderOne from "../../wrappers/brand-logo/BrandLogoSliderOne";
import ImageSliderTwo from "../../wrappers/image-slider/ImageSliderTwo";
import TabProduct from "../../wrappers/product/TabProduct";
import VideoPopupTwo from "../../components/video-popup/VideoPopupTwo";
import CategoryGrid from "../../wrappers/category/CategoryGrid";
import HeroSlider from "../../wrappers/hero-slider/HeroSlider";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";

import CountDownFour from "../../wrappers/countdown/CountDown";
import CountDown from "../../wrappers/countdown/CountDown";
import { useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";

const Home = () => {
  
  return (
    <Fragment>
      <SEO
        titleTemplate="Home"
        description="Furniture home of flone react minimalist eCommerce template."
      />
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
        headerPositionClass="header-absolute"
      >
        {/* hero slider */}
        {/* <HeroSlider /> */}
        {/* category grid */}
        {/* <CategoryGrid spaceBottomClass="pb-70" /> */}

        {/* feature icon */}

        <VideoPopupTwo />
        <FeatureIcon spaceBottomClass="pb-70" />

        {/* video popup */}
        {/* tab product */}
        <TabProduct
          spaceTopClass="pt-95"
          spaceBottomClass="pb-100"
          category="Clothing"
        />

        {/* countdown */}

        <CountDown
          spaceTopClass="pt-115"
          spaceBottomClass="pb-115"
          bgImg="/assets/img/bg/bg-6.jpg"
          image="/assets/img/banner/deal-9.png"
          dateTime="November 13, 2023 12:12:00"
        />

        {/* brand logo slider */}
        {/* <BrandLogoSliderOne spaceBottomClass="pb-95" spaceTopClass="pt-100" /> */}
        {/* image slider */}
        <ImageSliderTwo />
      </LayoutOne>
    </Fragment>
  );
};

export default Home;
