import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

// Required for TypeScript to recognize the Razorpay global object
declare global {
  interface Window {
    Razorpay: any;
  }
}

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number required'),
  education: z.string().min(2, 'Education info required'),
  selectedCourse: z.string().min(1, 'Please select a course'),
});

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
    defaultValues: { name: '', email: '', phone: '', education: '', selectedCourse: '' }
  });

  const selectedCourseName = form.watch('selectedCourse');
  const selectedCourseData = coursesList.find(c => c.name === selectedCourseName);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!selectedCourseData) return;

    setIsProcessing(true);

    const options = {
      key: "rzp_live_SmAPt9JdFQjkqa", // Replace with your key
      amount: selectedCourseData.price * 100, // Amount in paise
      currency: "INR",
      name: "Auto Intellects",
      description: `Enrollment: ${data.selectedCourse}`,
      image: "/AutoIntellects Logo short v1.png",
      remember_customer: true,
      modal: {
        ondismiss: function () {
          setIsProcessing(false);
          document.body.classList.remove('razorpay-opened');
        },
        backdropclose: false,
        escape: false,
        handleback: true, 
      },
      prefill: {
        name: data.name,
        email: data.email,
        contact: data.phone,
      },
      theme: {
        color: "#2563eb", 
      },
      handler: function (response: any) {
        document.body.classList.remove('razorpay-opened');
        toast({
          title: "Payment Successful",
          description: `Transaction ID: ${response.razorpay_payment_id}`,
        });
        setIsProcessing(false);
        form.reset();
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      
      // Critical: Add class to body to fix mobile touch/scroll issues
      document.body.classList.add('razorpay-opened');
      
      rzp.open();
    } catch (error) {
      document.body.classList.remove('razorpay-opened');
      setIsProcessing(false);
      toast({
        title: "Error",
        description: "Payment gateway failed to load.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Enrollment Form</h2>
        <p className="text-sm text-gray-500 italic">Fill details to proceed to secure payment.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem><FormControl><Input placeholder="Full Name" className="h-11" {...field} /></FormControl><FormMessage /></FormItem>
          )} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormControl><Input type="email" placeholder="Email" className="h-11" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem><FormControl><Input placeholder="Phone" className="h-11" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>

          <FormField control={form.control} name="education" render={({ field }) => (
            <FormItem><FormControl><Input placeholder="Education" className="h-11" {...field} /></FormControl><FormMessage /></FormItem>
          )} />

          <FormField control={form.control} name="selectedCourse" render={({ field }) => (
            <FormItem>
              <FormControl>
                <select {...field} className="w-full h-11 px-3 rounded-md border border-input bg-white text-sm outline-none">
                  <option value="">Select a Course</option>
                  {coursesList.map((c) => (<option key={c.id} value={c.name}>{c.name}</option>))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold" disabled={isProcessing}>
            {isProcessing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : (selectedCourseData ? `Pay ₹${selectedCourseData.price.toLocaleString()}` : "Proceed to Payment")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EnrollmentForm;