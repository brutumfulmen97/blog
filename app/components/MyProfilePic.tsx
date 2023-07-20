import Image from "next/image";

export default function MyProfilePic() {
    return (
        <section className="w-full mx-auto">
            <Image
                src={"/images/slika.png"}
                alt="profile photo"
                width={200}
                height={200}
                priority={true}
                className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8 aspect-square object-cover"
            />
        </section>
    );
}
