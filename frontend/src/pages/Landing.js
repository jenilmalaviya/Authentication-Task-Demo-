import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary">AuthDemo</span>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-opacity-90"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <div className="bg-auth-gradient bg-opacity-5 py-12 sm:py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Authentication Demo</span>
              <span className="block text-primary mt-2">
                with Role-based Access
              </span>
            </h1>
           
            <div className="mt-8 sm:flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/register">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium px-6 py-3 transition-colors bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none w-full sm:w-auto">
                  Register as Customer
                </button>
              </Link>
              <Link to="/admin/register">
                <button className="inline-flex items-center justify-center rounded-md border border-primary bg-transparent text-primary text-sm  font-medium px-6 py-3 transition-colors hover:bg-white hover:text-black disabled:opacity-50 disabled:pointer-events-none w-full sm:w-auto">
                  Register as Admin
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-primary uppercase tracking-wide">
                Features
              </h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
                Everything you need to get started
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                A complete authentication system with all the features you need.
              </p>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                      />
                    </svg>
                  </div>
                  <div className="mt-5 text-center">
                    <h3 className="text-lg font-medium text-gray-900">
                      Role-based Access
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      Different access levels for customers and administrators.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <div className="mt-5 text-center">
                    <h3 className="text-lg font-medium text-gray-900">
                      Email Verification
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      Secure email verification process for new accounts.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </div>
                  <div className="mt-5 text-center">
                    <h3 className="text-lg font-medium text-gray-900">
                      Secure Authentication
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      Robust form validation and authentication security.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
