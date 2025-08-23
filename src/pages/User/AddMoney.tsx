import addMoneyIcon from "@/assets/Icons/add-money.png";
import TransactionForm from "@/components/modules/Transaction/TransactionForm";
import { useAddMoneyMutation } from "@/redux/features/wallet/wallet.api";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const AddMoney = () => {
  const [addMoney] = useAddMoneyMutation();
  const navigate = useNavigate();

  const handleAddMoney = async (addMoneyData: {
    phone: string;
    amount: number;
  }) => {
    const addMoneyPayload = {
      agentPhone: addMoneyData.phone,
      amount: addMoneyData.amount,
    };

    console.log("Add Money:", addMoneyPayload);

    try {
      const res = await addMoney(addMoneyPayload).unwrap();
      console.log("Add Money Response:", res);

      if (res.success) {
        navigate("/user/my-wallet");
        toast.success("Money Added To Your Wallet successfully!");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.statusCode);
      if (error.status >= 400 && error.status < 500) {
        return toast.error(error.data.message);
      }

      return toast.error("Failed To Add Money");
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
