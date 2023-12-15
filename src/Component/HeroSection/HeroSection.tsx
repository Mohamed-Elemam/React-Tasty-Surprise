const HeroSection = () => {
  return (
    <>
      <div className="hero-section text-white">
        <div className="layer">
          <h1 className="text-5xl font-bold capitalize">tasty surprise</h1>
          <p className="text-2xl font-semibold w-[75%] text-center">
            Welcome to Tasty Surprise, your go-to source for discovering
            delicious recipes from various cuisines around the world.
          </p>
          <a
            className="btn btn-warning cursor-pointer animate-bounce"
            href="#section2"
          >
              Discover a New Recipes!
          </a>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
