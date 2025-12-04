import Image from "next/image";

interface props {
  text: string;
}

const Index_h2 = ({ text }: props) => {
  return (
    <div>
      <h2>{text}</h2>;
      <Image src="/assets/bottom_line.png" alt="party pic" width={1920} height={300} className="w-full h-auto" />;
    </div>
  );
};

export default Index_h2;
