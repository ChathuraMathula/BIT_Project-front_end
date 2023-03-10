import React, { useEffect, useState } from "react";
import AddNewPackage from "./packages/AddNewPackage";
import CategoryContainer from "./packages/CategoryContainer";

const AdminPackages = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/package/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories([...data]);
      });
  }, []);

  const onAddCategoryHandler = (data) => {
    setCategories([...data]);
  };

  const categoriesHandler = (data) => {
    setCategories([...data]);
  };

  return (
    <>
      <AddNewPackage categories={categories} onAddCategory={onAddCategoryHandler}/>

      {categories.map((value, index) => {
        return (
          <CategoryContainer
            category={value.name}
            packages={value.packages}
            key={index}
            categories={categoriesHandler}
          />
        );
      })}
    </>
  );
};

export default AdminPackages;
