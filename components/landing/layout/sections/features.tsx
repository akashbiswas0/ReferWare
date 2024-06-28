import { Card, CardContent, CardHeader, CardTitle } from "@/components/landing/ui/card";
import { Icon } from "@/components/landing/ui/icon";
import { icons } from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "TabletSmartphone",
    title: "Setup Profile",
    description:
      "Setup your profile with all relevant details and create custom referral code.",
  },
  {
    icon: "BadgeCheck",
    title: "Connect Marketing Outlet",
    description:
      "Connect your marketing outlet, Youtube, Tiktok, Newsletter etc.Connect Marketing Outlet.",
  },
  {
    icon: "Goal",
    title: "Collab & Earn",
    description:
      "Join eligible campaign and earn commissions trustlessly with our seamless referral process.",
  },

];

export const FeaturesSection = () => {
  return (
    <section id="features" className="container py-24 sm:py-3 px-32 text-white">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Features
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        What Makes Us Different ?
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
      Our innovative referral code tool empowers influencers to earn commissions seamlessly across different marketplaces.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};