import React from "react";
import { Button } from "@/components/shared/ui/button";
import { LandingPrimaryVideoCtaSection } from "@/components/landing/cta/LandingPrimaryCta";
import { LandingProductHuntAward } from "@/components/landing/social-proof/LandingProductHuntAward";
import { LandingSocialProof } from "@/components/landing/social-proof/LandingSocialProof";
import { LandingDiscount } from "@/components/landing/discount/LandingDiscount";
import { LandingProductFeature } from "@/components/landing/LandingProductFeature";
import { LandingProductFeatureKeyPoints } from "@/components/landing/LandingProductFeatureKeyPoints";
import { LandingTestimonialGrid } from "@/components/landing/testimonial/LandingTestimonialGrid";
import { LandingTestimonialReadMoreWrapper } from "@/components/landing/testimonial/LandingTestimonialReadMoreWrapper";
import { LandingFaqSection } from '@/components/landing/LandingFaq';
import Link from "next/link";


export default function LandPage() {
  const avatarItems = [
    {
      imageSrc: "https://picsum.photos/id/64/100/100",
      name: "John Doe",
    },
    {
      imageSrc: "https://picsum.photos/id/65/100/100",
      name: "Jane Doe",
    },
    {
      imageSrc: "https://picsum.photos/id/669/100/100",
      name: "Alice Doe",
    },
  ];
  const testimonialItems = [
    {
      name: "Mathew",
      text: "After using this, I cannot imagine going back to the old way of doing things.",
      handle: "@heymatt_oo",
      imageSrc: "https://picsum.photos/100/100.webp?random=2",
    },
    {
      name: "Joshua",
      text: "Perfect for my use case",
      handle: "@joshua",
      imageSrc: "https://picsum.photos/100/100.webp?random=3",
    },
    {
      name: "Parl Coppa",
      text: "This is the best thing since sliced bread. I cannot believe I did not think of it myself.",
      handle: "@coppalipse",
      imageSrc: "https://picsum.photos/100/100.webp?random=1",
      featured: true, // Feature this testimonial
    },
    {
      name: "Mandy",
      text: "Excellent product!",
      handle: "@mandy",
      imageSrc: "https://picsum.photos/100/100.webp?random=4",
    },
    {
      name: "Alex",
      text: "Can easily recommend!",
      handle: "@alex",
      imageSrc: "https://picsum.photos/100/100.webp?random=5",
    },
    {
      name: "Sam",
      text: "I am very happy with the results.",
      handle: "@sama",
      imageSrc: "https://picsum.photos/100/100.webp?random=6",
    },
  ];
  const faqItems = [
    {
      question: 'Can I integrate my existing systems?',
      answer:
        'Absolutely! Our app seamlessly integrates with various other tools and systems.',
    },
    {
      question: 'Do I need coding skills?',
      answer:
        'Nope! Our user-friendly interface empowers anyone to create and manage their own app.',
    },
    {
      question: 'Is my data secure?',
      answer:
        'Absolutely! We take data security seriously, employing robust measures to keep your information safe.',
    },
  ];

  return (
    <div>
      <LandingPrimaryVideoCtaSection
        title="Discover the Best Web 3.0 Applications in One Place"
        description="Explore, download, and enjoy a curated selection of decentralized applications with ease"
        autoPlay
        controls={false}
        
        withBackground
        withBackgroundGlow
        variant="secondary"
        backgroundGlowVariant="secondary"
        leadingComponent={<LandingProductHuntAward />}
      >
        <Link href={"/ExploreDapps"}>
          <Button size="xl" variant="secondary">
            Explore dApps
          </Button>
        </Link>

        <Link href={"/DAppifyDAO"}>
          <Button size="xl" variant="outlineSecondary">
            dAppify-DAO
          </Button>
        </Link>

        <LandingDiscount
          discountValueText="30% off"
          discountDescriptionText="for the first 10 to register dApps (2 left)"
        />
        <LandingSocialProof
          className="w-full mt-12"
          showRating
          numberOfUsers={99}
          suffixText="happy users"
          avatarItems={avatarItems}
        />
      </LandingPrimaryVideoCtaSection>
      <div>
        <LandingProductFeature
          title="Unlock the Ultimate Web 3.0 Experience!"
          descriptionComponent={
            <>
              <LandingProductFeatureKeyPoints
                keyPoints={[
                  {
                    title: "Vast Library of dApps",
                    description:
                      "Access a comprehensive and curated selection of the best Web 3.0 applications.",
                  },
                  {
                    title: "Easy Navigation",
                    description:
                      "User-friendly interface to explore and discover new dApps effortlessly.",
                  },
                  {
                    title: "Secure Downloads",
                    description:
                      " Ensure safety and security with vetted and trusted applications.",
                  },
                  {
                    title: "User Reviews and Ratings",
                    description:
                      " Make informed decisions with insights from the community.",
                      },
                ]}
              />
              <Button className="mt-8">
                <Link href="/">Try now for free</Link>
              </Button>
              <p className="text-sm">
                free trial, no credit card required.
              </p>
            </>
          }
          imageSrc="/static/images/image2.jpg"
          imageAlt="display photo"
          imagePosition="left"
          imagePerspective="bottom"
          
        />
      </div>
      <LandingTestimonialReadMoreWrapper size="md">
        <LandingTestimonialGrid
          title="Don't take it from us"
          description="See what our customers have to say."
          testimonialItems={testimonialItems}
          withBackgroundGlow
          withBackground
        />
      </LandingTestimonialReadMoreWrapper>

      <LandingFaqSection
      title="FAQ"
      description="Looking to learn more about our product? Here are some of the most common questions."
      faqItems={faqItems}
      withBackground
    />

      
    </div>
  );
}
