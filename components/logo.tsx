import Image from 'next/image';

const Logo = () => {
  return (
    <Image
      src="/logo.svg"
      alt="Higher Technology Institute Logo"
      width={45}
      height={45}
      className="bg-white rounded-md p-1"
    />
  );
};

export default Logo;
