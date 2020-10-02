import React from "react";

const About = () => {
  document.title = "CarBook - O nas";
  return (
    <div className="About">
      <div className="About__title">
        <div className="About__cont">
          <h1 className="hover">O</h1>
          <h1 className="hover">&nbsp;</h1>
          <h1 className="hover">N</h1>
          <h1 className="hover">A</h1>
          <h1 className="hover">S</h1>
        </div>
      </div>
      <div className="About__content">
        <h3>
          We have extensive experience in the automotive industry. We deal with import
          cars from abroad. We have a wide selection of cars. Both
          affordable and more luxurious with lavish brands
          equipped interior. Everyone will find something for themselves. All of them
          Our cars are in perfect condition and everyone has
          important technical inspection and all necessary documentation.
          We invite you to familiarize yourself with a wide range of cars
          available on our website.
        </h3>
      </div>
    </div>
  );
};

export default About;
