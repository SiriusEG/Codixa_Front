import React from "react";
import FooterList from "./footerList";

export default function LeftFooter() {
  return (
    <div className="flex items-start justify-center gap-8 w-2/5 m-lg:w-full flex-wrap ph:gap-y-12">
      <FooterList
        title="product"
        list={[
          { text: "overview", href: "/" },
          { text: "features", href: "/" },
          { text: "solutions", href: "/" },
          { text: "tutorials", href: "/" },
          { text: "pricing", href: "/" },
        ]}
      />
      <FooterList
        title="company"
        list={[
          { text: "about us", href: "/" },
          { text: "careers", href: "/" },
          { text: "press", label: "new", href: "/" },
          { text: "news", href: "/" },
        ]}
      />
      <FooterList
        title="social"
        list={[
          { text: "Twitter", href: "/" },
          { text: "LinkedIn", href: "/" },
          { text: "GitHub", href: "/" },
          { text: "Dribble", href: "/" },
        ]}
      />
      <FooterList
        title="Legal"
        list={[
          { text: "Terms", href: "/" },
          { text: "privacy", href: "/" },
          { text: "cookies", href: "/" },
          { text: "contact", href: "/" },
        ]}
      />
    </div>
  );
}
