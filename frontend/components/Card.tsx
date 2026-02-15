import styles from "@/app/page.module.css";

function Card({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className={styles.card}>
      <div className={styles.cardNumber}>{number}</div>
      <h3 className={styles.cardTitle}>{title}</h3>
    </div>
  );
}

export default Card;
