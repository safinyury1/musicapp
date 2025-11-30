import Image from "next/image";

export const Title = ({ children }) => {
  return (
    <span
      className="font-bold text-[20px] text-white font-[Montserrat]"
    >
      {children}
    </span>
  );
};

export const Artist = ({ children }) => {
  return (
    <span
      className="font-regular text-white text-[15px] font-[Montserrat]"
    >
      {children}
    </span>
  );
};

export const Duration = ({ children }) => {
  return (
    <span
      className="font-regular text-[15px] text-white font-[Montserrat]"
    >
      {children}
    </span>
  );
};

export const CurrentDuration = ({ children }) => {
  return (
    <span
      className="font-bold text-[30px] text-[#222629] font-[Montserrat]"
    >
      {children}
    </span>
  );
};

export const Cover = ({ children }) => {
  return (
    <Image
      className="size-14 rounded-[15px]"
      alt="картинка"
      src={children}
      width={56}
      height={56}
    />
  );
};
