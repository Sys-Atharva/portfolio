import { InquiryForm } from '@/components/InquiryForm';
import { motion } from 'framer-motion';

export default function InquiryFormDemo() {
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="min-h-screen bg-[#0B0F19] py-24 px-4"
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
            Get in <span className="text-[#06B6D4]">Touch</span>
          </h1>
          <p className="text-slate-400 max-w-md mx-auto">Bridging complex hardware systems and modern full-stack architectures.</p>
        </motion.div>

        {/* Form Container */}
        <div className="flex justify-center">
          <InquiryForm />
        </div>
      </div>
    </motion.div>
  );
}
