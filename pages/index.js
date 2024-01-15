import Header from './Header';

export default function Home() {
  return (
    <div>
      <div>
        <Header showDropdown={true} />
      </div>
      <div className="min-h-screen lg:flex text-lg">
        {/* left side */}
        <div className="lg:w-1/2 relative z-10 flex flex-col justify-center px-10 lg:px-20 py-20 lg:py-0 text-left">
          <h2 className="inter text-4xl mb-3 font-bold text-gray-800">
            Welcome to roxWealth{" "}
            <span className="block text-red-500 text-2xl font-normal">
              Return on Experience
            </span>
          </h2>
        </div>

        {/* right side */}
        <div className="lg:w-1/2 relative">
          <svg
            className="hidden lg:block text-white fill-current absolute h-full transform -translate-x-1/2 w-48 z-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
          </svg>

          <img
            src="/background.jpg"
            alt="Ocean Image"
            className="lg:absolute object-cover lg:inset-y-0 lg:right-0 lg:h-full lg:w-full"
          />
        </div>
      </div>
    </div>
  );
}
