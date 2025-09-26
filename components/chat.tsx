import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const phoneNumber = '2348012345678'; // 👈 replace with your WhatsApp number
  const message = 'Hello, I need assistance.'; // 👈 default message

  return (
    <Link
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target='_blank'
      rel='noopener noreferrer'
      className='fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300'
    >
      <FaWhatsapp size={28} />
    </Link>
  );
};

export default WhatsAppButton;
