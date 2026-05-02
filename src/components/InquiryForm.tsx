import { useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';

export function InquiryForm() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{
    fullName?: string;
    phoneNumber?: string;
    email?: string;
    description?: string;
  }>({});

  // Allowed common providers for strict validation
  const ALLOWED_DOMAINS = [
    'gmail.com',
    'outlook.com',
    'yahoo.com',
    'icloud.com',
    'hotmail.com',
  ];

  // Block known generic or placeholder domains
  const BLOCKED_DOMAINS = [
    'domain.com',
    'test.com',
    'example.com',
    'xyz.com',
    'placeholder.com',
    'fake.com',
    'dummy.com',
    'temp.com',
    'spam.com',
  ];

  const isCustomCompanyDomain = (domain: string): boolean => {
    if (!domain || domain.split('.').length < 2) return false;
    const root = domain.split('.')[0].toLowerCase();
    const blockedRoots = BLOCKED_DOMAINS.map(blocked => blocked.split('.')[0]);
    return !blockedRoots.includes(root) && !BLOCKED_DOMAINS.includes(domain.toLowerCase());
  };

  // Validation Functions
  const validateEmail = (email: string): string | undefined => {
    if (!email) return 'Email is required';
    
    // Regex for proper email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email (e.g., name@domain.com)';
    }

    const [localPart, domain] = email.toLowerCase().split('@');
    if (!domain) {
      return 'Please enter a valid email (e.g., name@domain.com)';
    }

    const isAllowedProvider = ALLOWED_DOMAINS.includes(domain);
    const isAllowedCompany = isCustomCompanyDomain(domain);

    if (BLOCKED_DOMAINS.includes(domain)) {
      return 'Invalid domain. Please use a personal (Gmail/Outlook) or work email address.';
    }

    if (!isAllowedProvider && !isAllowedCompany) {
      return 'Invalid domain. Please use a personal (Gmail/Outlook) or work email address.';
    }

    // Reject local parts that are repeating characters only, like aaaa@gmail.com
    const localFloodRegex = /^(.)\1{2,}$/;
    if (localFloodRegex.test(localPart)) {
      return 'Please use a valid email address.';
    }

    return undefined;
  };

  const validatePhone = (phone: string): string | undefined => {
    if (!phone) return 'Phone number is required';
    // Regex for exactly 10 digits
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
      return 'Phone must be exactly 10 digits (numbers only)';
    }
    return undefined;
  };

  // Detect character flooding (4+ identical characters in a row)
  const detectCharacterFlooding = (text: string): boolean => {
    const floodRegex = /(.)\1{3,}/; // Detects 4+ repeated characters
    return floodRegex.test(text);
  };

  const validateName = (name: string): string | undefined => {
    if (!name) return 'Full name is required';
    
    // Check minimum 3 characters and only letters (including spaces)
    const nameRegex = /^[a-zA-Z\s]{3,}$/;
    if (!nameRegex.test(name.trim())) {
      return 'Name must be at least 3 characters, letters and spaces only (no numbers)';
    }

    // Check for character flooding
    if (detectCharacterFlooding(name)) {
      return 'Name contains too many repeated characters';
    }
    
    return undefined;
  };

  const validateDescription = (desc: string): string | undefined => {
    if (!desc) return 'Description is required';
    
    // Check minimum length
    if (desc.trim().length < 15) {
      return 'Description must be at least 15 characters';
    }
    
    if (desc.length > 500) {
      return 'Description must not exceed 500 characters';
    }

    // Anti-spam: Check for at least 3 unique words
    const words = desc.trim().toLowerCase().split(/\s+/);
    const uniqueWords = new Set(words);
    
    if (uniqueWords.size < 3) {
      return 'Description must contain at least 3 unique words';
    }

    // Check for character flooding (4+ repeated characters)
    if (detectCharacterFlooding(desc)) {
      return 'Description contains too many repeated characters';
    }

    return undefined;
  };

  // Sanitization and formatting functions
  const sanitizeInput = (input: string): string => {
    return input.trim();
  };

  // Capitalize first letter of each word in name
  const capitalizeName = (name: string): string => {
    return name
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Check if all fields are valid
  const isFormValid = (): boolean => {
    return (
      !validateEmail(email) &&
      !validatePhone(phoneNumber) &&
      !validateName(fullName) &&
      !validateDescription(description)
    );
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    const nameError = validateName(fullName);
    if (nameError) newErrors.fullName = nameError;

    const phoneError = validatePhone(phoneNumber);
    if (phoneError) newErrors.phoneNumber = phoneError;

    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;

    const descError = validateDescription(description);
    if (descError) newErrors.description = descError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Sanitize and format all inputs before sending to Firestore
      const sanitizedData = {
        fullName: capitalizeName(fullName),
        phoneNumber: sanitizeInput(phoneNumber),
        email: sanitizeInput(email),
        description: sanitizeInput(description),
        timestamp: new Date(),
      };

      // 1. Save to Firebase (already done)
      const docRef = await addDoc(collection(db, "inquiries"), sanitizedData);

      // 2. Ping Pabbly (The "Free" Bypass)
      await fetch("https://connect.pabbly.com/webhook-listener/webhook/IjU3NjIwNTY0MDYzNDA0MzI1MjY1NTUzNCI_3D_pc/IjU3NjcwNTZlMDYzNTA0MzE1MjZiNTUzMDUxM2Ei_pc", {
        method: "POST",
        mode: "no-cors", // Prevents CORS errors
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitizedData),
      });

      console.log('Document written with ID: ', docRef.id);
      alert("Inquiry sent successfully!");

      setSubmitStatus('success');

      // Reset form fields
      setFullName('');
      setPhoneNumber('');
      setEmail('');
      setDescription('');
      setErrors({});

      // Clear success message after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      console.error("Error:", error);
      alert(`Error sending message: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setSubmitStatus('error');

      // Clear error message after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-md mx-auto px-4"
    >
      {/* Glassmorphism Card */}
      <div className="relative">
        {/* Border Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-br from-[#A1A1A1] to-[#0B0B0B] rounded-2xl opacity-20 blur-md" />
        
        {/* Main Card */}
        <div className="relative bg-gradient-to-br from-[#1A1A1A] to-[#0B0B0B] rounded-2xl p-8 backdrop-blur-xl border border-[#A1A1A1]/20 shadow-2xl">
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl md:text-3xl font-light text-[#A1A1A1] tracking-tight">
              Let's Connect
            </h2>
            <p className="text-[#A1A1A1]/60 text-sm mt-2">
              Share your inquiry or project idea
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <motion.div variants={itemVariants}>
              <label className="block text-[#A1A1A1] text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  // Real-time validation
                  const nameError = validateName(e.target.value);
                  setErrors(prev => ({
                    ...prev,
                    fullName: nameError,
                  }));
                }}
                className={`w-full px-4 py-3 bg-[#0B0B0B]/50 border rounded-lg text-[#A1A1A1] placeholder-[#A1A1A1]/40 focus:outline-none transition-all duration-300 ${
                  errors.fullName 
                    ? 'border-red-500/50 focus:border-red-400 focus:ring-1 focus:ring-red-400/50' 
                    : 'border-[#A1A1A1]/30 focus:border-[#A1A1A1] focus:ring-1 focus:ring-[#A1A1A1]/50'
                }`}
              />
              {errors.fullName && (
                <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
              )}
            </motion.div>

            {/* Phone Number */}
            <motion.div variants={itemVariants}>
              <label className="block text-[#A1A1A1] text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  // Real-time validation
                  const phoneError = validatePhone(e.target.value);
                  setErrors(prev => ({
                    ...prev,
                    phoneNumber: phoneError,
                  }));
                }}
                className={`w-full px-4 py-3 bg-[#0B0B0B]/50 border rounded-lg text-[#A1A1A1] placeholder-[#A1A1A1]/40 focus:outline-none transition-all duration-300 ${
                  errors.phoneNumber 
                    ? 'border-red-500/50 focus:border-red-400 focus:ring-1 focus:ring-red-400/50' 
                    : 'border-[#A1A1A1]/30 focus:border-[#A1A1A1] focus:ring-1 focus:ring-[#A1A1A1]/50'
                }`}
              />
              {errors.phoneNumber && (
                <p className="text-red-400 text-xs mt-1">{errors.phoneNumber}</p>
              )}
            </motion.div>

            {/* Email Address */}
            <motion.div variants={itemVariants}>
              <label className="block text-[#A1A1A1] text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  // Real-time validation
                  const emailError = validateEmail(e.target.value);
                  setErrors(prev => ({
                    ...prev,
                    email: emailError,
                  }));
                }}
                className={`w-full px-4 py-3 bg-[#0B0B0B]/50 border rounded-lg text-[#A1A1A1] placeholder-[#A1A1A1]/40 focus:outline-none transition-all duration-300 ${
                  errors.email 
                    ? 'border-red-500/50 focus:border-red-400 focus:ring-1 focus:ring-red-400/50' 
                    : 'border-[#A1A1A1]/30 focus:border-[#A1A1A1] focus:ring-1 focus:ring-[#A1A1A1]/50'
                }`}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </motion.div>

            {/* Description/Query */}
            <motion.div variants={itemVariants}>
              <label className="block text-[#A1A1A1] text-sm font-medium mb-2">
                Description/Query
              </label>
              <textarea
                placeholder="Tell me about your project..."
                rows={4}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  // Real-time validation
                  const descError = validateDescription(e.target.value);
                  setErrors(prev => ({
                    ...prev,
                    description: descError,
                  }));
                }}
                className={`w-full px-4 py-3 bg-[#0B0B0B]/50 border rounded-lg text-[#A1A1A1] placeholder-[#A1A1A1]/40 focus:outline-none transition-all duration-300 resize-none ${
                  errors.description 
                    ? 'border-red-500/50 focus:border-red-400 focus:ring-1 focus:ring-red-400/50' 
                    : 'border-[#A1A1A1]/30 focus:border-[#A1A1A1] focus:ring-1 focus:ring-[#A1A1A1]/50'
                }`}
              />
              {errors.description && (
                <p className="text-red-400 text-xs mt-1">{errors.description}</p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || !isFormValid()}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#A1A1A1] to-[#C9C9C9] text-[#0B0B0B] font-medium rounded-lg hover:shadow-lg hover:shadow-[#A1A1A1]/50 hover:from-[#C9C9C9] hover:to-[#A1A1A1] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </motion.div>

            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm text-center"
              >
                ✓ Message sent successfully!
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center"
              >
                ✗ Error sending message. Please try again.
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
}
