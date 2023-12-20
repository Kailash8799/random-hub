const Features = () => {
  return (
    <>
      <div className="select-none">
        <h1 className="font-bold text-6xl text-center">Features</h1>
        <div className="img-container md:hidden">
          <img
            src="https://www.monkey.app/assets/images/home/21@3x.png"
            alt=""
            className="img-container"
          />
        </div>
        <div className="features flex mt-7 py-4 items-center md:mx-2 xl:mx-28 md:bg-slate-200/40 lg:mx-3 rounded-2xl">
          <div className="img-container text flex-col m-7 mt-0">
            <img
              className="w-10 img-container"
              src="https://www.monkey.app/assets/images/home/icon-video@3x.png"
              alt=""
            />
            <div className="my-5">
              <h1 className="font-bold text-3xl ">
                Embark on a Journey of Spontaneous Connections
              </h1>
              <p className="text-black/50 ">
                Omegle, the pioneer of anonymous online interactions, offers a
                suite of features designed to enhance your virtual
                conversations. Immerse yourself in the thrill of Random Video
                Chat, where each connection is an adventure into the unknown,
                promising exciting encounters with individuals from diverse
                corners of the globe.
              </p>
            </div>
            <div>
              <h1 className="font-bold text-3xl ">
                Tailor Your Journey, Your Way
              </h1>
              <p className="text-black/50">
                Omegle's innovation goes beyond chance encounters with its
                personalized features. Navigate the platform with precision by
                adding your interests, ensuring that every chat aligns with your
                preferences. Delve into themed discussions with like-minded
                individuals, elevating your interactions beyond the ordinary.
              </p>
            </div>
          </div>
          <div className="md:block hidden img-container">
            <img
              src="https://www.monkey.app/assets/images/home/21@3x.png"
              className="img-container"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
