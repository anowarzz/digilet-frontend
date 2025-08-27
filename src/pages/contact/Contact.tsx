import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface Contact2Props {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  web?: { label: string; url: string };
}

const Contact = ({
  title = "Get In Touch",
  description = "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  phone = "+88012345",
  email = "contact@digilet.com",
}: Contact2Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Message sent successfully!", {
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      form.reset();
    } catch (error) {
      toast.error("Failed to send message", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-rich-black-25/30 via-princeton-orange-25/20 via-selective-yellow-25/10 to-rich-black-50/20 dark:from-rich-black-950 dark:via-chocolate-cosmos-950/20 dark:via-princeton-orange-950/10 dark:to-rich-black-900/80">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="mb-4 text-2xl md:text-3xl font-bold tracking-tight lg:text-4xl text-custom-blue">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-lg border bg-gradient-to-r from-persimmon-50/50 to-persimmon-25/30 dark:from-persimmon-950/30 dark:to-persimmon-900/20 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex-shrink-0 w-12 h-12 bg-persimmon-100/80 dark:bg-persimmon-900/20 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-persimmon-600 dark:text-persimmon-400" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">{phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-lg border bg-gradient-to-r from-princeton-orange-50/50 to-princeton-orange-25/30 dark:from-princeton-orange-950/30 dark:to-princeton-orange-900/20 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex-shrink-0 w-12 h-12 bg-princeton-orange-100/80 dark:bg-princeton-orange-900/20 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-princeton-orange-600 dark:text-princeton-orange-400" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a
                        href={`mailto:${email}`}
                        className="text-muted-foreground hover:text-princeton-orange-600 dark:hover:text-princeton-orange-400 transition-colors"
                      >
                        {email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-lg border bg-gradient-to-r from-selective-yellow-50/50 to-selective-yellow-25/30 dark:from-selective-yellow-950/30 dark:to-selective-yellow-900/20 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex-shrink-0 w-12 h-12 bg-selective-yellow-100/80 dark:bg-selective-yellow-900/20 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-selective-yellow-600 dark:text-selective-yellow-400" />
                    </div>
                    <div>
                      <p className="font-medium">Office</p>
                      <p className="text-muted-foreground">Dhaka, Bangladesh</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-gradient-to-r from-princeton-orange-25/40 via-selective-yellow-25/35 to-persimmon-25/40 dark:from-princeton-orange-950/20 dark:via-selective-yellow-950/18 dark:to-persimmon-950/20 p-6 rounded-xl border border-princeton-orange-200/50 dark:border-princeton-orange-800/30">
                <h4 className="font-semibold mb-3 text-rich-black-700 dark:text-rich-black-300">
                  Why Choose Us?
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-persimmon-500 rounded-full"></div>
                    24/7 Customer Support
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-sinopia-500 rounded-full"></div>
                    Fast Response Time
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-engineering-orange-500 rounded-full"></div>
                    Expert Team
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-card via-card to-card/95 dark:from-card dark:via-card/98 dark:to-card/90 border border-princeton-orange-200/50 dark:border-princeton-orange-800/30 dark:shadow-2xl dark:shadow-princeton-orange-950/10 rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold mb-6 text-rich-black-700 dark:text-rich-black-900">
                Send us a message
              </h3>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john.doe@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="How can we help you?"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us more about your inquiry..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-princeton-orange-500 hover:bg-princeton-orange-600 text-white"
                    disabled={isSubmitting}
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
