import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Globe, Github, Linkedin, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FormData {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const easeExpoOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: easeExpoOut },
  }),
};

const rightBlockVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: easeExpoOut },
  }),
};

const inputClasses =
  'w-full bg-[#1A2235] border border-[#1A2235] text-[#F0EDE6] px-4 py-[0.875rem] text-[1rem] font-body placeholder:text-[#5A6375] outline-none transition-all duration-200 focus:border-[#D4A853] focus:shadow-[0_0_0_1px_#D4A853]';

const labelClasses = 'text-caption text-[#5A6375] mb-2 block';

export default function ContactForm() {
  const formRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const [formData, setFormData] = useState<FormData>({ nombre: '', email: '', asunto: '', mensaje: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.nombre.trim()) newErrors.nombre = t.contactForm.validationNameRequired;
    if (!formData.email.trim()) {
      newErrors.email = t.contactForm.validationEmailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.contactForm.validationEmailInvalid;
    }
    if (!formData.asunto.trim()) newErrors.asunto = t.contactForm.validationCollabRequired;
    if (!formData.mensaje.trim()) {
      newErrors.mensaje = t.contactForm.validationMessageRequired;
    } else if (formData.mensaje.trim().length < 10) {
      newErrors.mensaje = t.contactForm.validationMessageMin;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('https://contact-form.yonatanguerrero430.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Server error');
      setStatus('success');
      setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const getButtonContent = () => {
    switch (status) {
      case 'submitting':
        return (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-[#0A0E1A] border-t-transparent rounded-full animate-spin" />
            {t.contactForm.submitting}
          </span>
        );
      case 'success':
        return <span className="flex items-center justify-center gap-2">{t.contactForm.success}</span>;
      case 'error':
        return <span className="flex items-center justify-center gap-2">{t.contactForm.error}</span>;
      default:
        return (
          <span className="flex items-center justify-center gap-2">
            {t.contactForm.submitBtn}
            <ArrowRight className="w-4 h-4" />
          </span>
        );
    }
  };

  const getButtonClasses = () => {
    const base = 'w-full py-[0.875rem] px-8 text-[0.875rem] font-semibold uppercase tracking-[0.06em] transition-all duration-300';
    switch (status) {
      case 'success': return `${base} bg-[#10B981] text-[#0A0E1A]`;
      case 'error': return `${base} bg-[#EF4444] text-[#F0EDE6]`;
      default: return `${base} bg-[#D4A853] text-[#0A0E1A] hover:bg-[#8B6914] hover:shadow-[0_0_20px_rgba(212,168,83,0.3)]`;
    }
  };

  const ProfessionalLink = ({ href, icon: Icon, label }: { href: string; icon: typeof Globe; label: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 py-2 border-b border-[#1A2235] transition-colors duration-300 hover:text-[#D4A853]"
    >
      <Icon className="w-5 h-5 text-[#D4A853] shrink-0" />
      <div className="flex-1 min-w-0">
        <span className="text-[1rem] text-[#F0EDE6] group-hover:text-[#D4A853] transition-colors duration-300 block truncate">
          {label}
        </span>
      </div>
      <ArrowRight className="w-4 h-4 text-[#5A6375] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
    </a>
  );

  return (
    <section ref={formRef} className="bg-[#0A0E1A] py-24 md:py-32 lg:py-48">
      <div className="max-container container-padding">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* LEFT: FORM */}
          <motion.div
            className="w-full lg:w-[55%]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <h2 className="text-heading-lg text-[#F0EDE6] mb-6">
              {t.contactForm.heading}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name */}
              <motion.div custom={0} variants={fieldVariants}>
                <label htmlFor="nombre" className={labelClasses}>{t.contactForm.nameLabel}</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder={t.contactForm.namePlaceholder}
                  value={formData.nombre}
                  onChange={handleChange}
                  className={inputClasses}
                  autoComplete="name"
                />
                <AnimatePresence>
                  {errors.nombre && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="mt-1 text-[0.75rem] text-[#EF4444]">
                      {errors.nombre}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Email */}
              <motion.div custom={1} variants={fieldVariants}>
                <label htmlFor="email" className={labelClasses}>{t.contactForm.emailLabel}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses}
                  autoComplete="email"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="mt-1 text-[0.75rem] text-[#EF4444]">
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Collaboration type */}
              <motion.div custom={2} variants={fieldVariants}>
                <label htmlFor="asunto" className={labelClasses}>{t.contactForm.collabLabel}</label>
                <select
                  id="asunto"
                  name="asunto"
                  value={formData.asunto}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, asunto: e.target.value }));
                    if (errors.asunto) setErrors((prev) => ({ ...prev, asunto: undefined }));
                  }}
                  className={`${inputClasses} appearance-none cursor-pointer`}
                >
                  <option value="" disabled>{t.contactForm.collabPlaceholder}</option>
                  <option value="academica">{t.contactForm.options.academic}</option>
                  <option value="edtech">{t.contactForm.options.edtech}</option>
                  <option value="consultoria">{t.contactForm.options.consulting}</option>
                  <option value="stem">{t.contactForm.options.stem}</option>
                  <option value="otra">{t.contactForm.options.other}</option>
                </select>
                <AnimatePresence>
                  {errors.asunto && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="mt-1 text-[0.75rem] text-[#EF4444]">
                      {errors.asunto}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Message */}
              <motion.div custom={3} variants={fieldVariants}>
                <label htmlFor="mensaje" className={labelClasses}>{t.contactForm.messageLabel}</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={6}
                  placeholder={t.contactForm.messagePlaceholder}
                  value={formData.mensaje}
                  onChange={handleChange}
                  className={`${inputClasses} resize-none`}
                />
                <AnimatePresence>
                  {errors.mensaje && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="mt-1 text-[0.75rem] text-[#EF4444]">
                      {errors.mensaje}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit */}
              <motion.div custom={4} variants={fieldVariants} className="mt-4">
                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={getButtonClasses()}
                  whileHover={status === 'idle' ? { scale: 1.01 } : {}}
                  whileTap={status === 'idle' ? { scale: 0.99 } : {}}
                  transition={{ duration: 0.2 }}
                >
                  {getButtonContent()}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          {/* RIGHT: INFO */}
          <div className="w-full lg:w-[45%]">
            {/* Direct Contact */}
            <motion.div
              custom={0} variants={rightBlockVariants}
              initial="hidden" whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="mb-10"
            >
              <h3 className="text-caption text-[#5A6375] mb-6">{t.contactForm.directContactLabel}</h3>
              <div className="space-y-3">
                <a href="mailto:contacto@drguerrero.dev" className="group flex items-center gap-3 py-1">
                  <Mail className="w-5 h-5 text-[#D4A853] shrink-0" />
                  <span className="text-[1rem] text-[#F0EDE6] group-hover:text-[#D4A853] group-hover:underline transition-colors duration-300">
                    contacto@drguerrero.dev
                  </span>
                </a>
                <div className="flex items-center gap-3 py-1">
                  <MapPin className="w-5 h-5 text-[#D4A853] shrink-0" />
                  <span className="text-body-sm text-[#9BA3AF]">{t.contactForm.location}</span>
                </div>
              </div>
            </motion.div>

            {/* Professional Links */}
            <motion.div
              custom={1} variants={rightBlockVariants}
              initial="hidden" whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="mb-10"
            >
              <h3 className="text-caption text-[#5A6375] mb-6">{t.contactForm.professionalLinksLabel}</h3>
              <div className="space-y-1">
                <ProfessionalLink href="https://digitalmathematics.org" icon={Globe} label="Digital Mathematics" />
                <ProfessionalLink href="https://github.com/JonatanGS777" icon={Github} label="GitHub" />
                <ProfessionalLink href="https://www.linkedin.com/in/yonatan-guerrero-soriano-6b3729136/" icon={Linkedin} label="LinkedIn" />
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              custom={2} variants={rightBlockVariants}
              initial="hidden" whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="text-caption text-[#5A6375] mb-4">{t.contactForm.availabilityLabel}</h3>
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
                </span>
                <span className="text-body-sm text-[#9BA3AF]">{t.contactForm.availabilityStatus}</span>
              </div>
              <p className="mt-2 text-body-sm text-[#5A6375]">
                {t.contactForm.availabilityDetail}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
