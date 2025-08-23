import addMoneyIcon from "@/assets/Icons/add-money.png";
import TransactionForm from "@/components/modules/Transaction/TransactionForm";
import { useAddMoneyMutation } from "@/redux/features/wallet/wallet.api";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const CashIn = () => {
  const [addMoney] = useAddMoneyMutation();
  const navigate = useNavigate();

  // Add money Request Handler
  const handleCashIn = async (cashInData: {
    phone: string;
    amount: number;
  }) => {
    const toastId = toast.loading("Adding Money...");

    const addMoneyPayload = {
      userPhone: cashInData.phone,
      amount: cashInData.amount,
    };

    console.log("Cash In:", addMoneyPayload);

    try {
      const res = await addMoney(addMoneyPayload).unwrap();
      console.log("Cash In Response:", res);

      if (res.success) {
        navigate("/agent/my-wallet");
        toast.success("Money Cashed In To User Wallet successfully!", {
          id: toastId,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.statusCode);
      if (error.status >= 400 && error.status < 500) {
        return toast.error(error.data.message, { id: toastId });
      }

      return toast.error("Failed To Cash In Money", { id: toastId });
    }
  };

  return (
    <TransactionForm
      type="cash-in"
      title="Cash In"
      description="Cash In To User Wallet"
      buttonText="Cash In"
      icon={addMoneyIcon}
      gradientClass="from-emerald-500 to-teal-600"
      onSubmit={handleCashIn}
    />
  );
};

export default CashIn;
