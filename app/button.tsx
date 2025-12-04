type Props = {
  text: string;
};

const Button = ({ text }: Props) => {
  return (
    <button
      className="px-6 py-3
        text-xs font-semibold tracking-widest uppercase
        text-white
        border-t border-b border-white
        bg-transparent
        transition-colors duration-200
        hover:bg-white hover:text-black"
    >
      {text}
    </button>
  );
};

export default Button;
