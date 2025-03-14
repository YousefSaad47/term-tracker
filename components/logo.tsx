import Image from 'next/image';

const Logo = () => {
  return (
    <Image
      src="/logo.svg"
      alt="Higher Technology Institute Logo"
      width={50}
      height={50}
      className="bg-white rounded-md p-1"
    />
  );
};

export default Logo;
