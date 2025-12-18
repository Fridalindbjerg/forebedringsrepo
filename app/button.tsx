type Props = {
  text: string;
  type?: "button" | "submit" | "reset";
};

//hej test 379

const Button = ({ text, type }: Props) => {
  return (
    <button
      className="px-6 py-3
        text-xs font-semibold tracking-widest uppercase
        text-white
        border-t border-b border-white
        bg-transparent
        transition-colors duration-200
        hover:bg-white hover:text-black hover:cursor-pointer
         active:bg-white active:text-black
    focus:bg-white focus:text-black"
      type={type}

    >
      {text}
    </button>
  );
};

export default Button;
