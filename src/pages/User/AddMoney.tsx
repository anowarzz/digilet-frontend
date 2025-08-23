import addMoneyIcon from "@/assets/Icons/add-money.png";
import TransactionForm from "@/components/modules/Transaction/TransactionForm";
import { useAddMoneyMutation } from "@/redux/features/wallet/wallet.api";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const AddMoney = () => {
  const [addMoney] = useAddMoneyMutation();
  const navigate = useNavigate();

  const handleAddMoney = async (addMoneyData: {
    agentPhone: string;
    amount: number;
  }) => {
    console.log("Add Money:", addMoneyData);

    try {
      const res = await addMoney(addMoneyData).unwrap();
      console.log("Add Money Response:", res);

      if (res.success) {
        navigate("/user/my-wallet");
        toast.success("Money Added To Your Wallet successfully!");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (
        error.data?.message === "Agent not found with the given phone number"
      ) {
        return toast.error("Agent not found with this phone number.");
      }
      if (
        error.data?.message?.includes(
          "This agent wallet does not have enough balance"
        )
      ) {
        return toast.error(`${error.data.message}`);
      }
      toast.error("Failed to add money.");
      console.log(error);
    }
  };

  return (
    <TransactionForm
      type="add-money"
      title="Add Money"
      description="Top up your own wallet instantly"
      buttonText="Add Money"
      icon={addMoneyIcon}
      gradientClass="from-emerald-500 to-teal-600"
      onSubmit={handleAddMoney}
    />
  );
};

export default AddMoney;
