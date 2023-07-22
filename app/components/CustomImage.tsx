import Image from "next/image";

type Props = {
    src: string;
    alt: string;
    priority?: string;
};

export default function CustomImage({ src, alt, priority }: Props) {
    const prty = priority ? true : false;

    console.log(src);

    return (
        <div className="w-full h-full">
            <Image
                src={src}
                className="rounded-lg mx-auto"
                alt={alt}
                width={650}
                height={650}
                priority={prty}
            />
        </div>
    );
}
