import { Card, CardContent, CardHeader, CardTitle } from "@/components/landing/ui/card";
import { Icon } from "@/components/landing/ui/icon";
import { icons } from "lucide-react";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "Blocks",
    title: "Brand Account Setup",
    description:
      "Set up your brand account effortlessly. Provide your brand name, logo, and referral details to start your referral journey.",
  },
  {
    icon: "LineChart",
    title: "Influencer Account Setup",
    description:
      "Influencers, integrate your Web2 accounts, manage your details, and generate a unique ID for your wallet. It's all about simplicity.",
  },
  {
    icon: "Wallet",
    title: "Ecosystem",
    description:
      "Become a part of an ever-growing network of brands and affiliates Discover suitable partners wit ease through the use of various filters such as Tags, Niches and analytics.",
  },
  {
    icon: "Sparkle",
    title: "Analytics Tool",
    description:
      "Track and analyze campaign performance and referrals with all relevant metrics.",
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-20  px-32 text-white">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-2xl text-primary mb-2 tracking-wider">Benefits</h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Take this chance
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
          Entropy is a platform that provides AI-generated trade suggestions. Users can subscribe to AI models, run inferences for specific tokens, and receive cryptographic proof for verification
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};