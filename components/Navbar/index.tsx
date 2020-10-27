import Link from 'next/link';
import styles from './index.module.scss';

const navList = [
  { title: 'Home', link: '/' },
  { title: 'Auth', link: '/auth' },
  { title: 'User', link: '/user' },
];

const Navbar = () => {
  return (
    <section className={styles.container}>
      <nav>
        <ul>
          {navList.map(({title, link}) => {
            return <li key={link} >
              <Link href={link}><a>{title}</a></Link>
            </li>
          })}
        </ul>
      </nav>
    </section>
  )
};

export default Navbar;
