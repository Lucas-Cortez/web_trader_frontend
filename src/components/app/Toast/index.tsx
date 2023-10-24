import * as RadixToast from "@radix-ui/react-toast";

export const Toast: React.FC = () => {
  return (
    <RadixToast.Provider>
      <RadixToast.Root>
        <RadixToast.Title />
        <RadixToast.Description />
        {/* <RadixToast.Action /> */}
        <RadixToast.Close />
      </RadixToast.Root>

      <RadixToast.Viewport />
    </RadixToast.Provider>
  );
};
