import { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import SectionTitleWithText from "../../components/section-title/SectionTitleWithText";
import BannerOne from "../../wrappers/banner/BannerOne";
import TextGridOne from "../../wrappers/text-grid/TextGridOne";
import FunFactOne from "../../wrappers/fun-fact/FunFactOne";
import TeamMemberOne from "../../wrappers/team-member/TeamMemberOne";
import BrandLogoSliderOne from "../../wrappers/brand-logo/BrandLogoSliderOne";

const About = () => {
  return (
    <Fragment>
      <SEO
        titleTemplate="About us"
        description="About page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        <SectionTitleWithText spaceTopClass="pt-100" spaceBottomClass="pb-95" />

        {/* banner */}
        <BannerOne spaceBottomClass="pb-70" />

        {/* text grid */}
        <TextGridOne spaceBottomClass="pb-70" />

        {/* fun fact */}
        <FunFactOne
          spaceTopClass="pt-100"
          spaceBottomClass="pb-70"
          bgClass="bg-gray-3"
        />

        {/* team member */}
        <TeamMemberOne spaceTopClass="pt-95" spaceBottomClass="pb-70" />

        {/* brand logo slider */}
        <BrandLogoSliderOne spaceBottomClass="pb-70" />
      </LayoutOne>
    </Fragment>
  );
};

export default About;
