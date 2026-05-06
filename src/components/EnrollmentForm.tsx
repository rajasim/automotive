import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

// Tells TypeScript that Razorpay is available on the window object
declare global {
  interface Window {
    Razorpay: any;
  }
}

// Define the form validation schema
const formSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  education: z.string().min(2, 'Please enter your education background'),
  selectedCourse: z.string().min(1, 'Please select a course'),
});

// List of available courses with their prices
const coursesList = [
  { id: '1', name: 'Weekend Program: Vehicle Systems', price: 1 },
  { id: '2', name: 'Weekend Program: ISO 26262', price: 25000 },
  { id: '3', name: 'FMEA Program', price: 12000 },
  { id: '4', name: 'Cybersecurity in Automotive Systems', price: 20000 },
  { id: '5', name: 'Cybersecurity in Automotive Systems (ISO 21434)', price: 22000 },
  { id: '6', name: 'Weekend Program: Automotive Cyber Battleground (TARA – ISO 21434)', price: 28000 }
];

const EnrollmentForm = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      education: '',
      selectedCourse: ''
    }
  });

  // Watch the selected course to display the correct price on the button
  const selectedCourseName = form.watch('selectedCourse');
  const selectedCourseData = coursesList.find(c => c.name === selectedCourseName);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!selectedCourseData) {
      toast({ title: "Selection Required", description: "Please select a course to proceed." });
      return;
    }

    setIsProcessing(true);

    // Razorpay Configuration Options
    const options = {
      // REPLACE THIS with your actual Test Key from Razorpay Dashboard
      key: "rzp_live_SmAPt9JdFQjkqa", 
      amount: selectedCourseData.price * 100, // Amount in paise (e.g., 15000 * 100)
      currency: "INR",
      name: "Auto Intellects",
      description: `Enrollment: ${data.selectedCourse}`,
      image: "/AutoIntellects Logo short v1.png", 
      handler: function (response: any) {
        // This callback runs after successful payment
        toast({
          title: "Payment Successful!",
          description: `Transaction ID: ${response.razorpay_payment_id}. You are now enrolled.`,
        });
        setIsProcessing(false);
        form.reset();
      },
      prefill: {
        name: data.name,
        email: data.email,
        contact: data.phone,
      },
      theme: {
        color: "#2563eb", // Professional Blue
      },
      modal: {
        ondismiss: function () {
          setIsProcessing(false);
        },
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Razorpay SDK Error:", err);
      toast({
        title: "Gateway Error",
        description: "Could not open payment gateway. Please check your connection.",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Course Enrollment</h2>
        <p className="text-sm text-gray-500">Complete the form to proceed to secure payment.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormControl><Input placeholder="Full Name" className="h-11" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormControl><Input type="email" placeholder="Email Address" className="h-11" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem>
                <FormControl><Input placeholder="Phone Number" className="h-11" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <FormField control={form.control} name="education" render={({ field }) => (
            <FormItem>
              <FormControl><Input placeholder="Education Background (e.g. B.Tech)" className="h-11" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="selectedCourse" render={({ field }) => (
            <FormItem>
              <FormControl>
                <select 
                  {...field} 
                  className="w-full h-11 px-3 rounded-md border border-input bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="">-- Select a Course --</option>
                  {coursesList.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <Button 
            type="submit" 
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-all shadow-md"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Initializing...</>
            ) : (
              selectedCourseData 
                ? `Pay ₹${selectedCourseData.price.toLocaleString('en-IN')}` 
                : "Proceed to Payment"
            )}
          </Button>

          <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest pt-2">
            Secure Payment via Razorpay
          </p>
        </form>
      </Form>
    </div>
  );
};

export default EnrollmentForm;