import { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { db } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { Magnetic } from '@/components/Magnetic';

const inquirySchema = z.object({
  fullName: z.string().trim().min(3, 'Name must be at least 3 characters').max(100),
  phoneNumber: z.string().regex(/^\d{10}$/, 'Phone must be exactly 10 digits'),
  email: z.string().email('Please enter a valid email address'),
  description: z.string().trim().min(15, 'Description must be at least 15 characters').max(500, 'Description must not exceed 500 characters'),
});

type InquiryData = z.infer<typeof inquirySchema>;
type FieldErrors = Partial<Record<keyof InquiryData, string>>;

function capitalizeName(name: string): string {
  return name.trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

function borderClass(error?: string): string {
  return error
    ? 'border-red-500/50 focus:border-red-400'
    : 'border-slate-800 focus:border-crimson-light';
}

export function InquiryForm() {
  const [form, setForm] = useState<InquiryData>({ fullName: '', phoneNumber: '', email: '', description: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const setField = (field: keyof InquiryData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    const result = inquirySchema.shape[field].safeParse(value);
    setErrors(prev => ({ ...prev, [field]: result.success ? undefined : result.error.errors[0]?.message }));
  };

  const isFormValid = () => inquirySchema.safeParse(form).success;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = inquirySchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.errors) {
        const key = issue.path[0] as keyof InquiryData;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (!db) throw new Error("Firebase not initialized");

      const sanitizedData = { ...result.data, fullName: capitalizeName(result.data.fullName), timestamp: new Date() };
      const docRef = await addDoc(collection(db, "inquiries"), sanitizedData);

      await fetch("https://connect.pabbly.com/webhook-listener/webhook/IjU3NjIwNTY0MDYzNDA0MzI1MjY1NTUzNCI_3D_pc/IjU3NjcwNTZlMDYzNTA0MzE1MjZiNTUzMDUxM2Ei_pc", {
        method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitizedData),
      });

      setSubmitStatus('success');
      setForm({ fullName: '', phoneNumber: '', email: '', description: '' });
      setErrors({});
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: keyof InquiryData) =>
    `w-full px-4 py-3 bg-slate-900 border rounded-lg text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-crimson-light transition-colors duration-300 ${borderClass(errors[field])}`;

  const fields: { key: keyof InquiryData; label: string; type: string; placeholder: string; span: 1 | 2 }[] = [
    { key: 'fullName', label: 'Full Name', type: 'text', placeholder: 'John Doe', span: 1 },
    { key: 'phoneNumber', label: 'Phone Number', type: 'tel', placeholder: '1234567890', span: 1 },
    { key: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com', span: 2 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto px-4"
    >
      <div className="relative">
        <div className="relative bg-slate-900/30 rounded-2xl p-8 md:p-12 border border-slate-800 shadow-2xl">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 text-crimson text-xs font-semibold tracking-wider uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
              Available for Collaboration
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Send a Message</h2>
            <p className="text-slate-400 text-sm mt-2">Share your inquiry or project idea</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {fields.map(({ key, label, type, placeholder, span }) => (
              <div key={key} className={span === 2 ? 'sm:col-span-2' : ''}>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{label}</label>
                <input type={type} placeholder={placeholder} value={form[key]}
                  onChange={e => setField(key, e.target.value)}
                  className={inputClass(key)} />
                {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
              </div>
            ))}

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Description/Query</label>
              <textarea placeholder="Tell me about your project..." rows={4} value={form.description}
                onChange={e => setField('description', e.target.value)}
                className={`${inputClass('description')} resize-none`} />
              {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
            </div>

            <div className="sm:col-span-2 pt-2">
              <Magnetic as="button" type="submit" disabled={isSubmitting || !isFormValid()}
                className="w-full px-6 py-4 bg-crimson hover:bg-crimson-light hover:shadow-lg hover:shadow-crimson/20 text-white font-bold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Magnetic>
            </div>

            {submitStatus === 'success' && (
              <div className="sm:col-span-2 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm text-center">
                ✓ Message sent successfully!
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="sm:col-span-2 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
                ✗ Error sending message. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
}
