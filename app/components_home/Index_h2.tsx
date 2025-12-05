import Image from "next/image";

interface props {
  text: string;
}

const Index_h2 = ({ text }: props) => {
  return (
    <div className="place-items-center">
      <h2 className="text-6xl uppercase">{text}</h2>
      <Image src="/assets/bottom_line2.png" alt="party pic" width={1920} height={300} className="w-170 h-auto" />
    </div>
  );
};

export default Index_h2;
