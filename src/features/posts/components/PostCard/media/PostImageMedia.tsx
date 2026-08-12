import Image from "next/image";

export interface PostImageMediaProps {
  image: string;
  alt: string;
  aspect?: '4:5' | '5:3' | '16:9';
}

const ASPECT_CLASSES: Record<'4:5' | '5:3' | '16:9', string> = {
  '4:5': 'aspect-[4/5]',
  '5:3': 'aspect-[5/3]',
  '16:9': 'aspect-video',
};

export function PostImageMedia({ image, alt, aspect = '16:9' }: PostImageMediaProps) {
  return (
    <div className="mb-4 w-fullmin-w-35 overflow-hidden rounded-lg bg-bg-elevated">
      <Image src={image} alt={alt} loading="lazy" className={`${ASPECT_CLASSES[aspect]} w-full object-cover`} />
    </div>
  );
}