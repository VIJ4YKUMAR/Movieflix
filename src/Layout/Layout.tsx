import { ReactNode, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, UserIcon } from "@heroicons/react/24/outline";
import ScrollToTopButton from "../Atoms/ScrollToTopButton";
import { Link, useNavigate } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Favorites", href: "/favorite-movies", key: 1 },
  {
    name: <UserIcon className="h-5 w-5 text-black" />,
    key: 2,
  },
];

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    console.log("User logged out");
    setMobileMenuOpen(false);
    setShowLogout(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  }

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  }

  return (
    <div className="font-mono">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1 items-center gap-2">
            <a href="/" className="flex items-center gap-2 -m-1.5 p-1.5">
              <span className="sr-only">Movieflix</span>
              <p className="text-xl font-semibold">Movieflix</p>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={openMobileMenu}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <div key={item.key} className="relative">
                <Link
                  to={item.href || "#"}
                  onClick={item.key === 2 ? toggleLogout : undefined}
                  className="flex items-center gap-x-2"
                >
                  {item.name}
                </Link>
                {showLogout && item.key === 2 && (
                  <button
                    onClick={handleLogout}
                    className="absolute top-full -left-7 mt-2 p-2 border border-gray-800 rounded"
                  >
                    Logout
                  </button>
                )}
              </div>
            ))}
          </div>
        </nav>

        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">MovieFlix</span>
              </a>
              <button
                type="button"
                onClick={closeMobileMenu}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <div key={item.key} className="relative">
                      <Link
                        to={item.href || "#"}
                        onClick={item.key === 2 ? toggleLogout : closeMobileMenu}
                        className="flex items-center gap-x-2"
                      >
                        {item.name}
                      </Link>
                      {showLogout && item.key === 2 && (
                        <button
                          onClick={handleLogout}
                          className="absolute top-full border border-gray-800 mt-2 p-2 rounded"
                        >
                          Logout
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative isolate lg:px-8">
        <main className="relative z-10 mt-32 p-4">{children}</main>
        <ScrollToTopButton />
      </div>
    </div>
  );
};

export default Layout;
