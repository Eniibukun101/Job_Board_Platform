import Image from "next/image";

export default function Partners() {
  const partners = [
    { src: "/sonyiconpng.png", alt: "Sony", width: 60 },
    { src: "/appleicon.png", alt: "Apple", width: 22 },
    { src: "/googlepayicon.png", alt: "Google Pay", width: 72 },
    { src: "/metaiconpng.png", alt: "Meta", width: 86 },
    { src: "/ataticon.png", alt: "AT&T", width: 82 },
  ];

  return (
    <section className="bg-[#f2f2f2] px-6 py-16">
      <div className="relative mx-auto max-w-[940px] bg-[#20212b] px-16 py-7 text-white">
        <div className="absolute left-0 top-0 h-0 w-0 border-b-[48px] border-l-[78px] border-b-transparent border-l-[#f2f2f2]" />
        <div className="absolute bottom-0 right-0 h-0 w-0 border-r-[86px] border-t-[52px] border-r-[#f2f2f2] border-t-transparent" />
        <p className="text-center text-[11px] font-bold">In partnership with</p>
        <div className="mt-7 flex items-center justify-between gap-8">
          {partners.map((partner) => (
            <Image
              key={partner.alt}
              src={partner.src}
              alt={partner.alt}
              width={partner.width}
              height={28}
              className="h-7 w-auto object-contain brightness-0 invert"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
