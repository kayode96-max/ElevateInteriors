import CalculatorTabs from "@/components/calculators/CalculatorTabs";

export default function Home() {
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

        <CalculatorTabs />
        
      </div>
    </main>
  );
}
