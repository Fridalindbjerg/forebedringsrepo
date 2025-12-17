import Image from "next/image";

interface props {
  text: string;
}

const Index_h2 = ({ text }: props) => {
  return (
    <div className="flex flex-col items-center mb-8">
      <h2 className="text-3xl uppercase">{text}</h2>
      <Image
        src="/assets/bottom_line2.png"
        alt="divider"
        width={400}
        height={20}
        className="w-80 h-auto"
      />
    </div>
  );
};

export default Index_h2;
