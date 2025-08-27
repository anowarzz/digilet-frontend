import userIcon from "@/assets/images/user.png";
import Logo from "@/assets/Logos/Logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  CheckCircle,
  DollarSign,
  Globe,
  Linkedin,
  Mail,
  Shield,
  Users,
  Zap,
} from "lucide-react";

const About = () => {
  const services = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Digital Money Transfer",
      description:
        "Send money instantly across Bangladesh with real-time tracking and notifications.",
    },
    {
      icon: <Zap className="h-8 w-8 text-green-600" />,
      title: "Agent Banking",
      description:
        "Access cash-in and cash-out services through our extensive network of trusted agents.",
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Merchant Payments",
      description:
        "Accept digital payments from customers with secure and seamless transaction processing.",
    },
    {
      icon: <DollarSign className="h-8 w-8 text-orange-600" />,
      title: "Bill Payments",
      description:
        "Pay utility bills, mobile recharges, and other services with just a few taps.",
    },
  ];

  const stats = [
    { label: "Active Users", value: "100K+" },
    { label: "Daily Transactions", value: "50K+" },
    { label: "Agent Locations", value: "500+" },
    { label: "Success Rate", value: "99.9%" },
  ];

  const values = [
    {
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
      title: "Trust & Security",
      description:
        "Building trust through secure, transparent, and reliable financial services.",
    },
    {
      icon: <Globe className="h-6 w-6 text-blue-600" />,
      title: "Financial Inclusion",
      description:
        "Making digital financial services accessible to everyone, everywhere.",
    },
    {
      icon: <Award className="h-6 w-6 text-purple-600" />,
      title: "Innovation",
      description:
        "Continuously innovating to provide cutting-edge financial solutions.",
    },
  ];

  const teamMembers = [
    {
      name: "MD. Anowar Hosen",
      position: "CEO & Founder",
      image:
        "https://res.cloudinary.com/dkndlqam0/image/upload/v1756301095/cutout-outlined-blue_1_sdao4u.jpg",
      bio: "Visionary leader with 15+ years in fintech, passionate about digital transformation in Bangladesh.",
      linkedin: "#",
    },
    {
      name: "Fatima Khan",
      position: "CTO",
      image: userIcon,
      bio: "Technology expert specializing in secure payment systems and blockchain solutions.",
      linkedin: "#",
    },
    {
      name: "Mohammad Islam",
      position: "Head of Operations",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "Operations specialist ensuring seamless service delivery across our agent network.",
      linkedin: "#",
    },
    {
      name: "Ayesha Begum",
      position: "Head of Customer Success",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Dedicated to providing exceptional user experience and building lasting customer relationships.",
      linkedin: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-custom-blue/5 dark:bg-gradient-to-br dark:from-rich-black-300 dark:via-rich-black-400 dark:to-rich-black-300">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="bg-primary text-primary-foreground border-primary/20 hover:bg-primary/90 transition-colors duration-200 mb-4"
            >
              About Digilet
            </Badge>
            <motion.h1
              className="text-pretty text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-myGreen dark:text-custom-blue mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Empowering Digital Financial Transactions
            </motion.h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto lg:text-xl">
              Digilet is Bangladesh's leading digital financial services
              platform, connecting millions through secure, instant money
              transfers, agent banking, and comprehensive financial solutions.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <Logo />
          </div>
        </div>
      </section>

      {/* Service Story Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Our Story
            </Badge>
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Revolutionizing Digital Finance in Bangladesh
            </motion.h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Founded in 2020, Digilet emerged from a simple vision: to make
              financial services accessible to every Bangladeshi, regardless of
              their location or economic status. What started as a small team of
              fintech enthusiasts has grown into Bangladesh's most trusted
              digital financial platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <p className="text-muted-foreground text-lg leading-relaxed max-w-4xl mx-auto">
              Today, Digilet serves over 100,000 active users daily, processing
              millions of transactions through our extensive network of 500+
              agent locations across Bangladesh. Our journey is driven by
              innovation, security, and an unwavering commitment to financial
              inclusion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <motion.h2
                className="text-3xl font-bold text-gray-900 dark:text-white"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Our Mission
              </motion.h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To revolutionize Bangladesh's financial landscape by providing
                accessible, secure, and innovative digital financial services
                that empower individuals and businesses to thrive in the digital
                economy.
              </p>
              <div className="space-y-4">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {value.icon}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <motion.div
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-custom-blue/10 p-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-myGreen dark:text-custom-blue mb-2">
                        {stat.value}
                      </div>
                      <div className="text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Our Team
            </Badge>
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Meet the People Behind Digilet
            </motion.h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our diverse team of experts combines decades of experience in
              fintech, technology, and financial services to deliver exceptional
              digital solutions.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                      {member.position}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {member.bio}
                    </p>
                    <div className="flex justify-center gap-3">
                      <Button variant="outline" size="sm" className="p-2">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="p-2">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Join Digilet?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of thousands of users who trust Digilet for their
              digital financial needs. Download our app today and experience the
              future of digital banking in Bangladesh.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Get Started Now
                <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-custom-blue text-custom-blue hover:bg-custom-blue hover:text-white transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
