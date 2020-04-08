const NSubmenu = {
  baseClass: "relative cursor-pointer text-sm overflow-hidden",
  submenuBodyClass: "transition duration-700 ease-in-out transition-height h-0",
  iconClass: 'absolute top-0 right-0 p-3 duration-300 n-icon-dropdown',
  focusClass: 'transform -rotate-180 duration-300',
  dropdownClass: "absolute z-50 py-1 mx-auto w-full text-xs bg-white rounded shadow-lg h-64 overflow-auto",
  dropdownChildClass: "cursor-pointer hover:bg-gray-200 py-3 px-3",
};

export default NSubmenu;
