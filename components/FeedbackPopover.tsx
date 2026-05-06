import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UploadCloud, CheckCircle } from "lucide-react";

export default function FeedbackPopover({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Mock interacting outside to prevent close doesn't perfectly work with Radix Popover 
  // without a controlled open state, so we'll control it manually to ensure they don't accidentally close it
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    if (email && name && description) {
      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setTimeout(() => {
          setSubmitted(false);
          setEmail("");
          setName("");
          setDescription("");
          setImages([]);
        }, 300);
      }, 2000);
    }
  };

  const handleImageUpload = () => {
    if (images.length < 3) {
      setImages([...images, `image-${images.length + 1}.png`]);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent 
        className="w-96 p-4" 
        align="end" 
        sideOffset={8}
        onInteractOutside={(e) => {
          // Prevent closing if they have started typing
          if (email || name || description || images.length > 0) {
            e.preventDefault();
          }
        }}
      >
        <h4 className="font-semibold text-sm mb-4">Earn $100 for feedback</h4>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <CheckCircle className="text-green-500 mb-2" size={32} />
            <p className="text-sm font-medium">Feedback submitted!</p>
            <p className="text-xs text-muted-foreground mt-1">Thank you. We'll be in touch.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium mb-1 block">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded-md outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Email</label>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded-md outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
            
            <div>
              <label className="text-xs font-medium mb-1 block">Improvement or bug description</label>
              <textarea
                placeholder="Describe the issue or suggestion in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-md outline-none focus:border-primary transition-colors min-h-[100px] resize-y"
              />
            </div>

            <div>
              <label className="text-xs font-medium mb-1 block flex justify-between">
                <span>Upload Images</span>
                <span className="text-muted-foreground">{images.length}/3</span>
              </label>
              <div className="flex gap-2">
                {images.length < 3 && (
                  <button 
                    onClick={handleImageUpload}
                    className="w-16 h-16 flex flex-col items-center justify-center border border-dashed rounded-md text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    <UploadCloud size={16} />
                  </button>
                )}
                {images.map((img, i) => (
                  <div key={i} className="w-16 h-16 border rounded-md flex items-center justify-center bg-muted text-[10px] relative overflow-hidden">
                    <span className="truncate px-1">{img}</span>
                    <button 
                      onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                      className="absolute top-0 right-0 bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-bl-sm hover:bg-red-600"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:opacity-90 transition-opacity mt-2"
              disabled={!email || !name || !description}
            >
              Submit Feedback
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
