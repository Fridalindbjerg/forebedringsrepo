type Props = {
  text: string;
  type?: "button" | "submit" | "reset";
  state?: "default" | "active";
};

// FORBEDRING - GAMMEL KNAP:
// const Button = ({ text, type,  }: Props) => {
//   return (
//     <button
//       className="px-6 py-3
//         text-xs font-semibold tracking-widest uppercase
//         text-white
//         border-t border-b border-white
//         bg-transparent
//         transition-colors duration-200
//         hover:bg-white hover:text-black hover:cursor-pointer
//          active:bg-white active:text-black
//     focus:bg-white focus:text-black"
//       type={type}

//     >
//       {text}
//     </button>
//   );
// };

// NY KNAP MED STATE PROP, SÅ KNAP ÆNDRER UDSEENDE VED FORSKELLIGE STATES:

const Button = ({ text, type, state = "default" }: Props) => {
  return (
    <button
      className={
        state === "active"
          ? `
            px-6 py-3
            text-xs font-semibold tracking-widest uppercase
            text-black
            border-t border-b border-black
            bg-white
            transition-all duration-300
          `
          : `
            px-6 py-3
            text-xs font-semibold tracking-widest uppercase
            text-white
            border-t border-b border-white
            bg-transparent
            transition-all duration-300
            hover:bg-white hover:text-black
          `
      }
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
