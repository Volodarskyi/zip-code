import { ZipForm } from '@/components/ZipForm/ZipForm';

import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ZipForm />
      </main>
    </div>
  );
}
