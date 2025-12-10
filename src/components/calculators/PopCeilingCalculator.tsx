"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Layers } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '../ui/separator';

const formSchema = z.object({
  length: z.coerce.number().min(0.1, "Length must be positive"),
  width: z.coerce.number().min(0.1, "Width must be positive"),
  designFactor: z.coerce.number().min(1, "Design factor must be at least 1").default(1),
  laborCostPerSqm: z.coerce.number().min(0, "Labor cost must be non-negative"),
  marginPerSqm: z.coerce.number().min(0, "Margin must be non-negative"),
  popBagCost: z.coerce.number().min(0, "POP bag cost must be non-negative"),
  popBagCoverage: z.coerce.number().min(0.1, "Coverage must be positive").default(1.5),
});

type FormValues = z.infer<typeof formSchema>;

type Result = {
    ceilingArea: number;
    popBagsNeeded: number;
    totalLaborCost: number;
    totalMargin: number;
    totalMaterialCost: number;
    finalPriceEstimate: number;
}

export default function PopCeilingCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      length: '' as any,
      width: '' as any,
      designFactor: 1,
      laborCostPerSqm: '' as any,
      marginPerSqm: '' as any,
      popBagCost: '' as any,
      popBagCoverage: 1.5,
    },
  });

  function onSubmit(values: FormValues) {
    const ceilingArea = values.length * values.width;
    const totalAreaWithDesign = ceilingArea * values.designFactor;
    const popBagsNeeded = Math.ceil(totalAreaWithDesign / values.popBagCoverage);
    const totalMaterialCost = popBagsNeeded * values.popBagCost;
    const totalLaborCost = ceilingArea * values.laborCostPerSqm;
    const totalMargin = ceilingArea * values.marginPerSqm;
    const finalPriceEstimate = totalMaterialCost + totalLaborCost + totalMargin;
    
    setResult({ 
        ceilingArea, 
        popBagsNeeded, 
        totalLaborCost, 
        totalMargin, 
        totalMaterialCost,
        finalPriceEstimate 
    });
  }

  return (
    <Card className="w-full shadow-lg border-primary/20">
      <CardHeader>
        <div className="flex items-start gap-4">
          <span className="p-3 bg-primary/10 rounded-lg text-primary">
            <Layers className="h-6 w-6" />
          </span>
          <div>
            <CardTitle className="font-headline text-2xl">POP Ceiling Calculator</CardTitle>
            <CardDescription className="mt-1">Estimate the costs for a Plaster of Paris ceiling project.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="space-y-4 rounded-lg border p-4">
                <h3 className="font-medium text-lg">Dimensions & Design</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                    <FormField control={form.control} name="length" render={({ field }) => ( <FormItem><FormLabel>Length (m)</FormLabel><FormControl><Input type="number" placeholder="e.g., 5" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="width" render={({ field }) => ( <FormItem><FormLabel>Width (m)</FormLabel><FormControl><Input type="number" placeholder="e.g., 4" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="designFactor" render={({ field }) => ( <FormItem><FormLabel>Design Factor</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
            </div>

            <div className="space-y-4 rounded-lg border p-4">
                <h3 className="font-medium text-lg">Costs & Margin</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="laborCostPerSqm" render={({ field }) => ( <FormItem><FormLabel>Labor Cost per m²</FormLabel><FormControl><Input type="number" placeholder="e.g., 250" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="marginPerSqm" render={({ field }) => ( <FormItem><FormLabel>Margin per m²</FormLabel><FormControl><Input type="number" placeholder="e.g., 50" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
            </div>

             <div className="space-y-4 rounded-lg border p-4">
                <h3 className="font-medium text-lg">Materials</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="popBagCost" render={({ field }) => ( <FormItem><FormLabel>Cost per POP Bag</FormLabel><FormControl><Input type="number" placeholder="e.g., 300" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="popBagCoverage" render={({ field }) => ( <FormItem><FormLabel>Bag Coverage (m²)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Button type="submit">Calculate</Button>
            {result && (
              <div className="p-4 bg-muted rounded-lg w-full space-y-4">
                <div className="text-center">
                    <p className="text-lg">Final Price Estimate</p>
                    <p className="text-4xl font-bold text-primary">₹{result.finalPriceEstimate.toFixed(2)}</p>
                </div>
                <Separator />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center sm:text-left">
                    <div className="p-2 rounded-md"><p className="text-sm text-muted-foreground">Ceiling Area</p><p className="font-semibold">{result.ceilingArea.toFixed(2)} m²</p></div>
                    <div className="p-2 rounded-md"><p className="text-sm text-muted-foreground">POP Bags Needed</p><p className="font-semibold">{result.popBagsNeeded} bags</p></div>
                    <div className="p-2 rounded-md"><p className="text-sm text-muted-foreground">Material Cost</p><p className="font-semibold">₹{result.totalMaterialCost.toFixed(2)}</p></div>
                    <div className="p-2 rounded-md"><p className="text-sm text-muted-foreground">Total Labor Cost</p><p className="font-semibold">₹{result.totalLaborCost.toFixed(2)}</p></div>
                    <div className="p-2 rounded-md"><p className="text-sm text-muted-foreground">Total Margin</p><p className="font-semibold">₹{result.totalMargin.toFixed(2)}</p></div>
                </div>
              </div>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
