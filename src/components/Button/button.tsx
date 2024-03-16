// Define the properties that the Button component will accept
interface ButtonProps {
    // onClick is a function that will be called when the button is clicked
    onClick: () => void;
  }
  
  // Define the Button component
  export const Button = ({ onClick }: ButtonProps) => {
    return (
      // The Button component renders a button element
      // The onClick function passed in the props is attached to the button's onClick event
      <>
        <button onClick={onClick} data-testid="button-test">
          Click me Now
        </button>
      </>
    );
  };
  