import './global.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Task Manager - Task Management Application',
  description: 'Efficiently manage your daily tasks and boost productivity',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
