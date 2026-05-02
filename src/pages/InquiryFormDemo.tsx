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
      className="min-h-screen bg-gradient-to-br from-[#0B0B0B] via-[#1A1A1A] to-[#0B0B0B] py-16 px-4"
    >
      {/* Background Grid Effect */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#A1A1A1] to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-light text-[#A1A1A1] tracking-tight mb-4">
            Inquiry Form
          </h1>
        </motion.div>

        {/* Form Container */}
        <div className="flex justify-center">
          <InquiryForm />
        </div>
      </div>
    </motion.div>
  );
}
