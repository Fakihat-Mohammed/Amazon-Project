import React from 'react'
import { categoryInfo } from "./categoryFullinfo";
import CategoryCard from './CategoryCard';
import styles from './Category.module.css'
const Category = () => {
  return (
    <section className={styles.category_container}>
      {categoryInfo.map((info,i) => (
        // console.log(info)
        <CategoryCard key={i} data={info}/>
        // <CategoryCard data={info} />;
      ))}
    </section>
  );
}

export default Category
