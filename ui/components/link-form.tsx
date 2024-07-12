export default function LinkForm() {
  return (
    <section className="mx-auto my-10 flex flex-col items-center">
      <div className="rounded-lg bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 p-1">
        <div className="flex flex-col items-center rounded-lg bg-black p-6 text-white">
          <div className="mb-2 text-lg">You&apos;re sending</div>
          <div className="mb-2 text-6xl">2</div>
          <div className="mb-6">1 USD</div>
          <div className="mb-4 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 p-1">
            <div className="flex items-center justify-center space-x-2 rounded-full bg-black p-3">
              <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
                <img src="https://cryptologos.cc/logos/polygon-matic-logo.png" alt="MATIC logo" className="size-6" />
              </div>
              <div>MATIC</div>
              <div className="ml-2">Balance: 4.0</div>
            </div>
          </div>
          <button className="rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 px-6 py-3 text-lg text-black">
            Create Link
          </button>
        </div>
      </div>
    </section>
  );
};
