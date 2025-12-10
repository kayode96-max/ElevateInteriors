import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Square,
  RectangleVertical,
  RectangleHorizontal,
  PanelTop,
  LayoutPanelTop,
  PaintRoller,
  Layers,
} from "lucide-react";
import FloorCalculator from "@/components/calculators/FloorCalculator";
import WallCalculator from "@/components/calculators/WallCalculator";
import CeilingCalculator from "@/components/calculators/CeilingCalculator";
import CurtainCalculator from "@/components/calculators/CurtainCalculator";
import PanelEstimator from "@/components/calculators/PanelEstimator";
import PaintEstimator from "@/components/calculators/PaintEstimator";
import PopCeilingCalculator from "@/components/calculators/PopCeilingCalculator";

export default function Home() {
  const calculators = [
    {
      value: "floor",
      label: "Flooring",
      icon: <Square className="h-5 w-5" />,
      component: <FloorCalculator />,
    },
    {
      value: "walls",
      label: "Walls",
      icon: <RectangleVertical className="h-5 w-5" />,
      component: <WallCalculator />,
    },
    {
      value: "ceiling",
      label: "Ceiling",
      icon: <RectangleHorizontal className="h-5 w-5" />,
      component: <CeilingCalculator />,
    },
    {
      value: "pop-ceiling",
      label: "POP Ceiling",
      icon: <Layers className="h-5 w-5" />,
      component: <PopCeilingCalculator />,
    },
    {
      value: "curtains",
      label: "Curtains",
      icon: <PanelTop className="h-5 w-5" />,
      component: <CurtainCalculator />,
    },
    {
      value: "panels",
      label: "Panels",
      icon: <LayoutPanelTop className="h-5 w-5" />,
      component: <PanelEstimator />,
    },
    {
      value: "paint",
      label: "Paint",
      icon: <PaintRoller className="h-5 w-5" />,
      component: <PaintEstimator />,
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary font-headline">
            Elevate Interior
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Quickly estimate materials for your next home project.
          </p>
        </header>

        <Tabs defaultValue="floor" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 md:grid-cols-7 h-auto p-1.5">
            {calculators.map((calc) => (
              <TabsTrigger key={calc.value} value={calc.value} className="flex flex-col sm:flex-row gap-2 h-14 sm:h-12">
                {calc.icon}
                <span>{calc.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          {calculators.map((calc) => (
            <TabsContent key={calc.value} value={calc.value} className="mt-6">
              {calc.component}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>
  );
}
