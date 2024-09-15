import Link from "next/link";
import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function SocialLinks({ className = "" }) {
  const socialLinkData = [
    { id: 1, href: "https://www.linkedin.com/in/siriusTeamEG/", icon: FaLinkedin },
    { id: 2, href: "https://web.facebook.com/SiriusTeamEG/", icon: FaFacebook },
    { id: 3, href: "https://github.com/SiriusEG", icon: FaGithub },
    { id: 4, href: "https://x.com/SiriusTeamEG", icon: FaXTwitter },
  ];

  const LinkItem = ({ linkData }) => (
    <li>
      <Link href={linkData.href}>
        <linkData.icon className="fill-gray-10 size-6" />
      </Link>
    </li>
  );

  return (
    <ul className={`flex items-center gap-6 ${className}`}>
      {socialLinkData.map((linkData) => (
        <LinkItem key={linkData.id} linkData={linkData} />
      ))}
    </ul>
  );
}
