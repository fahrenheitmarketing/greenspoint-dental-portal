import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Sparkles, RotateCcw, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';

const TREATMENTS = [
  { id: 'whitening', label: 'Teeth Whitening', description: 'Bright, white smile' },
  { id: 'veneers', label: 'Porcelain Veneers', description: 'Even, perfect shape' },
  { id: 'implants', label: 'Dental Implants', description: 'Replace missing teeth' },
  { id: 'full', label: 'Full Smile Makeover', description: 'Complete transformation' },
];

export default function SmileSimulator() {
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [treatment, setTreatment] = useState(TREATMENTS[0]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);
    setPhotoUrl(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    setPhoto(file);
    setPhotoUrl(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  };

  const handleSimulate = async () => {
    if (!photo) return;
    setLoading(true);
    setError(null);
    setResult(null);

    // Upload the photo first
    const { file_url } = await base44.integrations.Core.UploadFile({ file: photo });

    // Analyze the face to get a good description for prompting
    const analysis = await base44.integrations.Core.InvokeLLM({
      prompt: `Analyze this dental patient photo. Describe: 1) the person's approximate age range and gender, 2) their skin tone, 3) their hair color and style, 4) the current state of their teeth (color, alignment, any gaps/chips). Be concise and factual. This will be used for a dental smile simulation.`,
      file_urls: [file_url],
      response_json_schema: {
        type: 'object',
        properties: {
          age_range: { type: 'string' },
          gender: { type: 'string' },
          skin_tone: { type: 'string' },
          hair: { type: 'string' },
          current_teeth: { type: 'string' },
        },
      },
    });

    const treatmentPrompts = {
      whitening: 'perfectly whitened, brilliantly white teeth (8-10 shades brighter), natural tooth shape preserved',
      veneers: 'perfect porcelain veneers — beautifully shaped, uniformly white, even spacing, no chips or gaps, Hollywood smile',
      implants: 'complete set of teeth with any missing teeth replaced by natural-looking dental implants, full healthy smile',
      full: 'complete smile makeover: perfectly white, straight, ideally proportioned teeth with flawless porcelain veneers and professional whitening result',
    };

    const { url } = await base44.integrations.Core.GenerateImage({
      prompt: `Professional dental before/after simulation photo. A realistic portrait photo of a ${analysis.age_range} ${analysis.gender} with ${analysis.skin_tone} skin tone and ${analysis.hair} hair, showing a confident smile with ${treatmentPrompts[treatment.id]}. The face should closely match the reference image. Photorealistic, professional dental photography style, soft studio lighting, close-up smile shot. The teeth transformation should be realistic and achievable by modern dentistry.`,
      existing_image_urls: [file_url],
    });

    setResult(url);
    setLoading(false);
  };

  const handleReset = () => {
    setPhoto(null);
    setPhotoUrl(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">Smile Simulator</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Curious what your smile could look like? Upload a photo and our AI will show you a realistic simulation of your smile after treatment — completely free, no commitment required.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Upload + Options */}
          <div className="space-y-6">
            {/* Upload area */}
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => !photoUrl && fileInputRef.current?.click()}
              className={`relative rounded-2xl border-2 border-dashed transition-all overflow-hidden ${
                photoUrl
                  ? 'border-primary/30 cursor-default'
                  : 'border-border hover:border-primary/50 cursor-pointer bg-card hover:bg-primary/5'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              {photoUrl ? (
                <div className="relative">
                  <img src={photoUrl} alt="Your uploaded photo" className="w-full h-72 object-cover" />
                  <button
                    onClick={(e) => { e.stopPropagation(); handleReset(); }}
                    className="absolute top-3 right-3 bg-black/60 text-white rounded-full p-1.5 hover:bg-black/80 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Upload className="w-7 h-7 text-primary" />
                  </div>
                  <p className="font-medium text-foreground mb-1">Upload your photo</p>
                  <p className="text-sm text-muted-foreground">Drag & drop or click to browse. For best results, use a clear, front-facing smile photo.</p>
                </div>
              )}
            </div>

            {/* Treatment selector */}
            <div>
              <p className="text-sm font-medium text-foreground mb-3">Choose a treatment to simulate:</p>
              <div className="grid grid-cols-2 gap-3">
                {TREATMENTS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { setTreatment(t); setResult(null); }}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      treatment.id === t.id
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-border bg-card hover:border-primary/30'
                    }`}
                  >
                    <p className="font-medium text-foreground text-sm">{t.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleSimulate}
              disabled={!photo || loading}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 rounded-full font-semibold"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Simulating your smile…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Simulate My Smile
                </span>
              )}
            </Button>
          </div>

          {/* Right: Result */}
          <div className="min-h-72">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
                    <div className="bg-primary/10 px-4 py-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">Your Smile After {treatment.label}</span>
                    </div>
                    <img src={result} alt="Smile simulation result" className="w-full" />
                  </div>
                  <div className="p-5 rounded-2xl bg-card border border-border">
                    <p className="font-medium text-foreground mb-1">Love what you see?</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      This is just a simulation — book a free consultation and Dr. Bosse will show you exactly what's possible for your smile.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link to="/contact">
                        <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full px-5 font-semibold">
                          Book Free Consultation
                        </Button>
                      </Link>
                      <a href="tel:2818239987">
                        <Button size="sm" variant="outline" className="rounded-full px-5 border-primary/30 text-primary gap-2">
                          <Phone className="w-3.5 h-3.5" />
                          (281) 823-9987
                        </Button>
                      </a>
                    </div>
                  </div>
                  <button onClick={handleReset} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                    <RotateCcw className="w-3.5 h-3.5" /> Try another photo
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-72 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center text-center px-8"
                >
                  <Sparkles className="w-10 h-10 text-muted-foreground/30 mb-3" />
                  <p className="text-muted-foreground text-sm">
                    {loading
                      ? 'Our AI is working on your simulation… this takes about 15–30 seconds.'
                      : 'Your simulated smile will appear here after you upload a photo and click simulate.'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          * AI simulations are for visualization purposes only and do not constitute a clinical assessment. Actual results may vary. Book a consultation for a professional evaluation.
        </p>
      </div>
    </section>
  );
}