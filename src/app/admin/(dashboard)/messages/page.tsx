import { Metadata } from 'next';
import MessagesClient from './MessagesClient';

export const metadata: Metadata = {
  title: 'Hộp thư góp ý | Admin Manna Store',
};

export default function MessagesPage() {
  return <MessagesClient />;
}
