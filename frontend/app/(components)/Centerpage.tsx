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

export default function Component() {
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
        title="Transform Your Business Today"
        description="Say goodbye to inefficiencies and hello to success with our groundbreaking AI app. Streamline your workflow, boost productivity, and maximize revenue effortlessly."
        autoPlay
        controls={false}
        videoSrc="https://cache.shipixen.com/features/11-pricing-page-builder.mp4"
        withBackground
        withBackgroundGlow
        variant="secondary"
        backgroundGlowVariant="secondary"
        leadingComponent={<LandingProductHuntAward />}
      >
        <Button size="xl" variant="secondary" asChild>
          <a href="#">Buy Now</a>
        </Button>
        <Button size="xl" variant="outlineSecondary">
          <a href="#">Learn More</a>
        </Button>
        <LandingDiscount
          discountValueText="$350 off"
          discountDescriptionText="for the first 10 customers (2 left)"
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
          title="Supercharge Your Efficiency!"
          descriptionComponent={
            <>
              <LandingProductFeatureKeyPoints
                keyPoints={[
                  {
                    title: "Intelligent Assistance",
                    description:
                      "Receive personalized recommendations and insights tailored to your workflow.",
                  },
                  {
                    title: "Seamless Collaboration",
                    description:
                      "Easily collaborate with team members and clients in real-time.",
                  },
                  {
                    title: "Advanced Customization",
                    description:
                      "Tailor your app to fit your unique requirements with extensive customization options.",
                  },
                ]}
              />
              <Button className="mt-8" asChild>
                <a href="#">Try now for free</a>
              </Button>
              <p className="text-sm">
                7 day free trial, no credit card required.
              </p>
            </>
          }
          imageSrc="/static/images/backdrop-19.webp"
          imageAlt="Screenshot of the product"
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
