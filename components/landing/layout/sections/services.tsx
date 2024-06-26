import { Badge } from "@/components/landing/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/landing/ui/card";

enum ProService {
  YES = 1,
  NO = 0,
}
interface ServiceProps {
  title: string;
  pro: ProService;
  description: string;
}
const serviceList: ServiceProps[] = [
  {
    title: "4",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit adipisicing.",
    pro: 0,
  },
  {
    title: "3",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae, dicta.",
    pro: 0,
  },
  {
    title: "2",
    description: "Lorem dolor sit amet adipisicing.",
    pro: 0,
  },
  {
    title: "1",
    description: "Lorem ipsum dolor sit amet consectetur.",
    pro: 1,
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="container py-24 sm:py-32 text-white">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Services
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Grow Your Reach
      </h2>
      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
       Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi repellendus doloremque porro vero beatae eveniet illo quod nihil esse nam. Consequatur debitis, quisquam facere placeat aspernatur quis eum pariatur? Cupiditate.
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full lg:w-[60%] mx-auto">
        {serviceList.map(({ title, description, pro }) => (
          <Card
            key={title}
            className="bg-muted/60 bg-opacity-15 bg-slate-400 h-full relative"
          >
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
};