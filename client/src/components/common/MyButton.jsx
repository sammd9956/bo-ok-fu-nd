import { Button } from "@/components/ui/button";
const variantStyles = {
  primary:
    "text-white bg-primary-color hover:bg-primary-color-dark hover:shadow-lg",

  secondary:
    "text-indigo-500 bg-primary-light hover:bg-gray-300 hover:shadow-md",

  outline:
    "text-purple-500 border border-outline-border hover:bg-outline-border hover:text-white hover:shadow-md",
};

const MyButton = ({
  variant = "primary",
  text = "Check",
  style = "",
  onClick,
  disabled = "",
}) => {
  return (
    //if client need switch button functional and reedem funs button depends on switch then apply following code in class as it is befoe rext-base
    //${disabled === false ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    <Button
      onClick={onClick}

      className={`
  text-base px-6 py-4 rounded-md font-semibold font-inter
  min-w-[140px] transition-all duration-200 ease-in-out h-auto
  ${variantStyles[variant] || variantStyles.primary}
  ${style}
`}
    >
      {text}
    </Button>
  );
};

export default MyButton;
