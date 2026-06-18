interface LoginPageProps {
  setCurrentPage: (page: string) => void;
}

export function LoginPage({ setCurrentPage }: LoginPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAF8]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Welcome to EcoTrack AI
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-6"
        />

        <button
          onClick={() => setCurrentPage("dashboard")}
          className="w-full bg-[#22C55E] text-white py-3 rounded-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
}