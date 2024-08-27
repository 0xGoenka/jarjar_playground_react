import "./loader.css";

export const Loader = ({ title }: { title?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 h-full">
      <div>
        <main>
          <div className="character">
            <div className="half red-half"></div>
            <div className="half black-half"></div>
          </div>
        </main>
        <div className="text-center text-black mt-2">{title}</div>
      </div>
    </div>
  );
};
