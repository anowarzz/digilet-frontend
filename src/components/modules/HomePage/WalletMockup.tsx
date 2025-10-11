import digiletMockup from "@/assets/images/digilet-mockup.png";
import { motion } from "framer-motion";

const WalletMockup = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl z-0" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl z-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-10 lg:mb-0"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Your Digital Wallet,{" "}
              <span className="text-primary dark:text-custom-blue">
                Reimagined
              </span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
              Store, send, and manage your money with confidence. Digilet offers
              a seamless, secure, and modern wallet experience for everyone.
            </p>
            <ul className="space-y-4 text-base lg:text-lg">
              <li className="flex items-center gap-3">
                <span className="inline-block w-2 h-2 rounded-full bg-purple-500" />
                Instant money transfers & easy top-ups
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-block w-2 h-2 rounded-full bg-indigo-500" />
                Track transactions in real time
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-block w-2 h-2 rounded-full bg-pink-500" />
                Bank-level security & privacy
              </li>
            </ul>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative w-full flex justify-center">
              <img
                src={digiletMockup}
                alt="Digilet Wallet Mockup"
                className="w-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[320px] h-auto rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WalletMockup;
