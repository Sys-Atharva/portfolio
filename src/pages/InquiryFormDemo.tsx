import { InquiryForm } from '@/components/InquiryForm';
import { motion } from 'framer-motion';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';

export default function InquiryFormDemo() {
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="relative min-h-screen">
      <FloatingNav />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={pageVariants}
        className="min-h-screen bg-background py-24 px-4"
      >
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Get in <span className="text-crimson-light">Touch</span>
            </h1>
            <p className="text-slate-400 max-w-md mx-auto">Bridging complex hardware systems and modern full-stack architectures.</p>
          </motion.div>

          {/* Form Container */}
          <div className="flex justify-center">
            <InquiryForm />
          </div>
        </div>
      </motion.div>
      <div className="max-w-6xl mx-auto px-6">
        <Footer />
      </div>
    </div>
  );
}
