"use client";

import { FaShare } from "react-icons/fa";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

const ShareBtn = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`; // Replace with your property URL

  return (
    <>
      <h3 className="text-lg font-bold text-center pt-4">
        Share This Property
      </h3>
      <div className="flex justify-center items-center gap-4 my-24">
        <FacebookShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={`#${property.type.replace(/\s+/g, "")}ForRent`}
        >
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          hashtags={[property.type.replace(/\s+/g, "")]}
          hashtag="RealEstate"
        >
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>

        <WhatsappShareButton url={shareUrl} title={property.name}>
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={property.name}
          body={`Check out this property: ${property.name}`}
        >
          <EmailIcon size={32} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareBtn;
