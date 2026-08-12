import Image from 'next/image';

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
    <div className={`relative mb-4 w-full overflow-hidden rounded-lg bg-bg-elevated ${ASPECT_CLASSES[aspect]}`}>
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, 640px"
        className="object-cover"
      />
    </div>
  );
}