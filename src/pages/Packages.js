// import React, { useContext } from "react";
// import AdminPackages from "../components/user/admin/AdminPackages";
// import UserPackages from "../components/user/UserPackages";
// import { UserLoginContext } from "../context/Context";

// const Packages = (props) => {
//   const login = useContext(UserLoginContext);

//   return (
//     <>
//       <AdminPackages />
      
//     </>
//   );
// };

// export default Packages;


import React, { useContext, useEffect, useState } from "react";
import CardContainerTitle from "../components/UI/titles/CardContainerTitle";
import AddNewPackage from "../components/user/admin/packages/AddNewPackage";
import CategoryContainer from "../components/user/admin/packages/CategoryContainer";
import { UserLoginContext } from "../context/Context";
import socket from "../utils/socket";

const Packages = (props) => {
  const [categories, setCategories] = useState([]);
  const login = useContext(UserLoginContext);

  useEffect(() => {
    fetch("http://localhost:3001/package/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories([...data]);
      });

    socket.on("packageCategories", (data) => {
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
      <CardContainerTitle>PACKAGES</CardContainerTitle>

      {login.user?.name === "admin" ? (
        <AddNewPackage
          categories={categories}
          onAddCategory={onAddCategoryHandler}
        />
      ) : null}

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

export default Packages;
