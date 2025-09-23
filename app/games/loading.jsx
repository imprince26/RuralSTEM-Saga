import { InlineLoader } from '@/components/ui/loader';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <InlineLoader 
        message="Loading games..." 
        size="lg" 
        className="py-16"
      />
    </div>
  );
}