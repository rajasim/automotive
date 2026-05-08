import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

// Required for Razorpay global object
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
      key: "rzp_live_SmAPt9JdFQjkqa", 
      amount: selectedCourseData.price * 100, 
      currency: "INR",
      name: "Auto Intellects",
      description: `Enrollment: ${data.selectedCourse}`,
      image: "/AutoIntellects Logo short v1.png",
      prefill: {
        name: data.name,
        email: data.email,
        contact: data.phone,
      },
      theme: { color: "#2563eb" },
      handler: async function (response: any) {
        document.body.classList.remove('razorpay-opened');
        
        try {
          // --- SEND DATA TO NEON VIA SERVER.JS ---
          const syncResponse = await fetch('https://adminauto-ug37.vercel.app/api/enroll', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: data.name,
              email: data.email,
              phone: data.phone,
              education: data.education,
              program: data.selectedCourse,
              amount: selectedCourseData.price,
              status: "Paid"
            })
          });

          if (syncResponse.ok) {
            toast({
              title: "Success!",
              description: "Payment received and enrollment confirmed.",
            });
            form.reset();
          }
        } catch (error) {
          toast({
            title: "Data Sync Error",
            description: "Payment was successful, but could not update Admin Panel. Please contact support.",
            variant: "destructive"
          });
        } finally {
          setIsProcessing(false);
        }
      },
      modal: {
        ondismiss: function () {
          setIsProcessing(false);
          document.body.classList.remove('razorpay-opened');
        },
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      document.body.classList.add('razorpay-opened');
      rzp.open();
    } catch (error) {
      setIsProcessing(false);
      toast({ title: "Gateway Error", variant: "destructive" });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-3xl shadow-2xl border border-gray-50">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-gray-900">Course Enrollment</h2>
        <p className="text-sm text-gray-500 italic">Complete the form to proceed to payment.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem><FormControl><Input placeholder="Full Name" className="h-12 rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
          )} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormControl><Input type="email" placeholder="Email" className="h-12 rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem><FormControl><Input placeholder="Phone" className="h-12 rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>

          <FormField control={form.control} name="education" render={({ field }) => (
            <FormItem><FormControl><Input placeholder="Current Education (e.g. B.Tech 4th Year)" className="h-12 rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
          )} />

          <FormField control={form.control} name="selectedCourse" render={({ field }) => (
            <FormItem>
              <FormControl>
                <select {...field} className="w-full h-12 px-4 rounded-xl border border-input bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="">Select your Program</option>
                  {coursesList.map((c) => (<option key={c.id} value={c.name}>{c.name} — ₹{c.price.toLocaleString()}</option>))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <Button type="submit" className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all active:scale-[0.98]" disabled={isProcessing}>
            {isProcessing ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : (selectedCourseData ? `Enroll & Pay ₹${selectedCourseData.price.toLocaleString()}` : "Select a Course")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EnrollmentForm;