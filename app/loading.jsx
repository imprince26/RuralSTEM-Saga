import { InlineLoader } from '@/components/ui/loader';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <InlineLoader 
        message="Loading page..." 
        size="lg" 
        className="py-12"
      />
    </div>
  );
}